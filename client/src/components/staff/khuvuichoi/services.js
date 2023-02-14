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
<<<<<<< HEAD
        let data=await axios.get("http://localhost:5000/api/v1/ticket/");
        setvaocua(data.data.result);
=======
        let data=await axios.get("http://localhost:5000/api/v1/ticket/61eaafd99cc06741fc0d4cda");
        setvaocua(data.data.result.type);
>>>>>>> 18079f3 (first)
    }
    fetchvevaocua();
  },[]);

<<<<<<< HEAD
  // useEffect(() => {
  //   async function fetchvevip(){
  //       let data=await axios.get("http://localhost:5000/api/v1/ticket/61eae5e4ac7bee37e0362af5");
  //       setVIP(data.data.result.type);
  //   }
  //   fetchvevip();
  // },[]);

  useEffect(() => {
    async function fetchtinhphi(){
      let data = await axios.get("http://localhost:5000/api/v1/otherGame");
      console.log(data);
        setvephi(data.data.result);
=======
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
>>>>>>> 18079f3 (first)
    }
    fetchtinhphi();
  },[]);

<<<<<<< HEAD
  const deleteRow = (id) => {
    
  }

  return(
    <div className='db'>
     
      <h3>Vé </h3>
=======
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
>>>>>>> 18079f3 (first)
      <Table striped bordered >
        <thead>
          <tr>
            <th>#</th>
            <th>Tên vé</th>
            <th>Giá vé</th>
<<<<<<< HEAD
              <th style={{paddingLeft:'20px', width:'150px'}}>
                <Button onClick={()=>navi(`/manager/addvephi`)}>Thêm vé quầy</Button>
            </th>  
=======
            <th style={{paddingLeft:'20px', width:'150px'}}>

            </th>     
>>>>>>> 18079f3 (first)
          </tr>
        </thead>
        <tbody>
          {
            vaocua&&
            vaocua.map((iteam,index)=>{
              return(
                <tr key={iteam._id}>
                  <td>{index+1}</td>
<<<<<<< HEAD
                  <td>{iteam.name}</td>
                  <td>{iteam.price}</td>
                  {
                    iteam.ticketType !== 'Event' ?
                    <td className="text-center" >
                      <Button variant="outline-secondary" style={{ border: `none` }} onClick={() => navi(`/manager/editservice/${iteam._id}`)}>
                        <BsPen />
                      </Button>
                      <Button variant="outline-danger" style={{ border: `none`, marginLeft: '20px' }} onClick={() => deleteRow(iteam._id)}>
                        <AiOutlineDelete />
                      </Button>
                    </td> : <></>
                  }
=======
                  <td>{iteam.nameTicket}</td>
                  <td>{iteam.price}</td>
                  <td className="text-center" >
                    <Button variant="outline-secondary" style= {{ border: `none` }} onClick={()=>navi(`/manager/editservice/61eaafd99cc06741fc0d4cda/${iteam._id}`)}>
                      <BsPen/>
                    </Button>
                  </td>
>>>>>>> 18079f3 (first)
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
<<<<<<< HEAD
            
=======
>>>>>>> 18079f3 (first)
          </tr>
        </thead>
        <tbody>
          {
            VIP&&
            VIP.map((iteam,index)=>{
              return(
                <tr key={iteam._id}>
                  <td>{index+1}</td>
<<<<<<< HEAD
                  <td>{iteam.name}</td>
=======
                  <td>{iteam.nameTicket}</td>
>>>>>>> 18079f3 (first)
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

<<<<<<< HEAD
      <h3>Giá Game Lẻ</h3>
=======
      <h3>Vé tính phí</h3>
>>>>>>> 18079f3 (first)
      <Table striped bordered >
        <thead>
          <tr>
            <th>#</th>
<<<<<<< HEAD
            <th>Code</th>
            <th>Tên trò chơi</th>
            <th>Giá</th>     
            
=======
            <th>Tên vé</th>
            <th>Giá vé</th>
            <th style={{paddingLeft:'20px', width:'150px'}}>
                <Button onClick={()=>navi(`/manager/addvephi`)}>Thêm vé quầy</Button>
            </th>     
>>>>>>> 18079f3 (first)
          </tr>
        </thead>
        <tbody>
          {
            vephi&&
            vephi.map((iteam,index)=>{
              return(
                <tr key={iteam._id}>
<<<<<<< HEAD
                  <td>{index + 1}</td>
                  <td>{iteam.code }</td>
                  <td>{iteam.name}</td>
                  <td>{iteam.price}</td>
                  {/* <td className="text-center" >
                    <Button variant="outline-secondary" style= {{ border: `none` }} onClick={()=>navi(`/manager/editservice/61eab0db9cc06741fc0d4ce6/${iteam._id}`)}>
                      <BsPen/>
                    </Button>
                  </td> */}
=======
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
>>>>>>> 18079f3 (first)
                </tr>
              )
            })
          }
        </tbody>
      </Table>

    </div> 
  )

}