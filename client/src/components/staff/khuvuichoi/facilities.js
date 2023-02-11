import React ,{ useEffect, useState} from 'react';
import { Table, Button } from 'react-bootstrap';
import { AiOutlineDelete } from 'react-icons/ai';
import {BsPen} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Facilities(){

  const [data, setData] = useState([]);


  let navi=useNavigate();

  useEffect(() => {
    async function fetchdata(){
      let data=await axios.get("http://localhost:5000/api/v1/facilities");
      setData(data.data.result);
    }
    fetchdata();
  },[]);


  const deleteRow=async(id) =>{
      try{
        const res=await axios.delete(`http://localhost:5000/api/v1/facilities/${id}`)
        console.log(res);
        if(res.status == 200){
          
          const newdata=data.filter(facility=>facility._id!==id);
          setData(newdata); 
          alert("xoa thanh cong");
        }
      }catch(err){
        alert("error")
      }
  }
  return(
    <div className='db'>
     
      <h3>Bảng quản lý cơ sở vật chất</h3>
      <Table striped bordered >
        <thead>
          <tr>
            <th>#</th>
            <th>Mã CSVC</th>
            <th>Tên CSVC</th>
            <th>Khu</th>
            <th>Tình trạng</th>
            <th style={{paddingLeft:'20px', width:'150px'}}>
                <Button onClick={()=>navi(`/manager/addFacility`)}>Thêm CSVC</Button>
            </th>     
          </tr>
        </thead>
        <tbody>
          {
            data&&
            data.map((facility,index)=>{
              return(
                <tr key={facility.facilities_code}>
                  <td>{index+1}</td>
                  <td>{facility.facilities_code}</td>
                  <td>{facility.name}</td>
                  <td>{facility.region}</td>
                  <td>{facility.status}</td>
                  <td className="text-center" >
                    <Button variant="outline-secondary" style= {{ border: `none` }} onClick={()=>navi(`/manager/editFacility/${facility._id}`)}>
                      <BsPen/>
                    </Button>
                  
                    <Button variant="outline-danger" style= {{ border: `none`, marginLeft:'20px' }} onClick={()=>deleteRow(facility._id)}>
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