import controllerInstance, { InitParmas } from '../util/controllerInstance';
import db from '../db';
import { register } from '../db/user';

export default class memorandum extends controllerInstance {
  constructor() {
    const InitParmas: InitParmas = {
      channel: 'register',
      listener: async (event, { method, data }) => {
        switch (method) {
          case 'post':
            register(data);
            return {
              code: 200,
              message: '注册成功',
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
