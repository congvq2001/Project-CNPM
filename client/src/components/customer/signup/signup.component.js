import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";

export default function SignUp() {

    const [name, setName] = useState("");
    const [nbphone, setNbphone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");

    let navi=useNavigate();

    const handleRegister=async (e)=>{
        e.preventDefault();
        const data={
            phone:nbphone,
            email,
            password,
            name: name,
            address
        }
        if(password===confirmPassword){
            try{
                const res=await axios.post("http://localhost:5000/api/v1/signup",data);
                console.log(res);
                // if(res.data.success){
                    localStorage.setItem("accessToken",res.data.accessToken);
                localStorage.setItem("nameUser", res.data.data.name);
                localStorage.setItem("id",res.data.data._id )
                    alert("Đăng ký thành công");
                    navi("/user");
                // }

            }catch(err){
                alert("Có lỗi xảy ra");
            }
        }else{
            alert("Nhập lại mật khẩu không khớp")
        }
       
    }

    return (
        <div style={{  minHeight: '100%',
            width: '100%',
            backgroundColor: '#4158D0',
            backgroundImage: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)'}}>
        <div className="outer" >
            <div className="inner">
                <form>
                    <h3>Register</h3>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text" 
                                className="form-control" 
                                placeholder="Enter your name" 
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone number</label>
                            <input 
                                type="Phone number" 
                                className="form-control" 
                                placeholder="Enter your phone number" 
                                onChange={(e) => setNbphone(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                placeholder="Enter email" 
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>

                         <div className="form-group">
                            <label>Address</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter address" 
                                onChange={e=>setAddress(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Enter password" 
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Confirm password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Confirm password"
                                onChange={e => setConfirmPassword(e.target.value)}    
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-dark btn-lg btn-block"
                            onClick={(e)=>handleRegister(e)}
                        >
                            Register
                        </button>
                        <p className="forgot-password text-right">
                                        Already registered <a href="/login">log in?</a>
                        </p>
                </form>
            </div>
        </div>
        </div>
    )
}
