import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel, Badge, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export default function Event() {
    const [event, setEvent] = useState({
        image:[]
    });
    const [login, setLogin] = useState(false);
    const [eventJoined, seteventJoined] = useState([]);

    let accessToken=localStorage.getItem("accessToken");
    let { eventid } = useParams();
    let navi=useNavigate();


    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/event/${eventid}`, {
            method: 'GET', // or 'PUT'
        })
        .then(response => response.json())
        .then(data => {
            setEvent(data.result);
        })
        .catch((error) => {
            alert("eror");
        })
    },[]);

    useEffect(() => {
          
          if(accessToken){
            setLogin(true);
          } 
          else setLogin(false); 
      },[localStorage.getItem("accessToken")])

    const handleSubmit =async(e)=>{
        e.preventDefault()
        if(!login){
            navi("/login");
        }else{
            try{
                const res=await axios.post("http://localhost:5000/api/v1/userEvent",
                {
                    id_event:eventid
                },
                {
                headers:{
                    authorization: `Bearer ${accessToken}`
                }
                })
                console.log(res)
                if(res.data.success){
                    alert("tham gia thanh cong")
                    fetchevjoined();
                }else alert("that bai")
            }catch(err){
                alert("err")
            }
        }
    }

    useEffect(() => {
        fetchevjoined();
      },[]);

    const fetchevjoined=async()=>{
        try{
        const res=await axios.get("http://localhost:5000/api/v1/user/event",{
            headers:{
              authorization: `Bearer ${accessToken}`
            }
        })
        console.log(res)
        if(res.data.success){
            seteventJoined(res.data.result);
        }
        }catch(err){
           console.log(err);
        }
    }

    const checkjoin=(id)=>{
        let check=false;
        eventJoined.map(ev=>{
            if(ev._id===id) check=true;
        })
        return check;
    }

    
    return (
            <div style={{marginTop:"30px",marginBottom:"50px"}} className="inner2">
            <form >
                <h3>{event.name}</h3>
                <hr size="1"  color="gray"/>  
                <p style={{fontSize:"19px",fontWeight:"bold"}}>{event.description}</p>
                <p>{event.detail}</p>
                <Carousel>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={event.image[0]}
                        alt="First slide"
                    />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={event.image[1]}
                        alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={event.image[2]}
                        alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
                <br/>
                <p style={{fontSize:"15px"}}>Thời gian bắt đầu: {event.time_start}</p>
                <p style={{fontSize:"15px"}}>Thời gian kết thúc: {event.time_end}</p>
                <br/>
                <p style={{fontSize:"18px",color:"green"}}>Khuyến mãi: {event.discount}%</p>
   
                <ButtonToolbar className="justify-content-between" aria-label="Toolbar with Button groups">
                    <ButtonGroup/>
                    <ButtonGroup>
                        {
                            checkjoin(event._id)
                            ?
                            <button 
                                className="btn btn-success btn-lg" 
                                aria-describedby="btnGroupAddon2"
                            >
                                Đã tham gia
                            </button>
                            :
                            <button 
                                className="btn btn-primary btn-lg" 
                                aria-describedby="btnGroupAddon2"
                                onClick={(e)=>handleSubmit(e)}
                            >
                            Tham gia sự kiện
                            </button>
                        }  
                    </ButtonGroup>
                </ButtonToolbar>
                </form>
                </div>           
    )
};