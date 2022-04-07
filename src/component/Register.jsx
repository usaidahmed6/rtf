import React from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { userRef, addDoc } from "./firebase";
import "./register.css";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

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

const Register = () => {
  const navigate = useNavigate("");

  const onFinish = (values) => {
    console.log("email", values.user.email);
    console.log("email", values.password);

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, values.user.email, values.password)
      .then((user) => {
        // console.log('name', values.user.name);
        // console.log("email", values.user.email);
        // console.log("phone", values.phone);
        // console.log("uid", user.user.uid);
        const obj = {
          name: values.user.name,
          email: values.user.email,
          uid: user.user.uid,
          phone: values.phone,
        };
        addDoc(userRef, obj)
          .then(() => {
            alert("add hogya ha");
          })
          .catch(() => {
            alert("add nhi hoa");
          });
        navigate("/");
      })

      .catch((error) => {
        console.log("user nhi aya", error);
        // ..
      });
  };

  return (
    <div className="container div">
      <h1 className="h text-center">REGISTER FORM</h1>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        className={"mx-8 form"}
      >
        <Form.Item
          name={["user", "name"]}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[
            {
              type: "email",
            },
          ]}
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
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            // addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        
          <Link to={"/"}>
            <Button variant="success" className="but  ">
              Go BACK
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
