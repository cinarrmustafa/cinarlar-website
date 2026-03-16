const { createServer } = require('vite');
const path = require('path');

(async () => {
    const root = path.resolve(__dirname);
    console.log(`INIT: Manual Vite runner started in root: ${root}`);
    try {
        console.log('INIT: Resolving configuration...');
        const server = await createServer({
            root: root,
            configFile: path.resolve(root, 'vite.config.ts'),
            server: {
                port: 3000,
                host: '0.0.0.0',
                strictPort: true
            }
        });
        console.log('INIT: Server created. Loading plugins...');
        await server.listen();
        console.log('INIT: Vite server is listening!');
        console.log('URLs:');
        server.printUrls();
    } catch (err) {
        console.error('FATAL: Vite failed to start:', err);
        process.exit(1);
    }
})();
