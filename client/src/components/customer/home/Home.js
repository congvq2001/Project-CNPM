import React, { useState,useEffect } from 'react'
import './Home.css'
import {Carousel,Row,Card,Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const [lastEvent, setLastEvent] = useState([])
    const [login, setLogin] = useState(false)

    let navi=useNavigate();
    
    const handleEvent=(id)=>{
        navi(`/user/event/${id}`);
    }

    useEffect(() => {
          let accessToken=localStorage.getItem("accessToken");
          if(accessToken){
            setLogin(true);
          } 
          else setLogin(false);  
      },[localStorage.getItem("accessToken")])

    useEffect(() => {
        fetch('http://localhost:5000/api/v1/latestEvents', {
                    method: 'GET', // or 'PUT'
                    }
            )
            .then(response => response.json())
           .then(data => {
                setLastEvent(data.result);
            })
            .catch((error) => {
                alert("eror");
            }) 
      }, []);

    return (
            <div className='home_ctn'>
            <div className='slider_home'>
            
            <Carousel className='back'>
                <Carousel.Item>
                    <div className='slider sl1'>
                    </div>
                    <Carousel.Caption className='welcome' style={{color:"black"}}>
                        <h3>Chào mừng đến TinkerBellGarden</h3>
                        <p>Mở cửa vào tất cả các ngày trong tuần</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='slider sl2'>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='slider sl3'>
                    </div>
                </Carousel.Item>
            </Carousel>
            </div>
            <Row>
                {
                    lastEvent.map(evnt=>
                        <Card key={evnt._id} className='ev'>
                            <Card.Img variant="top" src={evnt.image[0]}  height="300"/>          
                            <Card.Body>
                                <Card.Title>{evnt.name}</Card.Title>
                                <Card.Text>
                                    {evnt.description}
                                </Card.Text>
                            <Button 
                                variant="primary"
                                onClick={()=>handleEvent(evnt._id)}
                            >
                                Xem thêm
                            </Button>
                        </Card.Body>
                        </Card>
                    )
                }
            </Row>
            <div className="home_container">  
                <div className="news_event">
                    <div className="news">
                        <p className='head'>Tin tức</p> 
                        <div className='items'>
                            <div className='item'>
                                <div className='date'>
                                    <p className='month'>Tháng 9</p>
                                    <p className='day'>15</p>
                                </div>
                                <div className='ct'>
                                    <div className='tt'><a href="##">tin tức 1</a></div>
                                    <div className='time'>15/9/2022</div>                                    
                                </div>                              
                            </div>
                            <div className='item'>
                                <div className='date'>
                                    <p className='month'>Tháng 9</p>
                                    <p className='day'>15</p>
                                </div>
                                <div className='ct'>
                                    <div className='tt'><a href="##">tin tức 1</a></div>
                                    <div className='time'>15/9/2022</div>                                    
                                </div>                              
                            </div>
                            <div className='item'>
                                <div className='date'>
                                    <p className='month'>Tháng 9</p>
                                    <p className='day'>15</p>
                                </div>
                                <div className='ct'>
                                    <div className='tt'><a href="##">tin tức 1</a></div>
                                    <div className='time'>15/9/2022</div>                                    
                                </div>                              
                            </div>
                        </div>
                    </div>                                       
                </div>
            </div>
            </div>
    )
}
