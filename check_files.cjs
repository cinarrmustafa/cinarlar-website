const fs = require('fs');
const path = require('path');

const filesToRead = [
    'package.json',
    'vite.config.ts',
    'index.html',
    'src/main.tsx',
    'src/App.tsx',
    'src/index.css'
];

async function checkFiles() {
    for (const f of filesToRead) {
        const fullPath = path.resolve(__dirname, f);
        console.log(`Reading ${f}...`);
        try {
            const start = Date.now();
            const content = fs.readFileSync(fullPath, 'utf8');
            const end = Date.now();
            console.log(`  Success: ${content.length} chars, took ${end - start}ms`);
        } catch (err) {
            console.error(`  ERROR reading ${f}:`, err.message);
        }
    }
}

checkFiles();
