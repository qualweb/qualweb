const fs = require('fs');
const path = require('path');

const oldPath = path.resolve(__dirname, '../../node_modules/syllable-pt', 'main.d.ts');  // caminho atual do ficheiro
const newFolder = path.resolve(__dirname, '../../node_modules/syllable-pt/lib');          // pasta destino
const newPath = path.join(newFolder, 'main.d.ts');      
if (!fs.existsSync(newFolder)) {
  fs.mkdirSync(newFolder, { recursive: true });
}
fs.rename(oldPath, newPath, (err) => {
  if (err) {
    console.error('Erro ao renomear o ficheiro:', err);
  } else {
    console.log(`Ficheiro renomeado de ${oldPath} para ${newPath}`);
  }});