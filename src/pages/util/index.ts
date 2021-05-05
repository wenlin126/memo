import { message, notification } from 'antd';

export const resMessage = (res: {
  code: number;
  message: string;
  data: any;
}) => {
  if (res.code === 200) message.success(res.message);
  else message.error(res.message);
};
