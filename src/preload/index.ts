import { contextBridge, ipcRenderer } from 'electron';

const apiKey = 'electron';

const api: any = {
  versions: process.versions,
  ipcRenderer: ipcRenderer,
};

contextBridge.exposeInMainWorld(apiKey, api);
