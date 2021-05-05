export const reqLogin = (config: {
  method: string;
  data: any;
}): Promise<any> => {
  //@ts-ignore
  return window.electron?.ipcRenderer.invoke('login', config);
};

export const reqRegister = (config: {
  method: string;
  data: any;
}): Promise<any> => {
  //@ts-ignore
  return window.electron?.ipcRenderer.invoke('register', config);
};
