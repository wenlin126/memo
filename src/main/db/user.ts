//@ts-nocheck
import db from './index';

const DB_NAME = 'user';

/**
 * 查询列表
 * @returns {{id，content，done}[]}
 */
export const getList = () => {
  let list = db.get(DB_NAME).value();
  return list;
};

export const login = ({ userName, password }) => {
  let res = db.get(DB_NAME).find({ userName, password }).value();
  console.log(res);
  return !!res;
};

export const register = ({ userName, password }) => {
  db.get(DB_NAME)
    .insert({
      userName,
      password,
    })
    .write();
};
