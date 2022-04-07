import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AddDishes, db, onAuthStateChanged, restaurantForm } from './firebase'
import { getDocs } from './firebase'
import { Card, Avatar } from 'antd'
import { Spin, Space } from 'antd'
import bibi from '../component/bibimbap.png'
import salad from '../component/salad.png'
import { doc, getDoc, query, where } from 'firebase/firestore'


const { Meta } = Card
let resturantsUid
const AllDishes = () => {
  const [eve, setEve] = useState([])
  const [ FoodDish,  setFoodDish] = useState([])

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
const params = useParams()
const getUidRestaurant=doc(db,"restaurantForms", params.id)
// console.log('=====',params.id)
  useEffect(async () => {
    getMYDish()
  },[])
  const getMYDish = async () => {
    const dishes = await getDoc(getUidRestaurant)
    console.log('object of restaurent=>', dishes.data().uid)
    resturantsUid = dishes.data().uid
    console.log('uidddd==============================================>', resturantsUid)

    const q = query(AddDishes, where("uid", "==", resturantsUid))

    const querySnapshot = await getDocs(q);
    let dish = []
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        // console.log(doc.id, " => ", doc.data());
        dish.push({ id: doc.id, ...doc.data() })
    });
    setFoodDish(dish)
    console.log("============", FoodDish)
    // console.log('pppppppppppppppp===>', dish[0].price)
}
  return (
    <>
      <h1 className='h'>My All Dishes</h1>
      <Link to={'/'}>
        {/* <Space size='middle'>
          <Spin size='large' />
        </Space> */}
        <button variant='secondary' className='mx-4 my-4'>
          Go back
        </button>
      </Link>
      <div className='container_event'>
        {FoodDish.map((data, index) => {
          return (
            <Card
            className='card'
              style={{
                width: 250,
                height: 130,
                margin: 16,
                display: 'flex',
                flexWrap: 'wrap',
                display: 'inline-block',
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
                <img src={bibi} alt="food background"  style={{height:30,width:30}} />,
                <img src={salad} alt="food background"  style={{height:30,width:30}} />,

              ]}
            >
              <Meta className='meta'
                style={{ margin: 'auto' }}
                avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
                title={data.name}
                // description={data.city}
                // price={data.price}
              />
            </Card>
          )
        })}
      </div>
    </>
  )
}
export default AllDishes
