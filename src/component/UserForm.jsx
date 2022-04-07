import { Form, Input, InputNumber, Button, Alert, Select, Upload } from "antd";
import "./register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { VerticalAlignBottomOutlined } from "@ant-design/icons";

import { storage, userData } from "./firebase";
import {
  createUserWithEmailAndPassword,
  auth,
  addDoc,
  db,
  restaurantForm,
} from "./firebase";
import "./container.css";

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

const UserForm = () => {
  const ImageUpload = async (file) => {
    let picture;

    try {
      const UserProfile = ref(storage, file.name);
      const upload = await uploadBytes(UserProfile, file);
      console.log("file uploaded>>>...>>>");
      const imageUrl = await getDownloadURL(UserProfile);
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
    console.log("user =============>", values.user.name);
    console.log("name =============>", values.email);
    console.log("email =============>", values.user.city);
    console.log("user =============>", values.user.Country);
    console.log("picture.......is done");

    // setLoading(true);

    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((user) => {
        console.log("user gg email=>", values.email);
        console.log("user name=>", values.user.name);
        console.log("user uid=>", user.user.uid);
        console.log("email =============>", values.user.city);
        console.log("user =============>", values.user.Country);
        console.log("picture.......is done", picture);

        const obj = {
          uid: user.user.uid,
          email: values.email,
          name: values.user.name,
          country: values.country,
          city: values.user.city,
          picture,
        };

        addDoc(userData, obj).then(() => {
          console.log("hogya haaa");
          // setSuccess("You are signed in");
          // setTimeout(() => {
          //   setSuccess("");
          // }, 2000);
        });
      })
      .catch((error) => {
     console.log("errror");
      });
      // success('See The All Restaurant')
      navigate('/ShowRestaurant')
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
      <h1 className="h text-center"> User Information </h1>
      <br />

      <Form
        {...layout}
        className={"register-form"}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "name"]}
          label="UserName"
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
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
          className={"register-gmail"}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
          className={"register-password"}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name={["user", "city"]}
          label="City Name"
          rules={[
            {
              required: true,
            },
          ]}
          className={"register-name"}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["country"]}
          label="Country Name"
          rules={[
            {
              required: true,
            },
          ]}
          className={"register-name"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra=""
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<VerticalAlignBottomOutlined />}>
              Plz Upload Your own Picture
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            loading={loading}
            type="primary"
            className=""
            htmlType="submit"
          >
            Register
            <br />
            <br />
          </Button>
          <Link to={"/"}>
            <Button variant="secondary" className="mx-4 my-4">Go back</Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserForm;
