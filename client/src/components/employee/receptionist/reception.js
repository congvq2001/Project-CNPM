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
  const [preId,setPreId] = useState("")
  const [idTicket, setIdTicket] = useState("");
  const [cusId, setCusId] = useState("")
  const [name, setName] = useState("")
  const [phoneN ,setPhoneN] = useState("")
  const [phone, setPhone] = useState("")
  const [quantity, setQuantity] = useState(1);
  const [demoP, setDemoP] = useState(0);
  const [found, setfound] = useState(false);
  const [eventList, setEventList] = useState([]);
  const [isPreOrder, setIsPreOrder] = useState(false);
  const [idTicketVIP, setIdTicketVIP] = useState("");
  const [hide, sethide] = useState(true);
  const [checkoutId, setCheckoutId] = useState("")
  const [idUT, setidUT] = useState("");
  
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/ticket/", {
      method: 'GET',
    })
    .then(response => response.json())
      .then(data => {
    setTicketList(data.result);
    })
    .catch((error) => {
      alert("eror");
    })
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/eventTicket", {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      setEventList(data.result);
    })
    .catch((error) => {
      alert("eror");
    })
  }, []);

  useEffect(() => {
    ticketList.map(tk=>{
        if(tk._id===idTicket){
            setDemoP(isPreOrder ? tk.price*quantity*0.8 :  tk.price*quantity);
            return;
        }
    })
  }, [quantity, idTicket]);
  
  const handleSubmit= async (e)=>{
    e.preventDefault();
    if(idTicket&&quantity){
    try{ 
  
      let res= cusId ? await axios.put("http://localhost:5000/api/v1/staff/checkin",
      {
        ticketId: idTicket,
        cusId,
        cusPhone: phone,
        cusName: name,
        quantity
      },) : await axios.put("http://localhost:5000/api/v1/staff/checkin",
      {
        ticketId: idTicket,
        cusPhone: phone,
        cusName: name,
        quantity
      },)
      if(res.data.status){
        alert("check in thành công")
        setidUT(res.data.data)
      }else{
        alert("check in thất bại")
      }
    }catch(err){
        alert("err")
    }
    }
  }

  const handleFindIn=async (e)=>{
    e.preventDefault();
      try{
        const res=await axios.get(`http://localhost:5000/api/v1/userTicket/${checkoutId}`)
        setInTickets(res.data.result)
      }catch(err){
        alert("err")
      }
    }

  const handleCheckout=async(e)=>{
    e.preventDefault();
    try{
      const res=await axios.put(`http://localhost:5000/api/v1/staff/checkout/${checkoutId}`)
      console.log(res)
      if(res.data.status){
        alert("Checkout thành công")
        setInTickets(res.data.checkedTicket)
      }else{
        alert("Checkout thất bại")
      }
    }catch(err){
      alert("err")
    }
  }


  // const getgiaVIP = (id)=>{
  //   let gia=0;
  //   VIPList.map(iteam=>{
  //     if(iteam._id===id) gia=iteam.price;
  //   })
  //   return gia;
  // }

  const find=async(id)=>{
    fetchiduser(id);
    sethide(false);
  }

  // const handleVIP =async(e)=>{
  //   e.preventDefault();
  //   try{
  //     console.log(iduser)
  //     console.log(idTicketVIP)
  //     const res = await axios.post("http://localhost:5000/api/v1/ticket-vip",{
  //       id_user: iduser,
  //       id_ticket: idTicketVIP
  //     })
  //     console.log(res)
  //     if(res.data.success){
  //       alert("Đăng kí VIP thành công")
  //       buyVIP();
  //     }else alert("thất bại")
  //   }catch(err){
  //     alert("err")
  //   }
  // }

  const fetchiduser = async (id) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/v1/staff/searchByPhone/${id}`, { phone: phone })
      if (res.data.success == 1) {
        setCusId(res.data.result.cusId._id)
        alert(`tìm kiếm thành công ${res.data.result.cusId._id}`)
        setName(res.data.result.cusId.name)
        setIsPreOrder(true)
        setfound(true)
        setQuantity(res.data.result.quantity)
      } else if(res.data.success == 2) {
        setCusId(res.data.result._id)
        alert(`người dùng ${res.data.result._id} chưa đặt vé trước`)
        setName(res.data.result.name)
        setfound(true)
        setIsPreOrder(false)
      } else {
        alert("loi truy van")
      }
    } catch (err) {
      setfound(false)
      setCusId("")
      setName("")
      console.log(err)
      alert("err")
    }
  }

  return <div style={{  height: '100%',
  width: '100%',
  backgroundColor: '#0093E9',
  backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)'}}>
    <div className='reception1'>
      <Tabs fill defaultActiveKey='1'>
        <Tab eventKey='2' title='Check out' className='tab'>
        <div className='search-bar'>
          <InputGroup>
          <Form.Control placeholder='vd. id user_ticket' onChange={e=>setCheckoutId(e.target.value)}/>
          <Button onClick={(e)=>handleCheckout(e)}>Check out</Button>
          </InputGroup>
        </div>
          <hr/>
          <div className='ticket'>
            {
                (inTickets&&(inTickets.createdAt)&&(inTickets.status == -1))
                ?
                    <Card>
                      <div className='ticket'>
                        <p>Tên vé: {inTickets.name}</p>
                        <p>Số lượng: {inTickets.quantity} vé</p>
                        <p>Tên khách hàng:  {inTickets.cusName}</p>
                        <p>Số điện thoại :  {inTickets.cusPhone}</p>
                        <p>Tiền trả thêm : {inTickets.overPrice}</p>
                        <p>Tiền đã trả :  {inTickets.price}</p>
                        <p>Thời gian check in: {inTickets.createdAt}</p>
                        <p>Số tiền phải trả: {inTickets.price + inTickets.overPrice} vnđ</p>
                      </div>
                      <></>
                    </Card>
                  :
                  <>
                  </>
              }
          </div>
        </Tab>
        <Tab eventKey='1' title='Check In' className='tab'>
          <Form>
            <Form.Label>Loại vé{star}</Form.Label>
            <Form.Control as='select' onChange={e=>setIdTicket(e.target.value)}>
              <option>Chọn loại vé</option>
              {
                ticketList.map((option) => 
                  <option value={option._id}>{option.name}</option>
                )
              }
            </Form.Control>
            <Form.Label>Số điện thoại {star}</Form.Label>
            <Form.Control onChange={e => setPhone(e.target.value)} type="phone" />
            <br/>
            <Button onClick={(e) => find(idTicket)}>Tìm kiếm</Button>
            <br/>
            {!hide ? 
              <>
                <Form.Label>Số lượng</Form.Label>
                <Form.Control type="number" value={quantity} min="1" disabled />
                <Form.Label>Tên {star}</Form.Label>
                <Form.Control onChange={e => setName(e.target.value)} type="name" disabled={found ? true : false} value={name} />
                <Form.Label>Id nguời dùng</Form.Label>
                <Form.Control onChange={e => setCusId(e.target.value)} type="text" disabled={found ? true : false} value={cusId} /> 
                <hr />
              </> : <></>}
            <p>Giá tiền thanh toán: {demoP}vnđ</p>
            <Button onClick={(e) => handleSubmit(e)}>Xác nhận</Button>
          </Form>
          <h5 style={{marginTop:"20px"}}>Vé được tạo:</h5>
        { idUT ? <div>
            Id Vé: {idUT._id} <br />
            Tên vé: {idUT.ticketId.name} <br />
            Tên khách hàng:{idUT.cusName} <br />
            Số điện thoại: {idUT.phone} <br />
            Vip: {idUT.isVip ? 'Có' : 'Không'} <br />
            Đặt trước: {idUT.isPreOrder ? 'Có' : 'Không'} <br />
            Đã thanh toán: {idUT.price} <br />
            Số lượng: {idUT.quantity} <br />
            Thời gian check in:{idUT.createdAt.split('T')[0]} <br />
          </div> : <></>}
        </Tab>
      </Tabs>
    </div>
  </div>
}
export default Reception  