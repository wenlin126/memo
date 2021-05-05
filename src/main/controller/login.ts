import controllerInstance, { InitParmas } from '../util/controllerInstance';
import db from '../db';
import { login } from '../db/user';

export default class memorandum extends controllerInstance {
  constructor() {
    const InitParmas: InitParmas = {
      channel: 'login',
      listener: async (event, { method, data }) => {
        switch (method) {
          case 'post':
            let res = login(data);
            return {
              code: res ? 200 : 403,
              message: res ? '登陆成功' : '账号或密码错误',
            };
          case 'update':
            if (data.id) {
              // todo
              return {
                code: 500,
              };
            }
        }
      },
    };
    super(InitParmas);
  }
}
