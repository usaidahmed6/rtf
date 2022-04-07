import { Form, Input, InputNumber, Button, Alert, Select, Upload } from "antd";
import "./register.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { VerticalAlignBottomOutlined } from "@ant-design/icons";

import { AddDishes, storage } from "./firebase";
import {
  createUserWithEmailAndPassword,
  auth,
  addDoc,
  db,
  restaurantForm,
} from "./firebase";
import "./container.css";

import { Card, Avatar } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const AddFood = () => {
  const ImageUpload = async (file) => {
    let picture;

    try {
      const AddDishes = ref(storage, file.name);
      const upload = await uploadBytes(AddDishes, file);
      console.log("file uploaded>>>...>>>");
      const imageUrl = await getDownloadURL(AddDishes);
      picture = imageUrl;
      console.log("file have been success========>", picture);
    } catch (err) {
      console.log("file not uploade...................>");
    }

    return picture;
  };

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const picture = await ImageUpload(values.upload[0].originFileObj);
    if (picture) {
      console.log("picture uploaded", picture);
    }
    console.log("name =============>", values.name.dish);
    console.log("adrees =============>", values.house.address);
    console.log("price =============>", values.price);
    console.log("picture.......is done");

    const obj = {
      uid: auth.currentUser.uid,
      address: values.house.address,
      name: values.name.dish,
      price:values.price,
      picture,
    };
    console.log("uid", auth.currentUser.uid);
    addDoc(AddDishes, obj).then(() => {
      console.log("You are signed in");
    });
  };

  return (
    <div className="register-div mx-4 my-4 container">
      {success !== "" && (
        <Alert message={success} type={"success"} className={"text-center"} />
      )}
      {error !== "" && (
        <Alert message={error} type={"error"} className={"text-center"} />
      )}

      <br />
      <h1 className="h text-center">Add Your Dishes </h1>
      <br />

      <Form
        {...layout}
        className={"register-form"}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["name", "dish"]}
          label="Dish"
          rules={[
            {
              required: true,
            },
          ]}
          className=""
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["house", "address"]}
          label="Address"
          rules={[
            {
              required: true,
            },
          ]}
          className=""
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["price"]}
          label="price"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            type="number"
            style={{
              width: 100,
            }}
          />
        </Form.Item>

        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="Plz Upload Your Restaurant Picture"
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<VerticalAlignBottomOutlined />}>
              Plz Upload Your Restaurant Picture
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Link to={"/"}>
            <Button variant="secondary">Go back</Button>
          </Link>
          <br />
          <br />

          <Button
            loading={loading}
            type="primary"
            className=""
            htmlType="submit"
          >
            Register
          </Button>
        </Form.Item>
      </Form>

      {/* <div className="container_event"> */}
    </div>
  );
};

export default AddFood;
