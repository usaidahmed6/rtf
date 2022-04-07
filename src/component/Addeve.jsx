import React from 'react'
import { Form, Input, InputNumber, Button, Upload } from 'antd'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { addFormDataRef, storage } from './firebase'
import { addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
}
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!'
  },
  number: {
    range: '${label} must be between ${min} and ${max}'
  }
}
/* eslint-enable no-template-curly-in-string */
const normFile = e => {
  console.log('Upload event:', e)

  if (Array.isArray(e)) {
    return e
  }

  return e && e.fileList
}

const Addeve = () => {
  const ImageUpload = async file => {
    let picture

    try {
      const storeageReference = ref(storage, file.name)
      const upload = await uploadBytes(storeageReference, file)
      console.log('file uploaded>>>...>>>')
      const imageUrl = await getDownloadURL(storeageReference)
      picture = imageUrl
      console.log('file have been success========>', picture)
    } catch (err) {
      console.log('file not uploade...................>')
    }

    return picture
  }
  const navigate = useNavigate("")
  const onFinish = async values => {

    const picture = await ImageUpload(values.upload[0].originFileObj)
    if (picture) {
      console.log('picture uploaded', picture)
    }
    console.log('values....', values)
    console.log('name', values.user.name)
    console.log('price', values.user.price)
    console.log('description', values.user.description)
    console.log('picture', picture)
    const obj = {
      name: values.user.name,
      price: values.user.price,
      description: values.user.description,
      picture
    }
    addDoc(addFormDataRef, obj)
    alert('data add into database')
    navigate('/')
  }

  return (
    <>
      <div className='container div '>
        <h1 className='h text-center'> AddEvent </h1>
        <Form
          {...layout}
          name='nest-messages'
          onFinish={onFinish}
          validateMessages={validateMessages}
          className={'form mx-8 my-4'}
        >
          <Form.Item
            name={['user', 'name']}
            label='Name'
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={['user', 'price']}
            label='Price'
            rules={[
              {
                type: 'number',
                min: 0,
                max: 99,
                required: true
              }
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name={['user', 'description']}
            rules={[
              {
                required: true
              }
            ]}
            label='Description'
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name='upload'
            label='Upload'
            valuePropName='fileList'
            getValueFromEvent={normFile}
            extra='longgggggggggggggggggggggggggggggggggg'
          >
            <Upload name='logo' action='/upload.do' listType='picture'>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}
export default Addeve
