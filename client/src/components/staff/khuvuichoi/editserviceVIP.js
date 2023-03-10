import axios from "axios";
import React, { useEffect, useState}  from "react";
import {Form, Col, Row, InputGroup, FormControl} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function EditserviceVIP() {
    const [nameTicket, setNameTicket] = useState("");
    const [price, setPrice] = useState(1);
    const [time,settime] =useState(1)
    const [kindOfTime, setkindOfTime] = useState("");

    let navi = useNavigate();
    let {idloaive,idve} = useParams();

    useEffect(() => {
        const fetchfc = async ()=>{
        let res=await axios.get(`http://localhost:5000/api/v1/ticket/${idloaive}`);
        console.log(res)
        if(res.data.success){
            const list=res.data.result.type
            list.map(iteam=>{
                if(iteam._id===idve){
                    setNameTicket(iteam.nameTicket)
                    setPrice(iteam.price)
                    settime(iteam.time)
                    setkindOfTime(iteam.kindOfTime)
                }
            })
        }else{
            alert("that bai")
        }
      }
      fetchfc();
    }, []);
    console.log(kindOfTime)
    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(nameTicket&&price&&time&&kindOfTime){
            try{
                const res=await axios.put(`http://localhost:5000/api/v1/ticket/${idloaive}/${idve}`,
                                            {
                                                nameTicket,
                                                price,
                                                time,
                                                kindOfTime
                                            }
                            ) 
                console.log(res);
                if(res.status==200){
                    alert("sua thanh cong");
                    navi("/manager/services")

                } 
            }catch(error){
                alert("sua that bai")
            }
        }else{
            alert("nhap form di bro");
        }
    }
        return (
            <div className="db">

                <Form id="form">
                    <h3>S???a VIP</h3>
                    
                    <Form.Label>T??n v??</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        required
                        type="text"
                        placeholder="T??n v??"
                        value={nameTicket}
                        onChange={e=>setNameTicket(e.target.value)}
                    />
                    </InputGroup>
                    
                    <Form.Label>Gi??</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Gi??"
                        value={price}
                        onChange={e=>setPrice(e.target.value)}
                    />
                    </InputGroup>

                    <Form.Label>Time</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Time"
                        value={time}
                        onChange={e=>settime(e.target.value)}
                    />
                    </InputGroup>

                    <Form.Label>Lo???i</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control as="select" defaultValue={ kindOfTime } onChange={(e)=>setkindOfTime(e.target.value)}>
                        <option value='day'>Ng??y</option>
                        <option value='month'>Th??ng</option>
                        <option value='year'>N??m</option>
                    
                        </Form.Control>
                        </Form.Group>
                    </InputGroup>

                <button onClick={(e)=>handleSubmit(e)} style={{paddingTop : '10px'}} className="btn btn-dark btn-lg btn-block">Submit</button>
                </Form>
            </div>
            
        )
}