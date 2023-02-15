import axios from "axios";
import React, { useEffect, useState}  from "react";
import {Form, Col, Row, InputGroup, FormControl} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function EditGame() {
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [location, setLocation] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");

    let navi = useNavigate();
    let {idfc} = useParams();
    console.log(idfc);

    useEffect(() => {
        const fetchfc = async ()=>{
        let data=await axios.get(`http://localhost:5000/api/v1/game/${idfc}`);
        console.log(data);
        data = data.data.data;
        setCode(data.code);
        setName(data.name);
        setPrice(data.price);
        setLocation(data.location);
        setType(data.type);
        setStatus(data.status);
      }
      fetchfc();
    }, []);
    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log(status);
        if(code && name && location && type && status){
            try{
                const res=await axios.patch(`http://localhost:5000/api/v1/game/${idfc}`,
                                            {
                                                code,
                                                name,
                                                price,
                                                location,
                                                type,
                                                status
                                            }
                            ); 
                console.log(res);
                if(res.status==200){
                    alert("Sửa thành công");
                    navi("/manager/games");

                } 
            }catch(error){
                alert("Sửa thất bại");
            }
        }else{
            alert("Hãy điền đầy đủ thông tin");
        }
    }
        return (
            <div className="db">

                <Form id="form">
                    <h3>Sửa thông tin trò chơi</h3>
                    <Form.Label>Mã trò chơi</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        required
                        type="text"
                        value={code}
                        placeholder='Vd. A001'
                        onChange={e=>setCode(e.target.value)}
                    />
                    </InputGroup>
                    <Form.Label>Tên trò chơi</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Vd. Đu quay"
                        value={name}
                        onChange={e=>setName(e.target.value)}
                    />
                    </InputGroup>
                    <Form.Label>Giá vé tham gia</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        required
                        type="number"
                        placeholder="Vd. 1000"
                        value={price}
                        onChange={e=>setPrice(e.target.value)}
                    />
                    </InputGroup>
                    <Form.Label>Khu</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Vd. Khu B"
                        value={location}
                        onChange={e=>setLocation(e.target.value)}
                    />
                    </InputGroup>
                    <Form.Label>Thể loại</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control as="select" defaultValue={type} onChange={(e)=>setType(e.target.value)}>
                            <option value='Casual'>Casual</option>
                            <option value='Other'>Other</option>
                        </Form.Control>
                    </InputGroup>
                    <Form.Label>Tình trạng</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control as="select" defaultValue={status} onChange={(e)=>setStatus(e.target.value)}>
                            <option value='Active'>Active</option>
                            <option value='Fixing'>Fixing</option>
                            <option value='Inactive'>Inactive</option>
                            <option value='Updating'>Updating</option>
                        </Form.Control>
                    </InputGroup>
                <button onClick={(e)=>handleSubmit(e)} style={{paddingTop : '10px'}} className="btn btn-dark btn-lg btn-block">Submit</button>
                </Form>
            </div>
        );
    
}