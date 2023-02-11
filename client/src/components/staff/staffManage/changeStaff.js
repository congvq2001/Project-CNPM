import axios from "axios";
import React, { useEffect, useState}  from "react";
import {Form, Col, Row, InputGroup, FormControl} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function ChangeStaff() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState(0);
    const [email, setEmail] = useState("");
    const [salary, setSalary] = useState(0);
    const [password, setPassword] = useState("");

    let navi=useNavigate();
    let { idnv }=useParams();


    useEffect(() => {
        const fetchnv = async ()=>{
        let datanv=await axios.get(`http://localhost:5000/api/v1/staff/${idnv}`);
        let data= datanv.data.data;
        console.log(data)
        setName(data.name);
        setEmail(data.email);
        setSalary(data.salary);
        setPhoneNumber(data.phoneNumber);
        setRole(data.role);
      }
      fetchnv();
    }, []);
    console.log(role);
    const handleSubmit = async (e)=>{
        e.preventDefault();
      if(phoneNumber&&name&&(role+1)&&email&&(salary+100)){
          if(password){
            try{
                let res=await axios.patch(`http://localhost:5000/api/v1/staff/${idnv}`,
                    {
                      phoneNumber,
                      password,
                      name,
                      email,
                      role,
                      salary
                    })
                
                if(res.data.success){
                    alert("sua thong tin thanh cong")
                    navi("/manager/quanlynv")
                }else{
                    alert("su thong tin that bai")
                }
            }catch(err){
                alert("err")
            }
          }else{
            try{
                let res=await axios.patch(`http://localhost:5000/api/v1/staff/${idnv}`,
                    {
                      phoneNumber,
                      name,
                      email,
                      role,
                      salary
                    })
                if(res.data.success){
                    alert("sua thong tin thanh cong")
                    navi("/manager/quanlynv")
                }else{
                    alert("su thong tin that bai")
                }
            }catch(err){
                alert("err")
            }
          }
          
      }else{
          alert("thieu thong tin kia bro")
      }
    }
        return (
            <div className="db">
                
                    <h3>Thay đổi thông tin nhân viên</h3>
                    <Form.Label>Họ nhân viên</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Nhập họ nhân viên"
                        value={name}
                        onChange={e=>setName(e.target.value)}
                    />
                    </InputGroup>
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
                    <Form.Control as="select" defaultValue={role} onChange={(e)=>setRole(e.target.value)}>
                        <option value={0}>Người quản lý</option>
                        <option value={1}>Nhân viên quầy</option>
                        <option value={2}>Nhân viên lễ tân</option>
                    </Form.Control>
                    </InputGroup>

                    <Form.Label>Lương</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Nhập lương"
                        value={salary}
                        onChange={e=>setSalary(e.target.value)}
                    />
                    </InputGroup>

                    <Form.Label>Số điện thoại</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Nhập số điện thoại"
                        value={phoneNumber}
                        onChange={e=>setPhoneNumber(e.target.value)}
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