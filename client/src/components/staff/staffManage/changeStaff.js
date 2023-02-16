import axios from "axios";
import React, { useEffect, useState}  from "react";
import {Form, Col, Row, InputGroup, FormControl} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function ChangeStaff() {
    const [phone, setphone] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
      const accessToken = localStorage.getItem('accessToken')
    let navi=useNavigate();
    let { idnv }=useParams();


    useEffect(() => {
        const fetchnv = async ()=>{
        let datanv=await axios.get(`http://localhost:5000/api/v1/staff/${idnv}`,{ headers:{
              authorization: `Bearer ${accessToken}`
            } });
        let data= datanv.data.data;
        
        setName(data.name);
        setEmail(data.email);
        setphone(data.phone);
        setRole(data.role);
      }
        fetchnv();
    }, []);
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
      if(phone&&name&&role&&email){
          if(password){
            try{
                let res=await axios.patch(`http://localhost:5000/api/v1/staff/${idnv}`,
                    {
                      phone,
                      password,
                      name,
                      email,
                      role,
                    },{ headers:{
              authorization: `Bearer ${accessToken}`
            } })
                
                if(res.data.success){
                    alert("Sửa thông tin thành công")
                    navi("/manager/quanlynv")
                }else{
                    alert("Thông tin chưa được cập nhật")
                }
            }catch(err){
                alert("err")
            }
          }else{
            try{
                let res=await axios.patch(`http://localhost:5000/api/v1/staff/${idnv}`,
                    {
                      phone,
                      name,
                      email,
                      role
                    },{ headers:{
              authorization: `Bearer ${accessToken}`
            } })
                if(res.data.success){
                    alert("Sửa thông tin thành công")
                    navi("/manager/quanlynv")
                }else{
                    alert("Thông tin chưa được cập nhật")
                }
            }catch(err){
                alert("err")
            }
          }
          
      }else{
          alert("Vui lòng ghi đầy đủ thông tin")
      }
    }
        return (
            <div className="db">
                
                    <h3>Thay đổi thông tin nhân viên</h3>
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
                    <Form.Control as="select" value={role} onChange={(e)=>setRole(e.target.value)}>
                        <option value={'quanLy'}>Người quản lý</option>
                        <option value={'nvQuay'}>Nhân viên quầy</option>
                        <option value={'nvLeTan'}>Nhân viên lễ tân</option>
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
                    
                    <label>Mật khẩu mới</label>
                    <InputGroup className="mb-3">
                        <FormControl
                        type="text"
                        placeholder="Nhập mật khẩu"
                        defaultValue=""
                        onChange={e=>setPassword(e.target.value)}
                    />
                    </InputGroup>
                    
                    
               
                <button onClick={e=>handleSubmit(e)} style={{paddingTop : '10px'}} className="btn btn-dark btn-lg btn-block">Submit</button>
                
            

            </div>

        );
    
}