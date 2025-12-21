#!/usr/bin/env node

/**
 * Publishes all packages in the monorepo using npm publish with OIDC/provenance
 * This replaces `changeset publish` to ensure OIDC authentication works properly
 */

const { execSync } = require('child_process');
const { readdirSync, existsSync, readFileSync, unlinkSync } = require('fs');
const { join } = require('path');

const packagesDir = join(__dirname, '..', 'packages');

// Remove any .npmrc files that might interfere with OIDC
// changesets/action creates these for token-based auth
const npmrcPaths = [join(__dirname, '..', '.npmrc'), join(require('os').homedir(), '.npmrc')];

for (const npmrcPath of npmrcPaths) {
  if (existsSync(npmrcPath)) {
    console.log(`🗑️  Removing ${npmrcPath} to enable OIDC authentication...`);
    try {
      unlinkSync(npmrcPath);
    } catch (error) {
      console.warn(`   Warning: Could not remove ${npmrcPath}`);
    }
  }
}

// Don't create .npmrc - let npm use OIDC directly without any config files
// The presence of ACTIONS_ID_TOKEN_REQUEST_URL should be enough for npm to use OIDC
console.log(`✓ .npmrc files removed - npm will use OIDC for authentication\n`);

// Get all package directories
const packages = readdirSync(packagesDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => join(packagesDir, dirent.name));

console.log('🦋 Publishing packages with OIDC authentication...\n');

let publishedCount = 0;
let skippedCount = 0;
let failedPackages = [];

for (const packagePath of packages) {
  const packageJsonPath = join(packagePath, 'package.json');

  if (!existsSync(packageJsonPath)) {
    console.log(`⚠️  Skipping ${packagePath} (no package.json)`);
    continue;
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  const { name, version } = packageJson;

  // Skip private packages
  if (packageJson.private) {
    console.log(`⚠️  Skipping ${name} (private package)`);
    skippedCount++;
    continue;
  }

  console.log(`📦 Processing ${name}@${version}...`);

  // Check if this version is already published
  try {
    execSync(`npm view ${name}@${version} version`, {
      stdio: 'pipe',
      cwd: packagePath
    });
    console.log(`   ✓ Already published\n`);
    skippedCount++;
    continue;
  } catch (error) {
    // Version doesn't exist, proceed with publish
  }

  // Publish with provenance (triggers OIDC)
  try {
    console.log(`   Publishing to npm with provenance...`);

    // Use --dry-run in CI to test without actually publishing
    const dryRun = process.env.DRY_RUN === 'true' ? '--dry-run' : '';

    // Debug: Check if OIDC env vars are present
    console.log(`   OIDC available: ${process.env.ACTIONS_ID_TOKEN_REQUEST_URL ? 'YES' : 'NO'}`);

    console.log('   Registry:', execSync('npm config get registry', { cwd: packagePath }).toString().trim());
    console.log('   npmrc in cwd exists:', existsSync(join(packagePath, '.npmrc')));
    console.log('   HOME npmrc exists:', existsSync(join(require('os').homedir(), '.npmrc')));
    console.log('   NODE_AUTH_TOKEN set:', !!process.env.NODE_AUTH_TOKEN);

    // When using trusted publishing with OIDC, provenance is automatic
    // Don't use --provenance flag as it may interfere with OIDC auth
    // npm will automatically use OIDC when ACTIONS_ID_TOKEN_REQUEST_URL is present
    execSync(`npm publish --access public --ignore-scripts ${dryRun}`, {
      stdio: 'inherit',
      cwd: packagePath,
      env: process.env
    });
    console.log(`   ✓ Published successfully${dryRun ? ' (dry run)' : ''}\n`);
    publishedCount++;
  } catch (error) {
    console.error(`   ✗ Failed to publish ${name}@${version}\n`);
    failedPackages.push({ name, version, error: error.message });
  }
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 Publishing Summary:');
console.log(`   ✓ Published: ${publishedCount}`);
console.log(`   ⊘ Skipped: ${skippedCount}`);
console.log(`   ✗ Failed: ${failedPackages.length}`);

if (failedPackages.length > 0) {
  console.log('\n❌ Failed packages:');
  failedPackages.forEach(({ name, version }) => {
    console.log(`   - ${name}@${version}`);
  });
  process.exit(1);
}

if (publishedCount === 0 && skippedCount === 0) {
  console.log('\n⚠️  No packages were published or skipped');
  process.exit(1);
}

console.log('\n✅ All packages published successfully!');
