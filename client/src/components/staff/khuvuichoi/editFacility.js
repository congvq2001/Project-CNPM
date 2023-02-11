import axios from "axios";
import React, { useEffect, useState}  from "react";
import {Form, Col, Row, InputGroup, FormControl} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function EditFacility() {
    const [facilities_code, setFacilities_code] = useState("");
    const [name, setName] = useState("");
    const [region, setRegion] = useState("");
    const [status, setStatus] = useState("");

    let navi = useNavigate();
    let {idfc} = useParams();

    useEffect(() => {
        const fetchfc = async ()=>{
        let data=await axios.get(`http://localhost:5000/api/v1/facilities/${idfc}`);
        console.log(data);
        data= data.data.data;
        setFacilities_code(data.facilities_code);
        setName(data.name);
        setRegion(data.region);
        setStatus(data.status);
      }
      fetchfc();
    }, []);
    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(facilities_code&&name&&region&&status){
            try{
                const res=await axios.patch(`http://localhost:5000/api/v1/facilities/${idfc}`,
                                            {
                                                facilities_code,
                                                name,
                                                region,
                                                status
                                            }
                            ) 
                console.log(res);
                if(res.status==200){
                    alert("sua thanh cong");
                    navi("/manager/facilities")

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
                    <h3>Sửa thông tin CSVC</h3>
                    <Form.Label>Mã CSVC</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        required
                        type="text"
                        value={facilities_code}
                        placeholder='Vd. A001'
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