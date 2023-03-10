import axios from "axios";
import React, { useState,useEffect}  from "react";
import {Form, Col, Row, InputGroup, FormControl} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./changEvent.css"

export default function ChangeEvent() {
    const [name, setName] = useState("");
    const [timeStart, setTimeStart] = useState("");
    const [timeEnd, setTimeEnd] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");

    let { idsk }=useParams();
    let navi=useNavigate();

    useEffect(() => {
        async function fetchev(){
          let datask=await axios.get(`http://localhost:5000/api/v1/event/${idsk}`);
          let data= datask.data.result;
          console.log(data);
          setName(data.name);
          setTimeStart(data.timeStart.substring(0,10));
          setTimeEnd(data.timeEnd.substring(0,10));
          setDescription(data.description);
          setPrice(data.price);
          setImage1(data.image[0]);
          setImage2(data.image[1]);
          setImage3(data.image[2]);
        }
        fetchev();
      }, []);

      const handleSubmit = async (e)=>{
        e.preventDefault();
        if(name&&timeStart&&timeEnd&&description&&price&&image1){
            try{
                let res=await axios.patch(`http://localhost:5000/api/v1/event/${idsk}`,
                    {
                        image:[
                            image1,
                            image2,
                            image3
                        ],
                        name,
                        timeStart,
                        timeEnd,
                        description,
                        price
                    })
                console.log(res);
                if(res.data.success){
                    alert("tao su kien thanh cong")
                    navi("/manager/quanlysk")
                }else{
                    alert("tao su kien that bai")
                }
            }catch(err){
                alert("err")
            }
        }else{
            alert("thieu thong tin kia bro")
        }
      }


        return (
            <div style={{overflowY: 'scroll'}} className="db">

            
                <Form>
                    <h3>Ch???nh s???a s??? ki???n</h3>
                    <Form.Label>T??n s??? ki???n</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Nh???p t??n s??? ki???n"
                        value={name}
                        onChange={e=>setName(e.target.value)}
                    />
                    <Form.Row>
                    <Col>
                        <Form.Label>Ng??y b???t ?????u</Form.Label>
                        <Form.Control
                            required
                            type="date"
                            placeholder="Nh???p ng??y b???t ?????u"
                            value={timeStart}
                            onChange={e=>setTimeStart(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Form.Label>Ng??y k???t th??c</Form.Label>
                        <Form.Control
                            required
                            type="date"
                            placeholder="Nh???p ng??y k???t th??c"
                            value={timeEnd}
                            onChange={e=>setTimeEnd(e.target.value)}
                        />
                    </Col>
                    <Col xs={3}>
                        <Form.Label>Gi??</Form.Label>
                        <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">VND</InputGroup.Text>
                        <FormControl
                            required
                            type="number"
                            placeholder="Nh???p gi??"
                            value={price}
                            onChange={e=>setPrice(e.target.value)}
                        />
                        </InputGroup>
                    </Col>
                    
                </Form.Row>
                    <Form.Label>M?? t???</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Nh???p m?? t???"
                        value={description}
                        onChange={e=>setDescription(e.target.value)}
                    />
                    <label style={{marginTop:"20px"}}>Ch???n ???nh 1</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">URL</InputGroup.Text>
                        <FormControl
                        required
                        type="text"
                        placeholder="Nh???p url ???nh 1"
                        value={image1}
                        onChange={e=>setImage1(e.target.value)}
                    />
                    </InputGroup>
                    <div className="changeimg">
                        <img className="imgchange" src={image1}/>
                    </div>
                    
                    <label style={{marginTop:"20px"}}>Ch???n ???nh 2</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">URL</InputGroup.Text>
                        <FormControl
                        required
                        type="text"
                        placeholder="Nh???p url ???nh 2"
                        value={image2}
                        onChange={e=>setImage2(e.target.value)}
                    />
                    </InputGroup>
                    <div className="changeimg" width="500px" height="500px">
                        <img className="imgchange" src={image2}/>
                    </div>
                    <label style={{marginTop:"20px"}}>Ch???n ???nh 3</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">URL</InputGroup.Text>
                        <FormControl
                        required
                        type="text"
                        placeholder="Nh???p url ???nh 3"
                        value={image3}
                        onChange={e=>setImage3(e.target.value)}
                    />
                    
                    </InputGroup>
                    <div className="changeimg">
                        <img className="imgchange" src={image3}/>
                    </div>
                <button style={{marginTop:"30px"}} onClick={(e)=>handleSubmit(e)} className="btn btn-dark btn-lg btn-block">Submit</button>
                </Form>
            </div>

        );
    
}