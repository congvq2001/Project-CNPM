import React ,{ useEffect, useState} from 'react';
import { Table, Button } from 'react-bootstrap';
import { AiOutlineDelete } from 'react-icons/ai';
import {BsPen} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Game(){

  const [data, setData] = useState([]);


  let navi=useNavigate();

  useEffect(() => {
    async function fetchdata(){
      let data=await axios.get("http://localhost:5000/api/v1/game");
      setData(data.data.result);
    }
    fetchdata();
  },[]);


  const deleteRow=async(id) =>{
      try{
        const res=await axios.delete(`http://localhost:5000/api/v1/game/${id}`)
        console.log(res);
        if(res.status == 200){
          
          const newdata=data.filter(game=>game._id!==id);
          setData(newdata); 
          alert("xoa thanh cong");
        }
      }catch(err){
        alert("error")
      }
  }
  return(
    <div className='db'>
     
      <h3>Bảng quản lý trò chơi</h3>
      <Table striped bordered >
        <thead>
          <tr>
            <th>#</th>
            <th>Mã trò chơi</th>
            <th>Tên trò chơi</th>
            <th>Giá tham gia</th>
            <th>Vị trí</th>
            <th>Thể loại</th>
            <th>Tình trạng</th>
            <th style={{paddingLeft:'20px', width:'150px'}}>
                <Button onClick={()=>navi(`/manager/addGame`)}>Thêm</Button>
            </th>     
          </tr>
        </thead>
        <tbody>
          {
            data&&
            data.map((game,index)=>{
              return(
                <tr key={game.code}>
                  <td>{index+1}</td>
                  <td>{game.code}</td>
                  <td>{game.name}</td>
                  <th>{game.price}</th>
                  <td>{game.location}</td>
                  <td>{game.type}</td>
                  <td>{game.status}</td>
                  <td className="text-center" >
                    <Button variant="outline-secondary" style= {{ border: `none` }} onClick={()=>navi(`/manager/editGame/${game._id}`)}>
                      <BsPen/>
                    </Button>
                  
                    <Button variant="outline-danger" style= {{ border: `none`, marginLeft:'20px' }} onClick={()=>deleteRow(game._id)}>
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