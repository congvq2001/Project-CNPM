import React,{useState,useEffect} from "react";
import { Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [role, setRole] = useState(3)
    const [nbmail, setNbmail] = useState("")
    const [password, setPassword] = useState("")

    let navi=useNavigate();

    const hanleSignin= async (e)=>{
            e.preventDefault();
            const data = { email:nbmail,password:password };
            if(role==3){
                try{
                    const res =await axios.post("http://localhost:5000/api/v1/login",data);
                    const accessToken=res.data.accessToken;
                    if(accessToken){
                        if(!res.data.result.status){
                            alert("Tài khoản tạm thời bị khóa. Vui lòng liên hệ khu vui chơi để kích hoạt tài khoản");
                        }else{
                            localStorage.setItem("accessToken",accessToken);
                            localStorage.setItem("nameUser", res.data.result.name);
                             localStorage.setItem("id",res.data.result._id)
                            navi("/user");
                        }
                    }else{
                        alert("Tên đăng nhập hoặc mật khẩu không tồn tại")
                    }
                }catch(err){
                    alert("Có lỗi xảy ra");
                }  
            }else{
                try{
                    const res =await axios.post("http://localhost:5000/api/v1/login-staff",data);
                    console.log(res);
                    const accessToken=res.data.accessToken;
                    const r=res.data.result.role;
                    if(accessToken){
                        localStorage.setItem("accessToken",accessToken);
                        localStorage.setItem("nameUser", res.data.result.name);
                        localStorage.setItem("id",res.data.result._id)
                        if(role==0){
                            if(r=='quanLy'){
                                navi("/manager");
                            } 
                        }else if(role==1){
                            if(r=="nvQuay")
                                navi("/staff");
                            else
                                alert("chon sai vai tro");
                        } else if (role == 2) {
                            if(r=="nvLeTan"){
                                navi("/receptionist");
                            }    else
                            alert("chon sai vai tro");  
                        }
                    }else{
                        alert("dang nhap that bai")
                    }
                }catch(err){
                    alert("err");
                }
            }   
    }

    return (
        <div className="loginpage" style={{  height: '100%',
            width: '100%',
            backgroundColor: '#0093E9',
            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)'}}>
        <div className="outer">
            <div className="inner">
            <form>
                <h3>Log in</h3>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text" 
                        className="form-control" 
                        placeholder="Email" 
                        onChange={e=>setNbmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Enter password"
                        onChange={e=>setPassword(e.target.value)}
                    />
                </div>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Vai trò</Form.Label>
                    <Form.Control as="select" onChange={(e)=>setRole(e.target.value)}>
                        <option value={3}>Khách hàng</option>
                        <option value={0}>Người quản lý</option>
                        <option value={1}>Nhân viên quầy</option>
                        <option value={2}>Nhân viên lễ tân</option>
                    </Form.Control>
                </Form.Group>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button 
                    type="submit" 
                    className="btn btn-dark btn-lg btn-block"
                    onClick={(e)=>hanleSignin(e)}
                >
                    Sign in
                </button>
                <p className="forgot-password text-right">
                     <a href="/forgot-password">Forgot password?</a>
                </p>
            </form>
            </div>
        </div>
        </div>
    )
}
