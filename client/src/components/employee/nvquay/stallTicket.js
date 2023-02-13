import React, {useEffect, useState} from "react"
import {Button, Form, Row, Col} from "react-bootstrap"
import './stallTicket.css'
import axios from "axios"

const star = <span style={{color:'red'}}>*</span>;

function StallTicket() {
    const [showForm, setShowForm] = useState(false);
    const [ticketList, setTicketList] = useState([]);
    const [idTicket, setIdTicket] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [demoP, setDemoP] = useState(0);
    const [cusTicket,setCusTicket] = useState("")

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/game/", {
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
        ticketList.map(tk=>{
            if(tk._id===idTicket){
                setDemoP(tk.price*quantity);
                return;
            }
        })
    }, [quantity,idTicket]);

    const handleSubmit= async (e)=>{
        e.preventDefault();
        if(idTicket&&(quantity+1)){
            try{ 
                let time_checkout=new Date();
                let res=await axios.put(`http://localhost:5000/api/v1/staff/addGame/${cusTicket}`,
                {
                    gameId :idTicket,
                    quantity,
                })
                console.log(res.data)
                if(res.data.status){
                    alert("tạo vé thành công")
                }else{
                    alert("that bai")
                }
            }catch(err){
                alert("err")
            }
        }
        setShowForm(!showForm)
    }

    return (
        <div style={{  minHeight: '100%',
            width: '100%',
            backgroundColor: '#4158D0',
            backgroundImage: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)'}}>
        <div className="outer">
            <div className="stallTicket">
                {!showForm
                    ? <Button id='b1' onClick={() => setShowForm(!showForm)}>Tạo vé</Button>
                    : <>
                    <Form>
                        
                        <Form.Group>
                            <Form.Label>Loại vé{star}</Form.Label>
                            <Form.Control as="select" onChange={e=>setIdTicket(e.target.value) }>
                                <option>Chọn loại vé</option>
                                {
                                    ticketList.map((option) => 
                                        <option key={option._id} value={option._id}>{option.name}</option>
                                    )
                                }
                            </Form.Control>
                            </Form.Group>
                              <Form.Group>
                            <Form.Label>Id vé {star}</Form.Label>
                                    <Form.Control onChange={e => setCusTicket(e.target.value)} value={cusTicket} />
                        </Form.Group>    
                        <Form.Group>
                            <Form.Label>Số lượng{star}</Form.Label>
                            <Form.Control onChange={e=>setQuantity(e.target.value) } type="number" defaultValue="1" min="1"/>
                        </Form.Group>
                        <hr/>
                        <p>Giá tiền thanh toán: {demoP}vnđ</p>
                        <Button onClick={(e) => handleSubmit(e)}>Xác nhận</Button>
                        <Button style={{ marginLeft:"40px" }} variant='danger' onClick={() => setShowForm(!showForm)}>Hủy bỏ</Button>
                    </Form>
                    </>
                }
            </div>
        </div>
        </div>

    )
}
export default StallTicket