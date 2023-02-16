import React,{useState,useEffect} from 'react'
import { Form, Card, Button, Row, Col } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import image from '../home/onlday.jpg'

export default function EventList() {
    const [listEvent, setListEvent] = useState([]);
    const [eventJoined, seteventJoined] = useState([]);

    let accessToken=localStorage.getItem("accessToken")

    useEffect(() => {
        fetch('http://localhost:5000/api/v1/event', {
            method: 'GET',
            }
        )
        .then(response => response.json())
        .then(data => {
            setListEvent(data.result);
        })
        .catch((error) => {
            alert("eror");
        })  
        fetchevjoined();
    }, []);

    const fetchevjoined=async()=>{
        try{
        const res=await axios.get("http://localhost:5000/api/v1/customerEvent",{
            headers:{
              authorization: `Bearer ${accessToken}`
            }
        })
        console.log(res.data.result)
        if(res.data.success){
            seteventJoined(res.data.result);
        }
        }catch(err){
           console.log(err);
        }
    }

    

    const checkjoin=(id)=>{
        let check=false;
        eventJoined.map(ev=>{
            if(ev._id===id) check=true;
        })
        return check;
    }

        return (
            <div className="eventList">
                <div style={{backgroundColor: 'blanchedalmond', width: '23%', height: '70px', textAlign: 'center', paddingBottom: '25px', border: '1px solid burlywood'}}>
                    <h3>Sự kiện chưa tham gia</h3>
                </div>
                <Row md={4}>
                {
                    listEvent.map(ev=>
                        checkjoin(ev._id) ? <Col></Col> :
                        <Col key={ev._id} md={4} style={{marginBottom:"25px"}}>
                            <Card >
                                {<Card.Img variant="top" src={ev.image[0] ? ev.image[0] : image} height="300" />}
                                <Card.Body>
                                    <Card.Title style={{fontSize: "36px", color: "#30475E"}}><b>{ev.name}</b></Card.Title>
                                    <Card.Text style={{ textOverflow: "ellipsis",whiteSpace: "nowrap",overflow: "hidden" }}>
                                        {ev.description}
                                    </Card.Text>
                                    {
                                        checkjoin(ev._id)
                                        ?
                                        <Card.Text style={{color:"green",marginLeft:"5px"}}>Đã đặt vé</Card.Text>
                                        :
                                        <Card.Text style={{color:"blue",marginLeft:"5px"}}>Chưa đặt vé</Card.Text>  
                                    }
                                </Card.Body>
                                <Card.Footer>
                                    <p className="seeMore">
                                        <Link to={`/user/event/${ev._id}`}>Xem thêm</Link>
                                    </p>
                                </Card.Footer>
                            </Card>
                        </Col>
                    )
                } 
                </Row>

                <div style={{backgroundColor: 'blanchedalmond', width: '23%', height: '70px', textAlign: 'center', paddingBottom: '25px', border: '1px solid burlywood'}}>
                    <h3>Sự kiện đã tham gia</h3>
                </div>
                <Row md={4}>
                {
                    listEvent.map(ev=>
                        checkjoin(ev._id) ?
                        <Col key={ev._id} md={4} style={{marginBottom:"25px"}}>
                            <Card >
                                {<Card.Img variant="top" src={ev.image[0] ? ev.image[0] : image} height="300" />}
                                <Card.Body>
                                    <Card.Title style={{fontSize: "36px", color: "#30475E"}}><b>{ev.name}</b></Card.Title>
                                    <Card.Text style={{ textOverflow: "ellipsis",whiteSpace: "nowrap",overflow: "hidden" }}>
                                        {ev.description}
                                    </Card.Text>
                                    {
                                        checkjoin(ev._id)
                                        ?
                                        <Card.Text style={{color:"green",marginLeft:"5px"}}>Đã đặt vé</Card.Text>
                                        :
                                        <Card.Text style={{color:"blue",marginLeft:"5px"}}>Chưa đặt vé</Card.Text>  
                                    }
                                </Card.Body>
                                <Card.Footer>
                                    <p className="seeMore">
                                        <Link to={`/user/event/${ev._id}`}>Xem thêm</Link>
                                    </p>
                                </Card.Footer>
                            </Card>
                        </Col> 
                        : <Col></Col>
                    )
                } 
                </Row>
                
            <Outlet/>
            </div>
        )
}
                                                        