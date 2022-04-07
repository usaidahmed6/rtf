import React, { useEffect, useState } from 'react';
import { Spin, Card, Avatar, Image, } from 'antd';
import { Link, useNavigate } from 'react-router-dom'
// import './Restaurant.css'
import Meta from 'antd/lib/card/Meta';
// import iconEnter from '../screen/images/enterIcon.png';
// import iconFood from '../screen/images/food-icon.png'
import { useParams } from 'react-router-dom'
import { userRef3, getDocs, getDoc, auth, collection, db, onSnapshot, userRef4, doc ,userRef, restaurantForm } from './firebase';
import { addDoc, query, where } from 'firebase/firestore';
import {
    ShoppingCartOutlined
} from '@ant-design/icons';





export const Restaurantdetails = () => {


    const [res, setRes] = useState([false])
    const [restaurentUid, setRestaurentUid] = useState('')
    const [shop, setShop] = useState(0)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const params = useParams()
    console.log('id hey ===>', params);
    const docRef = doc(db, "Restaurant", params.id);



    useEffect(() => {

        setLoading(true)
        setTimeout(() => {
            setLoading(false)

        }, 4000)
        onSnapshot(
            collection(db, "AddDishes"),
            (snapshot) => {
                getDishe()
                // getRestaurant()
            },
            (error) => {
                alert(error)
            });

    }, [])

    let resturantsUid;
 


    const getDishe = async () => {
    const dishes = await getDoc(restaurantForm)
        console.log('object of restaurent=>', restaurantForm.data().uid)
         resturantsUid =  restaurantForm.data().uid
        console.log('uidddd==============================================>',  resturantsUid)

        const q = query(userRef3, where("uid", "==", resturantsUid))

        const querySnapshot = await getDocs(q);
        let dish = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            // console.log(doc.id, " => ", doc.data());
            dish.push({ id: doc.id, ...doc.data() })
        });
        setRes(dish)
        // console.log('pppppppppppppppp===>', dish[0].price)
    }

    // const goToDishPage = (dish) => {
    //     console.log('dishhhhhhh==>', dish)
    //     // console.log('res==========>', res)
    //     navigate(`/Restaurantdetails/${dish.collectionName}/${dish.id}`)
    // }

    const hendleorder = (e) => {
        setShop(shop + 1)
        // console.log('collectionName', e.collectionName);
        // console.log('description', e.description);
        // console.log('id', e);
        // console.log('collectionImage', e.collectionImage);
        // console.log('price', e.price);
        // console.log('shop', shop);
        // console.log('uid', e.uid);
        // console.log('id', e.id);
        const obj = {
            name: e.collectionName,
            description: e.description,
            image: e.collectionImage,
            price: e.price,
            order: shop,
            uid: e.uid,
            // id: e.id,

        }
        addDoc(userRef4, obj)


    }
   
  



    return (
        <div className='main' >




            {
                loading ?
                    <div> <Spin size='large' className='spin' /></div>
                    :
                    <div className="main-div-hohe">
                        <div className="shopping ">
                            <Link to={'/Shopping'}>
                                <ShoppingCartOutlined className='shopping' />
                                <span>{shop}</span>
                            </Link>
                        </div>
                        {
                            res.map((data, index) => {

                                return (


                                    <Card
                                        className='card-divs'
                                        key={index}
                                    // onClick={() => goToDishPage(data)}


                                    >
                                        <Meta
                                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                            title={data.name}


                                        />

                                        <img

                                            src={data.picture}
                                            className={'collection_img'}


                                        />
                                        <p>RS {data.price}</p>
                                        <p className='para'> {data.city} </p>

                                        {/* <button className="btn btn-danger btn-sm order-btn" onClick={() => hendleorder(data)}>order</button> */}
                                    </Card>


                                )
                            })
                        }
                    </div>
            }



        </div>
    );
}

