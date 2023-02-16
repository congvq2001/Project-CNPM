import React ,{ useEffect, useState} from 'react';
import { Table, Button } from 'react-bootstrap';
import { AiOutlineDelete } from 'react-icons/ai';
import {BsPen} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function CusManage(){

  const [data, setData] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const [status, setStatus] = useState([]);

  let navi=useNavigate();

  useEffect(() => {
    async function fetchdata(){
      let data=await axios.get("http://localhost:5000/api/v1/customer", { headers:{
              authorization: `Bearer ${accessToken}`
            } });
      setData(data.data.data);
    }
    fetchdata();
  },[]);  

//   useEffect(() => {
//     const fetchstatus = async (id)=>{
//     let datakh=await axios.get(`http://localhost:5000/api/v1/customer/${id}`,{ headers:{
//           authorization: `Bearer ${accessToken}`
//         } });
//     let data= datakh.data.data;
    
//     setStatus(data.status)
//   }
//     fetchstatus();
// }, []);

  // const checkRole =(role)=>{
  //   if(role=='quanLy'){
  //     return "Quản lý";
  //   }else if(role=='nvQuay'){
  //     return "Nhân viên quầy";
  //   }else{
  //     return "Nhân viên lễ tân";
  //   }
  // }

  // const deleteRow=async(id) =>{
  //     try{
  //       const res=await axios.delete(`http://localhost:5000/api/v1/staff/${id}`, { headers:{
  //             authorization: `Bearer ${accessToken}`
  //           } })
  //       console.log(res);
  //       if(res.data.success){
          
  //         const newdata=data.filter(nv=>nv._id!==id);
  //         setData(newdata); 
  //         alert("xoa thanh cong");
  //       }
  //     }catch(err){
  //       alert("error")
  //     }
  // }

  const changeStatus=async(id)=>{
    let datakh=await axios.get(`http://localhost:5000/api/v1/customer/${id}`,{ headers:{
          authorization: `Bearer ${accessToken}`
        } });
    console.log(datakh.data.data.status);
    datakh.data.data.status ? setStatus(false) : setStatus(true);

    try{
      const res=await axios.patch(`http://localhost:5000/api/v1/customer/${id}`,{status}, { headers:{
            authorization: `Bearer ${accessToken}`
          } })
      console.log(res.data.success);
      if(res.data.success){
        const newdata=data.filter(nv=>nv._id!==id);
        console.log(res.data);
        setStatus(!res.data.newdata.status);
        setData(newdata); 
        alert("Sửa thông tin thành công");
      }
    }catch(err){
      alert("error")
    }
  }

  return(
    <div className='db'>
     
      <h3>Bảng quản lý khách hàng</h3>
      <Table striped bordered >
        <thead>
          <tr>
            <th>#</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Thành viên VIP</th>
            <th>Điểm thành viên</th>
            <th>Trạng thái tài khoản</th>
          </tr>
        </thead>
        <tbody>
          {
            data&&
            data.map((cus,index)=>{
              return(
                <tr key={cus._id}>
                  <td>{index+1}</td>
                  <td>{cus.name}</td>
                  <td>{cus.email}</td>
                  <td>{cus.phone}</td>
                  <td>{cus.address}</td>
                  {
                    cus.isVip ? <td>VIP</td> : <td>Không</td>
                  }
                  <td>{cus.loyalty}</td>
                  {
                    cus.status ? <td style={{color: 'green'}}>Đã kích hoạt</td> : <td style={{color: 'red'}}>Chưa kích hoạt</td>
                  }
                  <td className="text-center" >
                    <Button variant="outline-secondary" style= {{ border: `none` }} onClick={()=>navi(`/manager/suakh/${cus._id}`)}>
                      <BsPen/>
                    </Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  )

}