import { IpcRenderer } from 'electron';

interface Window {
  electron: {
    versions: any;
    ipcRenderer: IpcRenderer;
  };
}
