import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, restaurantForm } from "./firebase";
import { getDocs } from "./firebase";
import { Card, Avatar } from "antd";
// import { Link, useNavigate } from 'react-router-dom'
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const { Meta } = Card;

const Homes = () => {
  const [eve, setEve] = useState([]);
  const navigate = useNavigate();

  useEffect(async () => {
    getAllEvent()})
  //   onAuthStateChanged(auth, user => {
  //     if (!user) {
  //       navigate('/Login')
  //     } else {
  //       navigate('/')
  //     }
  //   })
  // }, [])
  const getAllEvent = async () => {
    const querySnapshot = await getDocs(restaurantForm);
    let events = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      events.push({ id: doc.id, ...doc.data() });
    });
    setEve(events);
  };
  

  return (
    
      <div className="container_event">
        {eve.map((data, index) => {
          return (
            <Card
              style={{
                width: 250,
                height: 130,
                margin: 16,
                display: "flex",
                flexWrap: "wrap",
                display: "inline-block",
                border: "2px solid black",
              }}
              cover={
                <img
                  alt="example"
                  src={data.picture}
                  className={"event_img"}
                  style={{
                    width: 150,
                    height: 100,
                    justifyContent: "center !important",
                    alignItems: "center !important",
                    margin: "auto",
                  }}
                />
              }
              actions={[
                <SettingOutlined key="setting" />,

                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                style={{ margin: "auto" }}
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={data.name}
                description={data.description}
                price={data.price}
              />
            </Card>
          );
        })}
      </div>
   
  );
};

export default Homes;
