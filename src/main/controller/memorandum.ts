import controllerInstance, { InitParmas } from '../util/controllerInstance';
import db from '../db';
import {
  add,
  deleteItem,
  doneList,
  update,
  waitingList,
} from '../db/memorandum';

export default class memorandum extends controllerInstance {
  constructor() {
    const InitParmas: InitParmas = {
      channel: 'memorandum',
      listener: async (event, { method, data }) => {
        switch (method) {
          case 'get':
            if (data.done) {
              return { code: 200, data: doneList() };
            }
            return { code: 200, data: waitingList() };
          case 'post':
            add(data);
            return {
              code: 200,
            };
          case 'update':
            if (data.id) {
              update(data.id, data);
              return {
                code: 200,
              };
            }
          case 'delete':
          default:
            if (data.id) {
              deleteItem(data.id);
              return {
                code: 200,
              };
            }
            break;
        }
      },
    };
    super(InitParmas);
  }
}
