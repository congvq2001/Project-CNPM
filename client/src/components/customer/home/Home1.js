import React, { useState,useEffect } from 'react'
import {Row,Card,Button,Col, Accordion} from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import { useNavigate } from 'react-router-dom'
import './Home1.css'
import image from './onlday.jpg'

export default function Home1() {
    const [lastEvent, setLastEvent] = useState([])
    const [login, setLogin] = useState(false)

    let navi=useNavigate();
    
    const handleEvent=(id)=>{
        navi(`/user/event/${id}`);
    }

    useEffect(() => {
          let accessToken=localStorage.getItem("accessToken");
          if(accessToken){
            setLogin(true);
          } 
          else setLogin(false);  
      },[localStorage.getItem("accessToken")])

    useEffect(() => {
        fetch('http://localhost:5000/api/v1/latestEvent', {
                    method: 'GET', // or 'PUT'
                    }
            )
            .then(response => response.json())
           .then(data => {
                setLastEvent(data.result);
            })
            .catch((error) => {
                alert("eror");
            }) 
      }, []);

    return(
        <div className='Home1'>
            <div className='banner'>
            <Row>
                <Col style={{marginLeft:'100px', marginRight:'60px', paddingTop:'80px'}}>
                    <h1 style={{fontWeight: 'bold', color: '#30475E'}}>Chào mừng đến với</h1>
                    <h1 style={{fontWeight: 'bold', color: '#F05454'}}>TinkerBellGarden</h1>
                    <p>Đến với TinkerBellGarden, quý khách sẽ được trải nghiệm hệ thống khu vui chơi trẻ em phong phú, đa dạng, đắm chìm trong cảnh quan thiên nhiên, thưởng thức ẩm thực đa dạng và tận hưởng không khí lễ hội ngập tràn.</p>
                    {/* <Button onClick={()=>{login?navi("/user/tickbooking"):navi("/login")}} style={{backgroundColor: '#F05454', border:'none'}}size="lg">Đặt vé ngay</Button> {' '} */}
                    <Button onClick={()=>navi("/user/event")} variant="outline-secondary" size="lg">Khám phá</Button>
                </Col>
                <Col xs={6}>
                    <Carousel>
                        <Carousel.Item interval={4000}>
                            <img
                            className="d-block w-100"
                            src="https://hoianit.com/wp-content/uploads/2020/06/bana1.jpg"
                            alt="First slide"
                            height="600px"
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={4000}>
                            <img
                            className="d-block w-100"
                            src="https://cdnimg.vietnamplus.vn/t1200/Uploaded/fsmsr/2019_06_06/nha_trang.jpg"
                            alt="Second slide"
                            height="600px"
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={4000}>
                            <img
                            className="d-block w-100"
                            src="https://www.evaairways-vn.com/public/uploads/data/images/fly/nhung-khu-vui-choi-giai-tri-bac-nhat-nuoc-my-1.jpg"
                            alt="Third slide"
                            height="600px"
                            />
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
            </div>

            <div className='homeComponent'>
                <h1>Sự kiện mới nhất</h1>
                    {
                        lastEvent.map(evnt=>
                            <Col>
                                <Row>
                                    <Col style={{paddingRight: "0"}}>
                                        <Card.Img className='homeCardImg' variant="top" src={evnt.image[0] ? evnt.image[0] : image} height="400px" />                                
                                    </Col>
                                    <Col key={evnt._id} style={{paddingLeft: "0", height: "400px", marginLeft:'100px', marginRight:'60px'}}>
                                        <Card style={{border: "0"}}>
                                            <Card.Body className="homeCardBody"> 
                                                    <Card.Title style={{ textOverflow: "ellipsis",whiteSpace: "nowrap",overflow: "hidden", fontSize: "40px", color: "#30475E" }}><b>{evnt.name}</b></Card.Title>
                                                    <Card.Text>
                                                        {evnt.description}
                                                    </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Card.Footer onClick={()=>handleEvent(evnt._id)} className='homeCardFooter' style={{borderRadius: '0 0 50px 0px'}}>Xem thêm</Card.Footer>
                                </Row>
                            </Col>
                        )
                    }
            </div>

            <div className='homeComponent'>
                <Row>
                    <Col xs={6} style={{marginLeft:'20px'}}><img style={{width:'100%', height:'100%' , borderRadius:'20px'}} src="https://banahills.sunworld.vn/wp-content/uploads/2018/08/b2-768x511.jpg"/></Col>

                    <Col style={{marginLeft:'100px', marginRight:'60px'}}>
                        <h1 >Chúng tôi cung cấp các trải nghiệm tốt nhất</h1>
                        <p>Hệ thống trò chơi đa dạng, cảnh quan thiên nhiên đặc sắc, thưởng thức ẩm thực phong phú và tận hưởng không khí lễ hội ngập tràn là những gì quý khách sẽ được trải nghiệm khi đến với TinkerBellGarden</p>
                        <Row>
                            <Col>
                                <h2 style={{fontWeight: 'bold', color: '#F05454'}}>7</h2>
                                <h3 style={{fontWeight: 'bold', color: '#676FA3'}}>Ngày mở cửa trong tuần</h3>
                            </Col>
                            <Col>
                                <h2 style={{fontWeight: 'bold', color: '#F05454'}}>156</h2>
                                <h3 style={{fontWeight: 'bold', color: '#676FA3'}}>Sự kiện trong năm 2022</h3>
                                
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2 style={{fontWeight: 'bold', color: '#F05454'}}>873</h2>
                                <h3 style={{fontWeight: 'bold', color: '#676FA3'}}>Khách trung bình ngày</h3>
                            </Col>
                            <Col>
                                <h2 style={{fontWeight: 'bold', color: '#F05454'}}>1256</h2>
                                <h3 style={{fontWeight: 'bold', color: '#676FA3'}}>Trò chơi</h3>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </div>

            <div className='homeComponent' style={{marginBottom:'100px'}}>
                <Row>
                    

                    <Col style={{marginLeft:'20px', marginRight:'60px'}}>
                        <h1 >Câu hỏi</h1>
                        <p>Dưới đây là một số câu hỏi thường gặp về khu vui chơi của chúng tôi từ những khách hàng yêu quý. Nếu bạn có bất kỳ câu hỏi nào khác, vui lòng liên hệ với nhân viên để biết thêm chi tiết.</p>
                        <Accordion>
                            <Card>
                                <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    Tôi có thể mua vé ở đâu?
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <p>- Mua vé trực tiếp tại quầy vé</p>
                                    <p>- Đặt vé trước thông qua website để được giảm giá</p>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                    Giá vé bao gồm những gì?
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <p>- Vé vào khu vui chơi được tính theo lượt chơi</p>
                                    <p>- Một bé có thể đi kèm một phụ huynh</p>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                    Có những loại vé nào?
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    <p>- Có 2 loại giá vé: Giá chơi 2 tiếng/lượt và vé không giới hạn thời gian</p>
                                    <p>- Khi bé chơi vượt thời gian sẽ tính 50k/30 phút</p>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>

                    </Col>
                    <Col xs={6} style={{marginLeft:'20px'}}><img style={{width:'100%', minHeight:'29rem', borderRadius:'20px'}} 
                        src="https://hbr.org/resources/images/article_assets/2017/02/Image-2.2-Creating-Happiness-Small-Acts-Big-Impact-copy_Image-Resized.jpg"/>
                    </Col>
                </Row>
            </div>
        </div>
    )
}