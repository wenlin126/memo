export const req = (config: { method: string; data: any }): Promise<any> => {
  //@ts-ignore
  return window.electron?.ipcRenderer.invoke('memorandum', config);
};
