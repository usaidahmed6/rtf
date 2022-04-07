import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { signInWithEmailAndPassword, userRef, auth, addDoc } from "./firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  provider,
} from "./firebase";
import "./login.css";
// import "App.css"
const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("false");
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 10,
    },
  };

  const navigate = useNavigate("");
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        setSuccess("You are signed in");
        navigate("/");
        setTimeout(() => {
          setSuccess("");
        }, 2000);
      })
      .catch((err) => {
        setError(err.message);
        setTimeout(() => {
          setError("");
        }, 2000);
      });
  };

  const signin = () => {
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("goooleeee>>>>>>>>");
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    // navigate("/")
  };

  return (
    <div className="container div">
      {error !== "" && <Alert message={error} type={"error"} />}
      {success !== "" && <Alert message={success} type={"success"} />}
      <h1 className="h text-center ">Login</h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="logo-user"
      >
        <path d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z" />
      </svg>

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            className="input"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            className="input"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button button"
          >
            Log in
          </Button>
          <Button className="mx-4 my-4 button" onClick={signin}>
            Google-Signup
          </Button>

          <Link to={"/Register"}>
            <Button className="button"> Register Now</Button>
          </Link>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
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

export default Login;
