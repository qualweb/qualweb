import { Server } from 'http';
import Koa from 'koa';

/**
 * Minimal fixture server for driver tests. Serves:
 * - `/` - a small page with a title, a heading and a couple of links
 * - `/child` - a linked page
 * - `/dialog` - a page that fires alert() on load
 * - `/popup` - a page that window.open()s a second tab on load
 */
export function createFixtureServer(): Koa {
  const app = new Koa();

  app.use((ctx) => {
    switch (ctx.path) {
      case '/':
        ctx.body = `<!DOCTYPE html>
          <html lang="en">
            <head>
              <title>Fixture root</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body>
              <h1>Fixture</h1>
              <p>Hello from the fixture server.</p>
              <a href="/child">child</a>
            </body>
          </html>`;
        break;
      case '/child':
        ctx.body = `<!DOCTYPE html>
          <html lang="en">
            <head><title>Fixture child</title></head>
            <body><h1>Child</h1><a href="/">root</a></body>
          </html>`;
        break;
      case '/dialog':
        ctx.body = `<!DOCTYPE html>
          <html lang="en">
            <head><title>Dialog page</title></head>
            <body>
              <h1>Dialog</h1>
              <script>alert('blocking dialog');</script>
            </body>
          </html>`;
        break;
      case '/popup':
        ctx.body = `<!DOCTYPE html>
          <html lang="en">
            <head><title>Popup page</title></head>
            <body>
              <h1>Popup</h1>
              <script>window.open('/child');</script>
            </body>
          </html>`;
        break;
      default:
        ctx.status = 404;
    }
  });

  return app;
}

export function listen(app: Koa): Promise<{ server: Server; host: string }> {
  return new Promise((resolve) => {
    const server = app.listen(() => {
      const address = server.address();
      const host =
        typeof address === 'string' ? address : `http://localhost:${(address as { port: number }).port}`;
      resolve({ server, host });
    });
  });
}
