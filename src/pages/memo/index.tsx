import React from 'react';
import { Form, Input, Button } from 'antd'


interface memoForm {
  content: string
}

export default () => {
  const [form] = Form.useForm<memoForm>();

  const onFinish = (values: memoForm) => {
    
  }

  return (
    <div>
      <Form<memoForm> form={form} onFinish={onFinish}>
        <Form.Item name="content">
          <Input />
        </Form.Item>
      </Form>
    </div>
  )
}
