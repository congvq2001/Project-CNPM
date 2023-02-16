import React, { useState, useEffect } from "react";
import { Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './feedback.css';

export default function Feedback() {

    const [star, setStar] = useState("0");
    const [problem, setProblem] = useState("");
    const [idea, setIdea] = useState("");

    const handleFeedback = async (e) => {
        e.preventDefault();
        const data = { problem: problem, idea: idea, star: star };
        const token = localStorage.getItem("accessToken");
        console.log(star);

        if (star != 0){
            try {
                const res = await axios.post("http://localhost:5000/api/v1/feedback/user", data, { headers: { authorization: `Bearer ${token}` } });
                sending();
                resetFields();
            } catch (err) {
                alert("Có lỗi xảy ra");
                cancel();
            }
        }
        else {
            alert("Xin hãy chọn số sao");
        }
    }

    const testFunc = async () => {
        document.getElementById("form").style.display = "block";
        document.getElementById("square").style.display = "block";
        document.getElementById("form").style.animation = "entrance 0.6s";
        document.getElementById("main_button").style.display = "none";


    }
    const cancel = async () => {
        document.getElementById("form").style.display = "none";
        document.getElementById("square").style.display = "none";
        document.getElementById("main_button").style.display = "block";
    }
    const resetFields = async () => {
        setStar("0");
        document.getElementById("t1").value = "";
        document.getElementById("t2").value = "";
        var ele = document.getElementsByName("choice");
        for(var i=0;i<ele.length;i++) ele[i].checked = false;
    }

    const sending = async () => {

        document.getElementById("form").style.display = "none";
        document.getElementById("square").style.display = "none";
        document.getElementById("thanks").style.display = "block";
        document.getElementById("thanks").style.animation = "entrancePop 0.5s";

        await (new Promise(r => setTimeout(r, 1000)));
        document.getElementById("main_button").style.display = "block";
        document.getElementById("main_button").style.animation = "exit 0.5s reverse";

        document.getElementById("thanks").style.display = "none";

    }
    return (
        <div className="feedback">
            <div id="square" onClick={cancel}></div>
            <button type="button" id="main_button" onClick={testFunc}>Feedback</button>
            <div id="form">
                <div id="danhGia" color="white">Đánh giá dịch vụ</div>
                <form>
                    <div id="form-group">
                        <div id='starRate'>
                            <div className="button-group">
                                <input type="radio" id="star1" value="5" onChange={e => setStar(e.target.value)} name="choice" />
                                <label htmlFor="star1">😍</label>

                                <input type="radio" id="star2" value="4" onChange={e => setStar(e.target.value)} name="choice" />
                                <label htmlFor="star2">🙂</label>

                                <input type="radio" id="star3" value="3" onChange={e => setStar(e.target.value)} name="choice" />
                                <label htmlFor="star3">😐</label>

                                <input type="radio" id="star4" value="2" onChange={e => setStar(e.target.value)} name="choice" />
                                <label htmlFor="star4">😒</label>

                                <input type="radio" id="star5" value="1" onChange={e => setStar(e.target.value)} name="choice" />
                                <label htmlFor="star5">😪</label>

                            </div>
                        </div>

                        <div id="problemRate">
                            <label> Bạn gặp vấn đề nào?ㅤ</label>
                            <div id = "pr">⁉️</div>
                            <textarea
                                name="message"
                                id="t1"
                                cols="30"
                                rows="5"
                                placeholder="Vấn đề của bạn"
                                autoFocus
                                onChange={e => setProblem(e.target.value)}
                            ></textarea>
                        </div>

                        <div id="ideaRate">
                            <label> Đóng góp ý tưởng của bạn! </label>
                            <div id = "lb">💡</div>
                            <textarea
                                name="message"
                                id="t2"
                                cols="30"
                                rows="5"
                                placeholder="Ý tưởng của bạn"
                                autoFocus
                                onChange={e => setIdea(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <button type="reset" id="btnStyle" onClick={(e) => handleFeedback(e)}>
                        Send it!
                    </button>
                </form>
            </div>
            <div id="thanks">
                Feedback sent! You're amazing! 💖
            </div>

        </div>
    )




}