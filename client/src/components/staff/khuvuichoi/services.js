import React,{useState,useEffect} from 'react';
import { Table, Button } from 'react-bootstrap';
import { AiOutlineDelete } from 'react-icons/ai';
import {BsPen} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export default function Facilities(){

  const [vaocua, setvaocua] = useState([]);
  const [VIP, setVIP] = useState([]);
  const [vephi, setvephi] = useState([]);


  let navi=useNavigate();

  useEffect(() => {
    async function fetchvevaocua(){
        let data=await axios.get("http://localhost:5000/api/v1/ticket/61eaafd99cc06741fc0d4cda");
        setvaocua(data.data.result.type);
    }
    fetchvevaocua();
  },[]);

  useEffect(() => {
    async function fetchvevip(){
        let data=await axios.get("http://localhost:5000/api/v1/ticket/61eae5e4ac7bee37e0362af5");
        setVIP(data.data.result.type);
    }
    fetchvevip();
  },[]);

  useEffect(() => {
    async function fetchtinhphi(){
        let data=await axios.get("http://localhost:5000/api/v1/ticket/61eab0db9cc06741fc0d4ce6");
        setvephi(data.data.result.type);
    }
    fetchtinhphi();
  },[]);

  const deleteRow=async(id) =>{
    try{
        const res=await axios.delete(`http://localhost:5000/api/v1/typeTicket/61eab0db9cc06741fc0d4ce6/${id}`)
        console.log(res);
        if(res.status == 200){
          const newdata=vephi.filter(iteam=>iteam._id!==id);
          setvephi(newdata); 
          alert("xoa thanh cong");
        }
      }catch(err){
        alert("error")
      }
  }
  return(
    <div className='db'>
     
      <h3>Vé vào cửa</h3>
      <Table striped bordered >
        <thead>
          <tr>
            <th>#</th>
            <th>Tên vé</th>
            <th>Giá vé</th>
            <th style={{paddingLeft:'20px', width:'150px'}}>

            </th>     
          </tr>
        </thead>
        <tbody>
          {
            vaocua&&
            vaocua.map((iteam,index)=>{
              return(
                <tr key={iteam._id}>
                  <td>{index+1}</td>
                  <td>{iteam.nameTicket}</td>
                  <td>{iteam.price}</td>
                  <td className="text-center" >
                    <Button variant="outline-secondary" style= {{ border: `none` }} onClick={()=>navi(`/manager/editservice/61eaafd99cc06741fc0d4cda/${iteam._id}`)}>
                      <BsPen/>
                    </Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>

      <h3>VIP</h3>
      <Table striped bordered >
        <thead>
          <tr>
            <th>#</th>
            <th>Tên vé</th>
            <th>Giá vé</th>
            <th style={{paddingLeft:'20px', width:'150px'}}>
            </th>     
          </tr>
        </thead>
        <tbody>
          {
            VIP&&
            VIP.map((iteam,index)=>{
              return(
                <tr key={iteam._id}>
                  <td>{index+1}</td>
                  <td>{iteam.nameTicket}</td>
                  <td>{iteam.price}</td>
                  <td className="text-center" >
                    <Button variant="outline-secondary" style= {{ border: `none` }} onClick={()=>navi(`/manager/editservice/61eae5e4ac7bee37e0362af5/${iteam._id}`)}>
                      <BsPen/>
                    </Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>

      <h3>Vé tính phí</h3>
      <Table striped bordered >
        <thead>
          <tr>
            <th>#</th>
            <th>Tên vé</th>
            <th>Giá vé</th>
            <th style={{paddingLeft:'20px', width:'150px'}}>
                <Button onClick={()=>navi(`/manager/addvephi`)}>Thêm vé quầy</Button>
            </th>     
          </tr>
        </thead>
        <tbody>
          {
            vephi&&
            vephi.map((iteam,index)=>{
              return(
                <tr key={iteam._id}>
                  <td>{index+1}</td>
                  <td>{iteam.nameTicket}</td>
                  <td>{iteam.price}</td>
                  <td className="text-center" >
                    <Button variant="outline-secondary" style= {{ border: `none` }} onClick={()=>navi(`/manager/editservice/61eab0db9cc06741fc0d4ce6/${iteam._id}`)}>
                      <BsPen/>
                    </Button>
                    <Button variant="outline-danger" style= {{ border: `none`, marginLeft:'20px' }} onClick={()=>deleteRow(iteam._id)}>
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