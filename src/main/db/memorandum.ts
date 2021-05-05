//@ts-nocheck
import db from './index';

const DB_NAME = 'memorandum';

/**
 * 查询列表
 * @returns {{id，content，done}[]}
 */
export const getList = () => {
  let list = db.get(DB_NAME).value();
  return list;
};

export const waitingList = () => {
  return db
    .get(DB_NAME)
    .filter((item) => !item.done)
    .value();
};

export const doneList = () => {
  return db
    .get(DB_NAME)
    .filter((item) => item.done)
    .value();
};

export const add = (data: any) => {
  db.get(DB_NAME)
    .insert({
      ...data,
      done: false,
    })
    .write();
};

export const update = (id, data) => {
  db.get(DB_NAME).updateById(id, data).write();
  db.get(DB_NAME).updateById(id, data).write();
};

export const deleteItem = (id) => {
  db.get(DB_NAME).removeById(id).write();
};
