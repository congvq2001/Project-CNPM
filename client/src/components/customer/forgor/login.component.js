import React, { useState, useEffect } from "react";
import { Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Forgor() {

    const [email,setEmail] = useState('');


    const hanleSignin = async (e) => {
        e.preventDefault();
        try{
            const data  = {'email' : email}
            const res = await axios.post("http://localhost:5000/api/v1/forgot-password",data);
            alert(res.data.message)
        }
        catch(err) {
            alert("err");
        }  
    }

    return (
        <div style={{
            background: "linear-gradient(#e66465, #9198e5)",
            width: '100%',
            height: '100%',
        }}>
            <div className="outer">
                <div className="inner">
                    <form>
                        <h3>Forgot Password</h3>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="example@gmail.com"
                                onChange={e=>setEmail(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-dark btn-lg btn-block"
                            onClick={(e)=>hanleSignin(e)}
                            >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>

    )
}
