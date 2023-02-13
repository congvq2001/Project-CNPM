import React,{useState,useEffect} from 'react'
import { Form, Card, Button, Row, Col } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';

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
        console.log(res)
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
                <Row md={4}>
                {
                    listEvent.map(ev=>
                        <Col key={ev._id} md={4} style={{marginBottom:"25px"}}>
                            <Card >
                                {<Card.Img variant="top" src={ev.image[0] ? ev.image[0] : 'https://hoianit.com/wp-content/uploads/2020/06/bana1.jpg'} height="300" />}
                                <Card.Body>
                                    <Card.Title>{ev.name}</Card.Title>
                                    <Card.Text style={{ textOverflow: "ellipsis",whiteSpace: "nowrap",overflow: "hidden" }}>
                                        {ev.description}
                                    </Card.Text>
                                    {
                                        checkjoin(ev._id)
                                        ?
                                        <Card.Text style={{color:"green",marginLeft:"5px"}}>Đã tham gia</Card.Text>
                                        :
                                        <Card.Text style={{color:"blue",marginLeft:"5px"}}>Chưa tham gia</Card.Text>  
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
                
            <Outlet/>
            </div>
        )
}
                                                        