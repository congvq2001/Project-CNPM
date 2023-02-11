import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';


export default class VIPRegister extends Component {
    render(){
        return (
            <div style={{  height: '100%',
            width: '100%',
            backgroundColor: '#4158D0',
            backgroundImage: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)'}}>
            <div className="outer1">
                <div className="inner1">
                    <Container>                        
                        <Row>
                            <Col>
                                <form>
                                    <h3> Quyền lợi của thành viên VIP </h3>
                                    <label>- Giảm giá vé lên đến 20% cho 1 bé/ 1 lượt chơi</label>
                                    <label>- Thời hạn từ 3 tháng - 1 năm</label>
                                    <div className="alert alert-success" role="alert">
                                        <h4 className="alert-heading">Đăng kí ngay!</h4>
                                        <hr/>
                                        <label>Tham gia để có những trải nghiệm tốt nhất tại</label>
                                        
                                        <h4>Tinker Bell Garden</h4>
                                    </div>
                                </form>
                            
                            </Col>
                            <Col>
                                <form>
                                
                                    <h3>Become VIP member</h3>
                                    
                                    <div className="form-group">
                                        <label>Ngày dự kiến thanh toán</label>
                                        <input type="date" className="form-control" placeholder="Select date"/>
                                    </div>

                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Choose ticket duration</Form.Label>
                                        <Form.Control as="select">
                                            <option>3 months</option>
                                            <option>6 months</option>
                                            <option>12 months</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                                    
                                </form>
                            </Col>
                        </Row>
                        
                    </Container>
                </div>
            </div>
            </div>
            
        );
        
        
        } 
}