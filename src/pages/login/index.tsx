import React, { useState } from 'react';
import { useHistory } from 'umi';
import { Form, Input, Button, Space, Tabs, message } from 'antd';
import style from './index.less';
import { reqLogin, reqRegister } from '../server/user';
import { resMessage } from '../util';

interface userInfo {
  userName: string;
  password: string;
}

export default function index() {
  const [formState, setformState] = useState('login');
  const history = useHistory();

  const submit = (values: userInfo) => {
    console.log(formState, values);
    if (formState === 'login') return login(values);
    else register(values);
  };

  const login = async function (values: userInfo) {
    let res = await reqLogin({ method: 'post', data: values });
    console.log(res);
    if (res?.code === 200) history.push('/');
    else message.error(res?.message);
  };

  const register = async function (values: userInfo) {
    let res = await reqRegister({ method: 'post', data: values });
    console.log(res);
    if (res?.code === 200) setformState('login');
    resMessage(res);
  };

  return (
    <div>
      <Tabs centered activeKey={formState} onChange={setformState}>
        <Tabs.TabPane
          key="login"
          tab={<div className={style.title}>SIGN IN</div>}
        ></Tabs.TabPane>
        <Tabs.TabPane
          key="register"
          tab={<div className={style.title}>SIGN UP</div>}
        ></Tabs.TabPane>
      </Tabs>
      <Form<userInfo> onFinish={submit}>
        <div className={style.loginBox}>
          <div>
            <Form.Item
              name="userName"
              rules={[{ required: true, message: '请输入账号、昵称' }]}
              // label="账号、昵称"
            >
              <Input placeholder="请输入账号、昵称"></Input>
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
              // label="密码"
            >
              <Input type="password" placeholder="请输入密码"></Input>
            </Form.Item>
          </div>
          <Space align="center">
            <Button>重置</Button>
            <Button htmlType="submit" type="primary">
              {formState === 'login' ? '登录' : '注册'}
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
}
