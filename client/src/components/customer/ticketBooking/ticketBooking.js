import React, { useEffect, useState } from "react"
import {Form, Button,Col,Row} from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import axios from "axios"

export default function TicketBooking() {
    const [listTicket, setListTicket] = useState([]);
    const [idTicket, setIdTicket] = useState("");
    const [quantity,setQuantity] = useState(1);
    const [demoP, setDemoP] = useState(0);
    let accessToken=localStorage.getItem("accessToken");
    let navi=useNavigate();
    
    useEffect(() => {
        fetch("http://localhost:5000/api/v1/customerEvent?o=-1", {
            method: 'GET',
            headers: {
                authorization :`Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setListTicket(data.result);
        })
        .catch((error) => {
            alert("eror");
        })
    }, []);
    
    useEffect(() => {
        listTicket.map(tk=>{
            if(tk._id===idTicket){
                setDemoP(tk.price*quantity*0.8);
                return;
            }
        })
    }, [quantity, idTicket]);
    
    
    const handleSubmit =async(e)=>{
        if(idTicket&&quantity){
            const res=await axios.post(`http://localhost:5000/api/v1/customerEvent/${idTicket}`,
                                        {
                                            quantity
                                        } 
                                        ,
                                        {
                                            headers:{
                                                authorization: `Bearer ${accessToken}`
                                            }
                                        }
                            )
            console.log(res);
            if(res.data.success){
                alert("Bạn đã đặt vé thành công")
                navi('/user/event')
            }else{
                alert("Bạn chưa đặt vé thành công")
            }
        }else{
            alert("Vui lòng cung cấp đầy đủ thông tin")
        }
    }

    return <div className="outer1">
        <div className="inner1">
            <h3>Đặt vé</h3>
            <Row>
            <Col>
            <Form>
                <Form.Group>
                    <Form.Label>Loại vé</Form.Label>
                    <Form.Control as="select" onChange={e=>setIdTicket(e.target.value)}>
                        <option>Chọn loại vé</option>
                        {
                            listTicket.map(ticket=>
                                <option key={ticket._id} value={ticket._id}>{ticket.name}</option>
                            )
                        }
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Số lượng vé</Form.Label>
                    <Form.Control as="select" onChange={e=>setQuantity(e.target.value)}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                    </Form.Control>
                </Form.Group>
                
            </Form>
            </Col>
            
            <Col>
            <p>Giá tiền dự kiến (Đặt trước): {demoP} vnđ</p>
                <Button onClick={(e)=>handleSubmit(e)}>Đặt vé</Button>
            </Col>
            </Row>
        </div>
    </div>
}
