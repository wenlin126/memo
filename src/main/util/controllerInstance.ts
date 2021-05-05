import { ipcMain, IpcMainInvokeEvent } from 'electron';

interface body {
  method: 'get' | 'post' | 'update' | 'delete';
  data: any;
}

export type listener = (
  arg0: IpcMainInvokeEvent,
  arg1: body,
  ...args: any[]
) => void;
export interface InitParmas {
  channel: string;
  listener: listener;
}

export default class controllerInstance {
  channel: string;
  listener: listener;
  constructor({ channel, listener }: InitParmas) {
    this.channel = channel;
    this.listener = listener;
    this.reload();
  }

  /**
   * 监听 channel
   */
  reload = (listener?: listener) => {
    if (listener) {
      this.colse();
      this.listener = listener;
    }
    ipcMain.handle(this.channel, this.listener);
  };

  /**
   * 关闭监听
   */
  colse = () => {
    if (this.channel) {
      ipcMain.removeHandler(this.channel);
    }
  };

  /**
   *
   */
}
