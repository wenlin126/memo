import React, { useEffect, useState } from 'react';
import { Link } from 'umi';
import { Form, Input, Tabs, List, PageHeader } from 'antd';
import { MinusCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import QueueAnim from 'rc-queue-anim';

import style from './index.less';
import { resMessage } from '../util';
import { req } from '../server/memorandum';

interface memoForm {
  content: string;
}

export default () => {
  const [form] = Form.useForm<memoForm>();
  const [list, setList] = useState([]);
  const [donelist, setdonelist] = useState([]);

  const onFinish = async (values: memoForm) => {
    let res = await req({ method: 'post', data: values });
    getList();
    resMessage(res);
  };

  const getList = async () => {
    form.resetFields(['content']);
    let res = await req({ method: 'get', data: { done: false } });
    if (res?.code === 200) setList(res.data);
    let res1 = await req({ method: 'get', data: { done: true } });
    if (res1?.code === 200) setdonelist(res1.data);
  };

  const done = async (item: any) => {
    let res = await req({ method: 'update', data: { ...item, done: true } });
    if (res.code === 200) getList();
    resMessage(res);
  };

  const wait = async (item: any) => {
    let res = await req({ method: 'update', data: { ...item, done: false } });
    if (res.code === 200) getList();
    resMessage(res);
  };

  const deleteItem = async (id: number) => {
    let res = await req({ method: 'delete', data: { id } });
    if (res.code === 200) getList();
    resMessage(res);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <PageHeader
      title={<div className={style.title}>待办事项</div>}
      style={{ padding: '8px 0' }}
    >
      <Form<memoForm> form={form} onFinish={onFinish}>
        <Form.Item name="content">
          <Input placeholder="有什么要做的？" className={style.contentInput} />
        </Form.Item>
      </Form>
      <Tabs centered>
        <Tabs.TabPane key="waiting" tab="待办">
          <QueueAnim delay={200}>
            {list.map((item: any, ind) => (
              <List.Item
                key={item?.id || ind + 'index'}
                actions={[<MinusCircleOutlined onClick={() => done(item)} />]}
              >
                <List.Item.Meta title={item?.content} />
              </List.Item>
            ))}
          </QueueAnim>
        </Tabs.TabPane>
        <Tabs.TabPane key="done" tab="已完成">
          <QueueAnim delay={200} type="left">
            {donelist.map((item: any, ind) => (
              <List.Item
                key={item?.id || ind + 'index'}
                actions={[
                  <MinusCircleOutlined
                    key="wating"
                    onClick={() => wait(item)}
                  />,
                  <CloseCircleOutlined
                    key="done"
                    onClick={() => deleteItem(item.id)}
                  />,
                ]}
              >
                <List.Item.Meta title={item?.content} />
              </List.Item>
            ))}
          </QueueAnim>
        </Tabs.TabPane>
      </Tabs>
      <div className={style.toLogin}>
        <Link to="/login">login</Link>
      </div>
    </PageHeader>
  );
};
