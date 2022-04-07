import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userData } from './firebase'
import { getDocs } from './firebase'
import { Card, Avatar } from 'antd'
import edit from '../component/edit.png'
import social from '../component/social-media.png'
import "../App.css";

const { Meta } = Card

const ShowUser = () => {
  const [eve, setEve] = useState([])
  const navigate = useNavigate()

  useEffect(async () => {
    getAllEvent()
  })
  const getAllEvent = async () => {
    const querySnapshot = await getDocs(userData)
    let events = []
    querySnapshot.forEach(doc => {
      // console.log(doc.id, " => ", doc.data());
      events.push({ id: doc.id, ...doc.data() })
    })
    setEve(events)
  }

  return (
    <>
      <h1 className='h'>My All Users</h1>
      <Link to={'/'}>
        <button variant='secondary' className='mx-4 my-4'>
          Go back
        </button>
      </Link>
      <div className='container_event'>
        {eve.map((data, index) => {
          return (
            <Card
            className='card'
              style={{
                width: 250,
                height: 130,
                margin: 16,
                display: 'flex',
                flexWrap: 'wrap',
                display: 'inline-block'
              }}
              cover={
                <img
                  alt='example'
                  src={data.picture}
                  className={'event_img'}
                  style={{
                    width: 250,
                    height: 130,
                    justifyContent: 'center !important',
                    alignItems: 'center !important',
                    boxShadow: '15 !important',
                    margin: 'auto'
                  }}
                />
              }
              actions={[
                <img
                  src={edit}
                  alt='food background'
                  style={{ height: 30, width: 30 }}
                />,
                <img
                  src={social}
                  alt='food background'
                  style={{ height: 30, width: 30 }}
                />
              ]}
            >
              <Meta
                style={{ margin: 'auto' }}
                avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
                title={data.name}
                city={data.city}
              />
            </Card>
          )
        })}
      </div>
    </>
  )
}
export default ShowUser
