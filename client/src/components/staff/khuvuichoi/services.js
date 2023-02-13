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
        let data=await axios.get("http://localhost:5000/api/v1/ticket/");
        setvaocua(data.data.result);
    }
    fetchvevaocua();
  },[]);

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
    }
    fetchtinhphi();
  },[]);

  const deleteRow = (id) => {
    
  }

  return(
    <div className='db'>
     
      <h3>Vé </h3>
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
                  <td>{iteam.name}</td>
                  <td>{iteam.price}</td>
                  <td className="text-center" >
                    <Button variant="outline-secondary" style= {{ border: `none` }} onClick={()=>navi(`/manager/editservice/${iteam._id}`)}>
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
                  <td>{iteam.name}</td>
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

      <h3>Giá Game Lẻ</h3>
      <Table striped bordered >
        <thead>
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Tên trò chơi</th>
            <th>Giá</th>     
          </tr>
        </thead>
        <tbody>
          {
            vephi&&
            vephi.map((iteam,index)=>{
              return(
                <tr key={iteam._id}>
                  <td>{index + 1}</td>
                  <td>{iteam.code }</td>
                  <td>{iteam.name}</td>
                  <td>{iteam.price}</td>
                  {/* <td className="text-center" >
                    <Button variant="outline-secondary" style= {{ border: `none` }} onClick={()=>navi(`/manager/editservice/61eab0db9cc06741fc0d4ce6/${iteam._id}`)}>
                      <BsPen/>
                    </Button>
                  </td> */}
                </tr>
              )
            })
          }
        </tbody>
      </Table>

    </div> 
  )

}