import axios from "axios";
import React, { useEffect, useState}  from "react";
import {Form, Col, Row, InputGroup, FormControl} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function ChangeCus() {
    const [phone, setphone] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
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
        setAddress(data.address);
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
                    <Form.Group className="mb-3">
                        <Form.Label>Tên khách hàng</Form.Label>
                        <Form.Control placeholder={name} disabled />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control placeholder={address} disabled />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control placeholder={phone} disabled />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control placeholder={email} disabled />
                    </Form.Group>

                    <Form.Label>Trạng thái tài khoản</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control as="select" value={status} onChange={(e)=>setStatus(e.target.value)}>
                        <option value={true}>Kích Hoạt</option>
                        <option value={false}>Hủy kích hoạt</option>
                    </Form.Control>
                    </InputGroup>

                <button onClick={e=>handleSubmit(e)} style={{paddingTop : '10px'}} className="btn btn-dark btn-lg btn-block">Submit</button>
                
            

            </div>

        );
    
}