import axios from "axios";
import React, { useState}  from "react";
import {Form, Col, Row, InputGroup, FormControl} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AddFacility() {
    const [facilities_code, setFacilities_code] = useState("");
    const [name, setName] = useState("");
    const [region, setRegion] = useState("");
    const [status, setStatus] = useState("");

    let navi=useNavigate();

    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(facilities_code&&name&&region&&status){
            try{
                const res=await axios.post("http://localhost:5000/api/v1/facilities",
                                            {
                                                facilities_code,
                                                name,
                                                region,
                                                status
                                            }
                            ) 
                console.log(res);
                if(res.status==200){
                    alert("tao thanh cong");
                    navi("/manager/facilities")
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
                    <h3>Thêm cơ sở vật chất</h3>
                    <Form.Label>Mã CSVC</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Vd. A001"
                        value={facilities_code}
                        onChange={e=>setFacilities_code(e.target.value)}
                    />
                    </InputGroup>
                    <Form.Label>Tên CSVC</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Vd. Đu quay"
                        value={name}
                        onChange={e=>setName(e.target.value)}
                    />
                    </InputGroup>
                    <Form.Label>Khu</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Vd. X"
                        value={region}
                        onChange={e=>setRegion(e.target.value)}
                    />
                    </InputGroup>
                    <Form.Label>Tình trạng</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Vd. Tốt"
                        value={status}
                        onChange={e=>setStatus(e.target.value)}
                    />
                    </InputGroup>

                <button onClick={(e)=>handleSubmit(e)} style={{paddingTop : '10px'}} className="btn btn-dark btn-lg btn-block">Submit</button>
                </Form>
            </div>
        );
}