import axios from 'axios';
import React ,{ useEffect, useState} from 'react';
import { Table } from 'react-bootstrap';
import './Xemdoanhthu.css'
import moment from 'moment'

export default function Xemdoanhthu() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [curStartDate, setCurStartDate] = useState("");
    const [curEndDate, setCurEndDate] = useState("");
    const [dataDoanhThu, setDataDoanhThu] = useState([])

    const [canSee, setCanSee] = useState(false);

    let total=0;


    const fetchdoanhthu=async()=>{
        try{
            let res =await axios.post("http://localhost:5000/api/v1/ticketIncome",
            {
                time_from:startDate,
                time_to:endDate
            })
            console.log(res.data.data)
            setDataDoanhThu(res.data.data)
        }catch(err){
            alert("err")
        }
        
    }
console.log(dataDoanhThu)
    const handleSubmit=async()=>{
        if(startDate.length!==0&&endDate.length!==0){
            setCurStartDate(startDate);
            setCurEndDate(endDate);
                 
            setCanSee(true);
            //call api o day
            fetchdoanhthu();
        }
        else{        
            setCanSee(false);
            alert("Vui lòng chọn đủ thông tin ngày");
        }
        
    }
    
    return (
        <div className='xdt_ctn'>
            <div className='heading' style={{textAlign: "center"}}><h3>Thống kê doanh thu</h3></div>
            <div className='inputdate'>
                <div className='input_ctn'>
                <div className='input'>
                    <label>Ngày bắt đầu: </label>
                    <input type={'date'} onChange={(e)=>setStartDate(e.target.value)}/>
                </div>
                <div className='input'>
                    <label>Ngày kết thúc: </label>
                    <input type={'date'} onChange={(e)=>setEndDate(e.target.value)}/>
                </div>
                </div>
                
                <div 
                    className='submit'
                    onClick={()=>handleSubmit()}
                >
                    <button>Xác nhận</button>
                </div>
            </div>
            <div className={`output${canSee?'':' hideoutput'}`} >
                <div className='head'>Thống kê từ ngày {moment(curStartDate).format('DD/MM/YYYY')} đến {moment(curEndDate).format('DD/MM/YYYY')} </div>
                
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Loại vé</th>
                            <th>Số lượng</th>
                            <th>Thời điểm thanh toán</th>
                            <th>Khách hàng</th>
                            <th>Số tiền</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            
                            dataDoanhThu.map((data,index)=>{
                                total+=data.price;
                                return(
                                    <tr key={index}>
                                        <th>{data.isPreOrder?"Đặt trước": "Không đặt trước"}</th>
                                        <th>{data.quantity}</th>
                                        <th>{moment(data.updatedAt.substring(0,10)).format('DD/MM/YYYY HH:mm:ss')}</th>
                                        <th>{data.cusId?data.cusName:"Không xác định"}</th>
                                        <th>{data.price}</th>
                                        <th></th>
                                    </tr>
                                )
                                }
                            )
                        }
                        <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th style={{color: "#007bff", fontSize: "24px"}}><i>Total</i></th>
                        <th style={{color: "#007bff", fontSize: "24px"}}>{total}</th>
                        <th></th>
                        </tr>
                    </tbody>
                    
                </Table>
            </div>
            {/* <div className={`detail${detail?'':' hidedetail'}`}>
                <span className="exit" onClick={()=>setDetail(false)}>X</span>
                <h3 className='namedetail'>{dataDetail.data.ten}</h3>
                <h4 className='timedetail'>Từ {curStartDate} đến {curEndDate}</h4>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>User name</th>
                            <th>Số lượng</th>
                            <th>Số tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataDetail.user.map((data,index)=>{
                                return(
                                    <tr key={index}>
                                        <th>{data.usename}</th>
                                        <th>{data.soluong}</th>
                                        <th>{data.tien}</th>
                                    </tr>
                                )
                                }
                            )
                        }
                    </tbody>
                </Table>
            </div> */}
        </div>
    )
}