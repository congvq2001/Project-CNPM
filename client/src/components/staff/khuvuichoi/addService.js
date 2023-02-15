import axios from "axios";
import React, { useState}  from "react";
import {Form, Col, Row, InputGroup, FormControl} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AddFacility() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(1);
    const [timeLimit, setTimeLimit] = useState(0);
    const [ticketType, setTicketType] = useState('')
    let navi=useNavigate();

    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(name&&price&&ticketType&&timeLimit){
            try{
                const res=await axios.post("http://localhost:5000/api/v1/ticket",
                    {
                                                ticketType,
                                                name,
                                                price,
                                                timeLimit
                                            }
                            ) 
                console.log(res);
                if(res.status==200){
                    alert("tao thanh cong");
                    navi("/manager/services")
                } 
            }catch(error){
                alert("tao that bai")
            }
        }else{
            alert("nhap form di bro");
        }
    }
        return (
            <div className="db">

                <Form id="form">
                    <h3>Thêm vé tại quầy</h3>
                    
                    <Form.Label>Tên vé</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Tên vé"
                        value={name}
                        onChange={e=>setName(e.target.value)}
                    />
                    </InputGroup>
                    
                    <Form.Label>Giá</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Giá"
                        value={price}
                        onChange={e=>setPrice(e.target.value)}
                    />
                    </InputGroup>
                     <Form.Label>Loại vé</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        required
                        as='select'
                        placeholder="Chọn loại vé"
                        value={ticketType}
                        onChange={e=>setTicketType(e.target.value)}
                        >
                            <option> Chọn loại vé </option>
                            <option value={'Casual'}>Vé thường</option>
                            <option value={'Unlimited'}>Vé không giới hạn</option>
                        </Form.Control>
                    </InputGroup>
                    {ticketType == 'Casual' ? <>
                     <Form.Label>Giới hạn thời gian</Form.Label>
                        <InputGroup className="mb-3">
                        <Form.Control
                            required
                            type="text"
                            placeholder="Phút"
                            value={timeLimit}
                            onChange={e=>setTimeLimit(e.target.value)}
                        />
                        </InputGroup>
                    </> : <></>
                    }

                <button onClick={(e)=>handleSubmit(e)} style={{paddingTop : '10px'}} className="btn btn-dark btn-lg btn-block">Submit</button>
                </Form>
            </div>
        );
}