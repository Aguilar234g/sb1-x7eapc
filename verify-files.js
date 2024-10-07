import { readFileSync } from 'fs';
import { join } from 'path';

const filesToCheck = [
  'src/App.tsx',
  'src/main.tsx',
  'src/index.css',
  'src/firebase.ts',
  'package.json',
  'index.html',
  'tailwind.config.js',
  'vite.config.ts'
];

filesToCheck.forEach(file => {
  console.log(`\n--- Contenido de ${file} ---`);
  try {
    const content = readFileSync(join(process.cwd(), file), 'utf8');
    console.log(content);
  } catch (error) {
    console.error(`Error al leer ${file}:`, error.message);
  }
});

console.log('\nVerificación de archivos completada.');