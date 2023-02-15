import React, {  useEffect, useState } from 'react';
import './Profile.css';
import image from './nobi.jpg'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setemail] = useState("");
    const [address, setAddress] = useState("")
    const [VIP, setVIP] = useState();
    const [ticketList, setTicketList] = useState([])
    
    const [edit, setEdit] = useState(false);

    let navi=useNavigate();
    let accessToken = localStorage.getItem("accessToken");
    const [login, setLogin] = useState(accessToken ? true : false)
    let uname = localStorage.getItem("nameUser")
    const uid = localStorage.getItem('id')
    useEffect(() => {
         console.log(1);
          if (!login) {
              navi("/login")
          } else {
              fetchvevaocua();
              fetchinfo();
              
          }
      },[])
   const fetchvevaocua= async ()=>{
    // try{
    //     const res=await axios.get("http://localhost:5000/api/v1/ticket",{title:title})
    //     console.log(res)
    //     // if(res.data.success){
    //     //     setVIP(res.data.VIP);
    //     //     setFirstName(res.data.info.firstName)
    //     //     setlastName(res.data.info.lastName)
    //     //     setphone(res.data.info.phone)
    //     //     setemail(res.data.info.email)
    //     //     localStorage.setItem("nameUser",res.data.info.firstName+' '+res.data.info.lastName)
    //     //     if(res.data.tickets!=="Nothing")
    //     //         setlist(res.data.tickets);
    //     // }
    //     }catch(err){
    //         alert("err");
    // }
    fetch(`http://localhost:5000/api/v1/ticket/user/${uid}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        setTicketList(data.result)
    })
        .catch((error) => {
        console.log(error);
        alert("eror");
    })
   }
    
    
    const fetchinfo=async()=>{
        try{
        const res=await axios.get("http://localhost:5000/api/v1/customerInfo",{
            headers:{
              authorization: `Bearer ${accessToken}`
            }
        })
        console.log(res.data)
        if(res.data.success){
            setVIP(res.data.data.timeVip);
            setName(res.data.data.name)
            setPhone(res.data.data.phone)
            setemail(res.data.data.email)
            setAddress(res.data.data.address)
            localStorage.setItem("nameUser",res.data.data.name)
        }
        }catch(err){
            alert("err");
        }
    }
    const handleUpdate=async ()=>{
        try{
        const res=await axios.patch(`http://localhost:5000/api/v1/customer/${uid}`,
        {
            name,
            phone,
            email,
            address
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
        } catch (err) {
            console.log(err)
            alert("err");
        }
    }
    
    const logout = ()=>{
        localStorage.removeItem("accessToken");
        localStorage.removeItem("nameUser");
        navi("/user/home");
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
                    <input value={phone} onChange={e=>{setPhone(e.target.value);setEdit(true)}}/>
                    </div>
                    <div className='line'>
                    <div className='label'>
                        <p>Email</p>
                    </div>
                    <input value={email} onChange={e=>{setemail(e.target.value);setEdit(true)}}/>
                    </div>
                    <div className='line'>
                    <div className='label'>
                        <p>Địa chỉ</p>
                    </div>
                    <input value={address} onChange={e=>{setAddress(e.target.value);setEdit(true)}}/>
                    </div>
                    <div className={`bt${edit?'':' hide'}`}>
                        <button onClick={()=>handleUpdate()}>Cập nhật</button>
                    </div>
                    <div className='vip'>
                        <p>VIP: <span>NO VIP</span></p>
                    </div>
                </div>
                <div className='ticket'>
                    <h3>Vé đã đặt</h3>
                    <div className='all'>
                        {   
                            (ticketList)
                            &&
                            ticketList.map((iteam,index)=>(
                                <div key={index} className='one'>
                                    <div className='inftk'>
                                        <p>Loại vé: {iteam.ticketId.name}--Số lượng: {iteam.quantity}</p>
                                        <p>ID vé: {iteam._id}</p>
                                        <p>Giá: {iteam.price}</p>
                                        <p>Đặt vé lúc: {iteam.createdAt}</p>
                                        <p>Checkin lúc: {iteam.createdAt}</p>
                                        <p>Checkout lúc: {(iteam.createdAt != iteam.updatedAt) ?iteam.updatedAt:"Đang chờ"}</p>
                                    </div>
                                    <div className='state'>
                                        {
                                            (iteam.updatedAt== iteam.createdAt)
                                            ?
                                            (
                                                <p style={{color:"blue"}}>Chưa checkout</p>
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
