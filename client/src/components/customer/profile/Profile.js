import React, {  useEffect, useState } from 'react';
import './Profile.css';
import image from './nobi.jpg'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
    const [name, setName] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [email, setemail] = useState("");
    const [VIP, setVIP] = useState();
    const [list, setlist] = useState([]);

    const [edit, setEdit] = useState(false);

    let navi=useNavigate();
    let accessToken=localStorage.getItem("accessToken");

    useEffect(() => {
      fetchinfo();
    }, []);

    useEffect(() => {
        fetchvevaocua();
    }, []);
    
    let title="vé vào cửa"
   const fetchvevaocua= async ()=>{
    // try{
    //     const res=await axios.get("http://localhost:5000/api/v1/ticket",{title:title})
    //     console.log(res)
    //     // if(res.data.success){
    //     //     setVIP(res.data.VIP);
    //     //     setFirstName(res.data.info.firstName)
    //     //     setlastName(res.data.info.lastName)
    //     //     setphoneNumber(res.data.info.phoneNumber)
    //     //     setemail(res.data.info.email)
    //     //     localStorage.setItem("nameUser",res.data.info.firstName+' '+res.data.info.lastName)
    //     //     if(res.data.tickets!=="Nothing")
    //     //         setlist(res.data.tickets);
    //     // }
    //     }catch(err){
    //         alert("err");
    // }
    // fetch("http://localhost:5000/api/v1/ticket", {
    //     method: 'GET',
        
    // })
    // .then(response => response.json())
    // .then(data => {
    //     setTicketList(data.result.type);
    // })
    // .catch((error) => {
    //     alert("eror");
    // })
   }
    
    
    const fetchinfo=async()=>{
        try{
        const res=await axios.get("http://localhost:5000/api/v1/userInfo",{
            headers:{
              authorization: `Bearer ${accessToken}`
            }
        })
        console.log(res.data)
        if(res.data.success){
            setVIP(res.data.info.timeVip);
            setName(res.data.info.name)
            setphoneNumber(res.data.info.phoneNumber)
            setemail(res.data.info.email)
            localStorage.setItem("nameUser",res.data.info.name)
            if(res.data.tickets!=="Nothing")
                setlist(res.data.tickets);
        }
        }catch(err){
            alert("err");
        }
    }

    const handleUpdate=async ()=>{
        try{
        const res=await axios.patch("http://localhost:5000/api/v1/userInfo",
        {
            name,
            phoneNumber,
            email
        },
        {
            headers:{
              authorization: `Bearer ${accessToken}`
            }
        }
        )
        if(res.data.success){
            alert("cập nhật thành công");
        }else{
            alert("cập nhật thất bại");
        }
        fetchinfo();
        setEdit(false);
        }catch(err){
            alert("err");
        }
    }
    
    const logout = ()=>{
        localStorage.removeItem("accessToken");
        localStorage.removeItem("nameUser");
        navi("/user/home");
    }

    const tenve =(id)=>{
        if(id==="61eab05b9cc06741fc0d4cdd") return "Vé 2h";
        if(id==="61eab0739cc06741fc0d4ce0") return "Vé cả ngày";
        return "Đăng kí VIP";
    }
    
    return (
        <div className='prof_ctn'>
            <div className="info_ticket">
                <div className='info'>
                    <h3>Thông tin tài khoản</h3>
                    <div className="img">
                        <img src={image} alt=""/>                    
                    </div>
                    <div className='line'>
                    <div className='label'>
                        <p>Họ Tên</p>
                    </div>
                    <input value={name} onChange={e=>{setName(e.target.value);setEdit(true)}}/>
                    </div>
                    <div className='line'>
                    <div className='label'>
                        <p>Số điện thoại</p>
                    </div>
                    <input value={phoneNumber} onChange={e=>{setphoneNumber(e.target.value);setEdit(true)}}/>
                    </div>
                    <div className='line'>
                    <div className='label'>
                        <p>Email</p>
                    </div>
                    <input value={email} onChange={e=>{setemail(e.target.value);setEdit(true)}}/>
                    </div>
                    <div className={`bt${edit?'':' hide'}`}>
                        <button onClick={()=>handleUpdate()}>Cập nhật</button>
                    </div>
                    <div className='vip'>
                        <p>VIP: {VIP?VIP:"No VIP"}</p>
                    </div>
                </div>
                <div className='ticket'>
                    <h3>Vé đã đặt</h3>
                    <div className='all'>
                        {
                            (list.length!=0)
                            &&
                            list.map((iteam,index)=>(
                                <div key={index} className='one'>
                                    <div className='inftk'>
                                        <p>Loại vé: {tenve(iteam.id_ticket)}--Số lượng: {iteam.quantity}</p>
                                        <p>ID vé: {iteam._id}</p>
                                        <p>Giá: {iteam.time_checkout?iteam.price:"Đang chờ"}</p>
                                        <p>Đặt vé lúc: {iteam.createdAt}</p>
                                        <p>Checkin lúc: {iteam.time_checkin?iteam.time_checkin:"Đang chờ"}</p>
                                        <p>Checkout lúc: {iteam.time_checkout?iteam.time_checkout:"Đang chờ"}</p>
                                    </div>
                                    <div className='state'>
                                        {
                                            (iteam.time_checkout===null)
                                            ?
                                            (
                                                (iteam.time_checkin===null)
                                                ?
                                                <p style={{color:"blue"}}>Chưa checkin</p>
                                                :
                                                <p style={{color:"green"}}>Đang chờ thanh toán</p>
                                            )
                                            :
                                            <p style={{color:"green"}}>Đã thanh toán</p>
                                            
                                        }
                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>
                </div>
            </div>
            <div className='logout'>
                <button onClick={()=>logout()}>Đăng xuất</button>
            </div>  
        </div>
    )
}
