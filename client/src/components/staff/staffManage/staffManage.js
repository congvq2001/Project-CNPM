import React ,{ useEffect, useState} from 'react';
import { Table, Button } from 'react-bootstrap';
import { AiOutlineDelete } from 'react-icons/ai';
import {BsPen} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function StaffManage(){

  const [data, setData] = useState([]);
  const accessToken = localStorage.getItem('accessToken')

  let navi=useNavigate();

  useEffect(() => {
    async function fetchdata(){
      let data=await axios.get("http://localhost:5000/api/v1/staff", { headers:{
              authorization: `Bearer ${accessToken}`
            } });
      setData(data.data.data);
      console.log(data.data);
    }
    fetchdata();
  },[]);

  const checkRole =(role)=>{
    if(role=='quanLy'){
      return "Quản lý";
    }else if(role=='nvQuay'){
      return "Nhân viên quầy";
    }else{
      return "Nhân viên lễ tân";
    }
  }

  const deleteRow=async(id) =>{
      try{
        const res=await axios.delete(`http://localhost:5000/api/v1/staff/${id}`, { headers:{
              authorization: `Bearer ${accessToken}`
            } })
        console.log(res);
        if(res.data.success){
          
          const newdata=data.filter(nv=>nv._id!==id);
          setData(newdata); 
          alert("xoa thanh cong");
        }
      }catch(err){
        alert("error")
      }
  }

  return(
    <div className='db'>
     
      <h3>Bảng quản lý nhân viên</h3>
      <Table striped bordered >
        <thead>
          <tr>
            <th>#</th>
            <th>Mã nhân viên</th>
            <th>Họ và tên</th>
            <th>Chức vụ</th>
            <th>Số điện thoại</th>
            
          </tr>
        </thead>
        <tbody>
          {
            data&&
            data.map((staf,index)=>{
              return(
                <tr key={staf._id}>
                  <td>{index+1}</td>
                  <td>{staf._id}</td>
                  <td>{staf.name}</td>
                  <td>
                    {
                      checkRole(staf.role)
                    }
                  </td>
                  <td>{staf.phone}</td>
                  <td className="text-center" >
                    <Button variant="outline-secondary" style= {{ border: `none` }} onClick={()=>navi(`/manager/suanv/${staf._id}`)}>
                      <BsPen/>
                    </Button>
                  </td>
                  <td className="text-center" >
                    <Button variant="outline-danger" style= {{ border: `none` }} onClick={()=>deleteRow(staf._id)}>
                      <AiOutlineDelete />
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