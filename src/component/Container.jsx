import React, { useEffect, useState } from 'react'
import img from "../component/img1.jpg";
import img2 from "./img2.jpg";
import Button from "react-bootstrap/Button";
import { Layout, Menu, Breadcrumb } from "antd";
import "./container.css";
import { Link, useNavigate } from "react-router-dom";
import { Content, Header } from "antd/lib/layout/layout";
import { Navbar } from "react-bootstrap";
import { getDocs } from 'firebase/firestore';
import { restaurantForm } from './firebase';

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

const Container = () => {

  const [eve, setEve] = useState([])
  const navigate = useNavigate()
  const click = () => {
    navigate('/AllDishes')
  }
  useEffect(async () => {
    getAllEvent()
    // const time = setTimeout(navigate('/AllDishes'), 3000)
  })
  const getAllEvent = async () => {
    const querySnapshot = await getDocs(restaurantForm)
    let events = []
    querySnapshot.forEach(doc => {
      // console.log(doc.id, " => ", doc.data());
      events.push({ id: doc.id, ...doc.data() })
    })
    setEve(events)
  }

  return (
    <>
      <header>
        <div className="mainc">
          <img src={img2} alt="food logo" className="img2" />
          <Link to={"/UserForm"}>
            <Button variant="success" className="but  ">
              User Signup
            </Button>
          </Link>
          <Link to={"/RestaurantForm"}>
            <Button variant="success" className="but ">
              Create Restaurant 
            </Button>
          </Link>

          <Link to={"/AddFood"}>
            <Button variant="success" className="but ">
              Add Dishes
            </Button>
          </Link>

          <Link to={"/ShowRestaurant"}>
            <Button variant="success" className="but ">
              Restaurants
            </Button>
          </Link>
          <Link to={"/ShowUser"}>
            <Button variant="success" className="but ">
              All Users
            </Button>
          </Link>
          <Link to={"/AllDishes"}>
            <Button variant="success" className="but ">
              All Dishes
            </Button>
          </Link>



          <Link to={"/Login"}>
            <Button variant="success" className="but ">
              Login
            </Button>
          </Link>
          <br />
          <br />
        </div>
      </header>
      {/* <img src={img} alt="food background" className="main-img" /> */}
    </>
  );
};
export default Container;
