import React from "react"
import {useState, useEffect} from "react"
import {Button, InputGroup, Form, Tabs, Tab, Badge} from "react-bootstrap"
import {Accordion, Card} from 'react-bootstrap';
import "./reception.css"
import axios from "axios"

const star = <span style={{color:'red'}}>*</span>;

function getTicketList(){
  return [ticket1, ticket2]
}
const ticket1 = {
  phone: '0987654321',
  name: 'Nguyễn Văn A',
  type: 'Vé 2 giờ',
  quantity: 3,
  price: 120000,
  status: 'Chờ check-in'
}
const ticket2 = {
  phone: '0123456789',
  name: 'Nguyễn Văn Z',
  type: 'Vé ngày',
  quantity: 1,
  price: 100000,
  status: 'Chờ check-out'
}
function Reception() {
  const [inTickets, setInTickets] = useState({});
  const [ticketList, setTicketList] = useState([]);
  const [idTicket, setIdTicket] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [demoP, setDemoP] = useState(0);
  const [outprice, setoutprice] = useState(0);
  const [VIPList, setVIPList] = useState([]);
  const [phone, setphone] = useState("");
  const [iduser, setiduser] = useState("");
  const [idTicketVIP, setIdTicketVIP] = useState("");
  const [hide, sethide] = useState(true);

  const [idUT, setidUT] = useState("");
  
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/ticket/61eaafd99cc06741fc0d4cda", {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      setTicketList(data.result.type);
    })
    .catch((error) => {
      alert("eror");
    })
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/ticket/61eae5e4ac7bee37e0362af5", {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      setVIPList(data.result.type);
    })
    .catch((error) => {
      alert("eror");
    })
  }, []);

  useEffect(() => {
    ticketList.map(tk=>{
        if(tk._id===idTicket){
            setDemoP(tk.price*quantity);
            return;
        }
    })
  }, [quantity,idTicket]);

  const handleSubmit= async (e)=>{
    e.preventDefault();
    if(idTicket&&quantity){
    try{ 
      let time_checkin=new Date();
      let res=await axios.put("http://localhost:5000/api/v1/staff/checkin",
      {
        id_ticket:idTicket,
        price:demoP,
        is_paid:false,
        time_checkin
      },)
      if(res.data.status){
        alert("tạo vé thành công")
        setidUT(res.data.id)
      }else{
        alert("tạo vé thất bại")
      }
    }catch(err){
        alert("err")
    }
    }
  }

  const handleFindIn=async (e)=>{
    e.preventDefault();
    if(idUT){
      try{
        const res=await axios.get(`http://localhost:5000/api/v1/userTicket/${idUT}`)
        setInTickets(res.data.result)
      }catch(err){
        alert("err")
      }
    }
  }

  const handleCheckin=async(e)=>{
    e.preventDefault();
    try{
      let time_checkin=new Date();
      const res=await axios.put("http://localhost:5000/api/v1/staff/checkin",{
        idUserTicket:inTickets._id,
        is_paid:false,
        time_checkin
      })
      
      if(res.data.status){
        alert("Checkin thành công")
      }else{
        alert("Checkin thất bại")
      }
    }catch(err){
      alert("err")
    }
  }

  const handleCheckout=async(e)=>{
    e.preventDefault();
    try{
      let time_checkout=new Date();
      const res=await axios.put("http://localhost:5000/api/v1/staff/checkout",{
        idUserTicket:inTickets._id,
        is_paid:true,
        time_checkout
      })
      console.log(res)
      if(res.data.status){
        alert("Checkout thành công")
        setoutprice(res.data.priceTicket)
      }else{
        alert("Checkout thất bại")
      }
    }catch(err){
      alert("err")
    }
  }

  const checkloaive=(id)=>{
    let name=""
    ticketList.map(iteam=>{
      if(iteam._id===id) return name=iteam.nameTicket;
    })
    return name;
  }

  const getgiaVIP = (id)=>{
    let gia=0;
    VIPList.map(iteam=>{
      if(iteam._id===id) gia=iteam.price;
    })
    return gia;
  }

  const find=async()=>{
    fetchiduser();
  }

  const handleVIP =async(e)=>{
    e.preventDefault();
    try{
      console.log(iduser)
      console.log(idTicketVIP)
      const res = await axios.post("http://localhost:5000/api/v1/ticket-vip",{
        id_user: iduser,
        id_ticket: idTicketVIP
      })
      console.log(res)
      if(res.data.success){
        alert("Đăng kí VIP thành công")
        buyVIP();
      }else alert("thất bại")
    }catch(err){
      alert("err")
    }
  }

  const fetchiduser=async()=>{
    try{
      const res=await axios.get(`http://localhost:5000/api/v1/iduser/${phone}`)
      if(res.data.success){
        setiduser(res.data.data)
        alert(`tìm kiếm thành công ${res.data.data}`)
        sethide(false);
      }else{
        alert("loi truy van")
      }
    }catch(err){
      alert("err")
    }
  }

  const buyVIP=async()=>{
    try{
      const time_checkout=new Date()
      const rp=axios.post("http://localhost:5000/api/v1/userbuyticketwithouttoken",{
        id_user:iduser,
        id_ticket:idTicketVIP,
        price:getgiaVIP(idTicketVIP),
        time_checkout
      })
      if(rp.data.success){
        alert("them vao database thanh cong")
      }else{
        alert("that bai")
      }
    }catch(err){
      console.log("er")
    }
  }

  return <div style={{  height: '100%',
  width: '100%',
  backgroundColor: '#0093E9',
  backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)'}}>
    <div className='reception1'>
      <Tabs fill defaultActiveKey='1'>




        <Tab eventKey='1' title='Check in' className='tab'>
        <div className='search-bar'>
          <InputGroup>
          <Form.Control placeholder='vd. id user_ticket' onChange={e=>setidUT(e.target.value)}/>
          <Button onClick={(e) => handleFindIn(e)}>Tìm vé</Button>
          </InputGroup>
        </div>
          <hr/>
          <div className='ticket'>
            {
              
                (inTickets&&(!inTickets.time_checkin)&&(!inTickets.time_checkout))
                ?
                 
                    <Card>
                      <div className='ticket'>
                        <p>Loại vé: {checkloaive(inTickets.id_ticket)}</p>
                        <p>Số lượng: {inTickets.quantity} vé</p>
                        <p>Số tiền dự kiến: {inTickets.price} vnđ</p>
                        <Button onClick={(e)=>handleCheckin(e)}>Check in</Button>
                      </div>
                    </Card>
                  :
                  <>
                  </>
              }
          </div>
        </Tab>




        <Tab eventKey='2' title='Check out' className='tab'>
        <div className='search-bar'>
          <InputGroup>
          <Form.Control placeholder='vd. id user_ticket' onChange={e=>setidUT(e.target.value)}/>
          <Button onClick={(e) => handleFindIn(e)}>Tìm vé</Button>
          </InputGroup>
        </div>
          <hr/>
          <div className='ticket'>
            {
              
                (inTickets&&(inTickets.time_checkin)&&(!inTickets.time_checkout))
                ?
                 
                    <Card>
                      <div className='ticket'>
                        <p>Loại vé: {checkloaive(inTickets.id_ticket)}</p>
                        <p>Số lượng: {inTickets.quantity} vé</p>
                        <p>Số tiền dự kiến: {inTickets.price} vnđ</p>
                        <Button onClick={(e)=>handleCheckout(e)}>Check out</Button>
                      </div>
                      <></>
                    </Card>
                  :
                  <>
                  </>
              }
          </div>
          <h5 style={{marginTop:"20px"}}>Số tiền phải trả:</h5>
          <p>{outprice}</p>
        </Tab>



        <Tab eventKey='3' title='Tạo vé mới' className='tab'>
          <Form>
      
            <Form.Label>Loại vé{star}</Form.Label>
            <Form.Control as='select' onChange={e=>setIdTicket(e.target.value)}>
              <option>Chọn loại vé</option>
              {
                ticketList.map((option) => 
                  <option value={option._id}>{option.nameTicket}</option>
                )
              }
            </Form.Control>
            <Form.Label>Số lượng{star}</Form.Label>
            <Form.Control onChange={e=>setQuantity(e.target.value) } type="number" defaultValue="1" min="1"/>
            <hr/>
            <p>Giá tiền thanh toán: {demoP}vnđ</p>
            <Button onClick={(e) => handleSubmit(e)}>Xác nhận</Button>
          </Form>
          <h5 style={{marginTop:"20px"}}>Vé được tạo:</h5>
          <p>{idUT}</p>
        </Tab>



        <Tab eventKey='4' title='Đăng ký vip' className='tab'>
          <Form>
            <Form.Label>Số điện thoại{star}</Form.Label>
            <Form.Control placeholder='vd. 0987654321' onChange={e=>setphone(e.target.value)}/>
            <div style={{marginTop:"10px",marginBottom:"5px"}}>
            <Button onClick={(e)=>find(e)}>Tìm kiếm</Button>
            </div>
           
            <Form.Label>Gói VIP{star}</Form.Label>
            <Form.Control as='select' onChange={e=>setIdTicketVIP(e.target.value)}>
              <option>Chọn gói VIP</option>
              {
                VIPList.map(iteam=>{
                  return(
                    <option key={iteam._id} value={iteam._id}>{iteam.time} {iteam.kindOfTime}</option>
                  )
                })
              }
            </Form.Control>
            <hr/>
            <p>Giá tiền: {getgiaVIP(idTicketVIP)} vnđ</p>
            {
              hide
              ?
              <></>
              :
              <Button onClick={(e)=>handleVIP(e)}>Xác nhận</Button>
            }
            
          </Form>
        </Tab>
      </Tabs>
    </div>
  </div>
}
export default Reception  