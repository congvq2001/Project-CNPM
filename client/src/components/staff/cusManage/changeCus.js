import axios from "axios";
import React, { useEffect, useState}  from "react";
import {Form, Col, Row, InputGroup, FormControl} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function ChangeCus() {
    const [phone, setphone] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [email, setEmail] = useState("");
    const accessToken = localStorage.getItem('accessToken')
    let navi=useNavigate();
    let { idkh }=useParams();


    useEffect(() => {
        const fetchkh = async ()=>{
        let datakh=await axios.get(`http://localhost:5000/api/v1/customer/${idkh}`,{ headers:{
              authorization: `Bearer ${accessToken}`
            } });
        let data= datakh.data.data;
        
        setName(data.name);
        setEmail(data.email);
        setphone(data.phone);
        setStatus(data.status);
      }
        fetchkh();
    }, []);
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(phone&&name&&email){
            try{
                let res=await axios.patch(`http://localhost:5000/api/v1/customer/${idkh}`,
                    {
                      status
                    },{ headers:{
              authorization: `Bearer ${accessToken}`
            } })
                
                if(res.data.success){
                    alert("Sửa thông tin thành công")
                    navi("/manager/quanlykh")
                }else{
                    alert("Thông tin chưa được cập nhật")
                }
            }catch(err){
                alert("err")
            }
      }else{
          alert("Vui lòng ghi đầy đủ thông tin")
      }
    }
        return (
            <div className="db">
                
                    <h3>Thay đổi thông tin khách hàng</h3>
                    <Form.Label>Tên khách hàng</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        // required
                        type="text"
                        placeholder="Nhập tên khách hàng"
                        value={name}
                        // onChange={e=>setName(e.target.value)}
                    />
                    </InputGroup> 
                    <Form.Label>Trạng thái tài khoản</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control as="select" value={status} onChange={(e)=>setStatus(e.target.value)}>
                        <option value={true}>Kích Hoạt</option>
                        <option value={false}>Hủy kích hoạt</option>
                    </Form.Control>
                    </InputGroup>
                    <Form.Label>Số điện thoại</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        // required
                        type="text"
                        placeholder="Nhập số điện thoại"
                        value={phone}
                        // onChange={e=>setphone(e.target.value)}
                    />
                    </InputGroup>

                    <Form.Label>Email</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        // required
                        type="text"
                        placeholder="Nhập email"
                        value={email}
                        // onChange={e=>setEmail(e.target.value)}
                    />
                    </InputGroup>

                <button onClick={e=>handleSubmit(e)} style={{paddingTop : '10px'}} className="btn btn-dark btn-lg btn-block">Submit</button>
                
            

            </div>

        );
    
}