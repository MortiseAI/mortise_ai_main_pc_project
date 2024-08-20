const fs = require("fs-extra");
module.exports = {
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {},
        },
        {
            name: '@electron-forge/maker-zip',
            platforms: ['darwin'],
        },
        {
            name: '@electron-forge/maker-deb',
            config: {},
        },
        {
            name: '@electron-forge/maker-rpm',
            config: {},
        },
    ],
    hooks: {
        generateAssets: async () => {
            const fs = require('fs-extra');
            if (fs.existsSync('config.json')) {
                await fs.copy('config.json', 'dist/config.json');
            }
            if (fs.existsSync('devconfig.json')) {
                await fs.copy('devconfig.json', 'dist/devconfig.json');
            }
        },
    },
};