import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, restaurantForm } from './firebase'
import { getDocs } from './firebase'
import cutlery from '../component/cutlery.png'
import diet from '../component/diet.png'
import { Card, Avatar } from 'antd'

const { Meta } = Card

const ShowRestaurant = () => {
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
      <h1 className='h'>My All Restaurant</h1>
      <Link to={'/'}>
        <button variant='secondary' className='mx-4 my-4'>
          Go back
        </button>
      </Link>
      <div className='container_event'>
        {eve.map((data, index) => {
          return (
            <Card
              style={{
                width: 250,
                height: 130,
                margin: 16,
                display: 'flex',
                flexWrap: 'wrap',
                display: 'inline-block',
                border: '2px solid black'
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
                  margin: 'auto'
                }}
                />
              }
              actions={[
                <img
                src={cutlery}
                alt='food background'
                style={{ height: 30, width: 30 }}
                />,
                <img
                src={diet}
                alt='food background'
                  style={{ height: 30, width: 30 }}
                  onClick={click}
                />
              ]}
            >
              <Meta
                style={{ margin: 'auto' }}
                avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
                title={data.name}
                description={data.city}
                price={data.price}
              />
            </Card>
          )
        })}
      </div>
    </>
  )
}
export default ShowRestaurant
