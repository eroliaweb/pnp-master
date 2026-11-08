const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('pnpDesktop', {
  platform: process.platform,
  version: '1.0.0',
});
