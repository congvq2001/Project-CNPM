import React, { useEffect, useState } from "react"
import {Form, Button,Col,Row} from "react-bootstrap"
import axios from "axios"

function TicketBooking() {
    const [listTicket, setListTicket] = useState([]);
    const [idTicket, setIdTicket] = useState("");
    const [quantity,setQuantity] = useState(1);
    const [demoP, setDemoP] = useState(0);
    let accessToken=localStorage.getItem("accessToken");
    
    useEffect(() => {
        fetch("http://localhost:5000/api/v1/ticket/61eaafd99cc06741fc0d4cda", {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            setListTicket(data.result.type);
        })
        .catch((error) => {
            alert("eror");
        })
    }, []);
    
    useEffect(() => {
        listTicket.map(tk=>{
            if(tk._id===idTicket){
                setDemoP(tk.price*quantity);
                return;
            }
        })
    }, [quantity,idTicket]);
    
    const handleSubmit =async(e)=>{
        e.preventDefault();
        if(idTicket&&quantity){
            const res=await axios.post("http://localhost:5000/api/v1/user-buy-ticket",
                                        {
                                            id_ticket:idTicket,
                                            quantity,
                                            price:demoP,
                                            is_paid:false        
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
                alert("dat ve thanh cong")
            }else{
                alert("that bai")
            }
        }else{
            alert("khong du thong tin")
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
                                <option key={ticket._id} value={ticket._id}>{ticket.nameTicket}</option>
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
            <p>Giá tiền dự kiến: {demoP} vnđ</p>
                <Button onClick={(e)=>handleSubmit(e)}>Đặt vé</Button>
            </Col>
            </Row>
        </div>
    </div>
}
export default TicketBooking
