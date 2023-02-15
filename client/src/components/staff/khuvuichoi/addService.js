import axios from "axios";
import React, { useState}  from "react";
import {Form, Col, Row, InputGroup, FormControl} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AddGame() {
    const [nameTicket, setNameTicket] = useState("");
    const [price, setPrice] = useState(1);

    let navi=useNavigate();

    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(nameTicket&&price){
            try{
                const res=await axios.put("http://localhost:5000/api/v1/typeTicket/61eab0db9cc06741fc0d4ce6",
                                            {
                                                nameTicket,
                                                price
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
                        value={nameTicket}
                        onChange={e=>setNameTicket(e.target.value)}
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

                <button onClick={(e)=>handleSubmit(e)} style={{paddingTop : '10px'}} className="btn btn-dark btn-lg btn-block">Submit</button>
                </Form>
            </div>
        );
}