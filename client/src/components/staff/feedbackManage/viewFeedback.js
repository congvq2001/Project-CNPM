import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsPen } from 'react-icons/bs'
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './feedbackManager.css';

export default function ViewFeedback() {
    const [data, setData] = useState([]);
    const accessToken = localStorage.getItem('accessToken');

    const [string, setString] = useState("");
    const [type, setType] = useState("idea");
    const [sort, setSort] = useState("star");
    const [order, setOrder] = useState("1");

    let navi = useNavigate();

    useEffect(() => {
        async function fetchdata() {
            let data = await axios.get("http://localhost:5000/api/v1/feedback", {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });
            setData(data.data.data);
            console.log(data.data);
        }
        fetchdata();
    }, []);

    const deleteRow = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/v1/feedback/${id}`, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            })
            console.log(res);
            if (res.data.success) {

                const newdata = data.filter(nv => nv._id !== id);
                setData(newdata);
                alert("xoa thanh cong");
            }
        } catch (err) {
            alert("error")
        }
    }
    const handleFilter = async (e) => {
        try {
            e.preventDefault();
            const postLink = 'http://localhost:5000/api/v1/feedback/find?match=' + string + '&type=' + type + '&sortType=' + sort + '&sort=' + order;
            console.log(postLink);
            const res = await axios.post(postLink, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                console.log(res.data);
                setData(res.data.feedback);
                alert("sort thanh cong");
            }
        } catch (err) {
            alert("error");
        }
    }

    return (
        <div className='db'>

            <h3>Bảng quản lý feedback</h3>
            <div>
                <input type="text" id="myInput" placeholder="Search for: " title="Type in a name" className='Filter' onChange={(e) => setString(e.target.value)}></input>
                <Form.Group controlId="exampleForm.ControlSelect1" className='Filter'>
                    <label className='lab' htmlFor='op1'>ㅤㅤSort by:ㅤㅤ</label>
                    <div id="op1" className='options'>
                        <Form.Control as="select" id='selection' onChange={(e) => setType(e.target.value)}>
                            <option value={"idea"}>Idea</option>
                            <option value={"problem"}>Problem</option>
                        </Form.Control>
                    </div>

                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect2" className='SortType'>
                    <label className='lab' htmlFor='op2'>ㅤㅤSort type:ㅤㅤ</label>
                    <div id="op2" className='options'>
                        <Form.Control as="select" id='selection2' onChange={(e) => setSort(e.target.value)}>
                            <option value={"star"}>Star</option>
                            <option value={"cus"}>Customer</option>
                            <option value={"date"}>Date</option>
                        </Form.Control>
                    </div>

                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect3" className='SortOrder'>
                    <label className='lab' htmlFor='op3'>ㅤㅤSort order:ㅤㅤ</label>
                    <div id="op2" className='options'>
                        <Form.Control as="select" id='selection3' onChange={(e) => setOrder(e.target.value)}>
                            <option value={"1"}>Ascending</option>
                            <option value={"-1"}>Descending</option>
                        </Form.Control>
                    </div>

                </Form.Group>

                <button
                    type="submit"
                    className="btn btn-dark btn-lg btn-block"
                    onClick={(e) => handleFilter(e)}
                >
                    Filter
                </button>
            </div>

            <Table striped bordered >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Mã người dùng</th>
                        <th>Số sao</th>
                        <th>Vấn đề</th>
                        <th>Ý tưởng</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        data &&
                        data.map((fBack, index) => {
                            return (
                                <tr key={fBack._id}>
                                    <td>{index + 1}</td>
                                    <td>{fBack._id}</td>
                                    <td>{fBack.star}</td>
                                    <td>{fBack.problem}</td>
                                    <td>{fBack.idea}</td>

                                    <td className="text-center" >
                                        <Button variant="outline-danger" style={{ border: `none` }} onClick={() => deleteRow(fBack._id)}>
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