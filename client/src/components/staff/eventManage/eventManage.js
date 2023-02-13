import React, { useState,useEffect}  from "react";
import { Col, Row, Card, Button, ButtonToolbar, ButtonGroup} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import './eventManage.css'
import { AiOutlineDelete } from 'react-icons/ai';
import {BsPen} from 'react-icons/bs'
import axios from "axios"


export default function EventManage() {
    const [listEvent, setListEvent] = useState([]);

    let navi=useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/v1/allEvent', {
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
    }, []);

    const handleDeteleEvent =async (id)=>{
        try{
            const res=await axios.delete(`http://localhost:5000/api/v1/event/${id}`)
            console.log(res);
            if(res.data.success){
                
                const newdata=listEvent.filter(ev=>ev._id!==id);
                setListEvent(newdata); 
                alert("xoa thanh cong");
            }
          }catch(err){
            alert("error")
          }
    }
        return (
            <div className="em">
                <div className="eventList">
                <Row md={6}>
                {
                    listEvent.map(ev=>

                        <Col key={ev._id} md={5} style={{marginBottom:"25px"}}>
                            <Card className='av'>
                            <div className='ribbon'><span>-{ev.discount}%</span></div>
                                <Card.Img variant="top" src={ev.image[0]} height="270px" />
                                <Card.Body height="100px">
                                    <Card.Title>{ev.name}</Card.Title>
                                    <Card.Text>
                                        {ev.description}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                <ButtonToolbar
                                    className="justify-content-between"
                                    aria-label="Toolbar with Button groups"
                                >
                                    <ButtonGroup className="mr-2">
                                    </ButtonGroup>
                                    <ButtonGroup className="mr-2">
                                        <Button onClick={()=>navi( `/manager/suask/${ev._id}`)} variant="outline-secondary" style= {{ border: `none` }}>
                                            <BsPen/>
                                        </Button>
                                        <Button onClick={()=>handleDeteleEvent(ev._id)} variant="outline-danger" style= {{ border: `none` }} >
                                            <AiOutlineDelete />
                                        </Button>
                                    </ButtonGroup>
                            
                                </ButtonToolbar>
                                </Card.Footer>   
                            </Card>
                        </Col> 
                    )
                } 
                </Row>
                </div>
            </div>

        );
    
}