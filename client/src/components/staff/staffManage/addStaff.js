import axios from "axios";
import React, { useState}  from "react";
import {Form, Col, Row, InputGroup, FormControl} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AddEvent() {
    const [phone, setphone] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("quanLy");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let navi=useNavigate();

    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(phone&&name&&role&&email&&password){
            try{
                const res=await axios.post("http://localhost:5000/api/v1/signup-staff",
                                            {
                                                phone,
                                                password,
                                                name,
                                                email,
                                                role
                                            }
                            ) 
                console.log(res);
                if(res.status==200){
                    alert("tao thanh cong");
                    navi("/manager/quanlynv")
                } 
            }catch(error){
                alert("tao that bai")
            }
        }else{
            alert("nhap form di bro");
        }
    }
    console.log(role)
        return (
            <div className="db">

                <Form id="form">
                    <h3>Thêm nhân viên</h3>
                    <Form.Label>Tên nhân viên</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Nhập tên nhân viên"
                        value={name}
                        onChange={e=>setName(e.target.value)}
                    />
                    </InputGroup>
                    <Form.Label>Chức vụ</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control as="select" defaultValue={'quanLy'} onChange={(e)=>setRole(e.target.value)}>
                        <option value='quanLy'>Người quản lý</option>
                        <option value='nvQuay'>Nhân viên quầy</option>
                        <option value='nvLeTan'>Nhân viên lễ tân</option>
                    </Form.Control>
                    </InputGroup>

                    <Form.Label>Số điện thoại</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Nhập số điện thoại"
                        value={phone}
                        onChange={e=>setphone(e.target.value)}
                    />
                    </InputGroup>

                    <Form.Label>Email</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Nhập email"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                    </InputGroup>
                    
                    <label>Mật khẩu</label>
                    <InputGroup className="mb-3">
                        <FormControl
                        required
                        type="text"
                        placeholder="Nhập mật khẩu"
                        defaultValue=""
                        onChange={e=>setPassword(e.target.value)}
                    />
                    </InputGroup>
                    
                <button onClick={(e)=>handleSubmit(e)} style={{paddingTop : '10px'}} className="btn btn-dark btn-lg btn-block">Submit</button>
                </Form>
            

            </div>

        );
    
}