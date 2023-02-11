import React, { Component } from "react";

export default class AddEvent extends Component {
    render() {
        return (
            <div className="db">
            {/* <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">Company name</a>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                    <a className="nav-link" href="#">Sign out</a>
                    </li>
                </ul>
            </nav> */}

            
                <form>
                        <h3>Thêm sự kiện</h3>

                        <div className="form-group">
                            <label>Tiêu đề</label>
                            <input type="text" className="form-control" placeholder="Nhập tên sự kiện" />
                        </div>

                        <div className="form-group">
                            <label>Mô tả</label>
                            <input type="text" className="form-control" placeholder="Nhập mô tả ngắn" />
                        </div>

                        <div className="form-group">
                            <label>Nhập nội dung</label>
                            <textarea className="form-control" type="text" rows="6" placeholder="Nhập nội dung"></textarea>
                        </div>

                        <div className="form-group">
                            <label>Thêm ảnh 1</label>
                            <input type="file" className="form-control-file" id="exampleFormControlFile1"  accept="image/png, image/jpeg" />
                        </div>

                        {/* <div className="form-group">
                            <label>Thêm ảnh 2</label>
                            <input type="file" className="form-control-file" id="exampleFormControlFile1"  accept="image/png, image/jpeg" />
                        </div>

                        <div className="form-group">
                            <label>Thêm ảnh 3</label>
                            <input type="file" className="form-control-file" id="exampleFormControlFile1"  accept="image/png, image/jpeg" />
                        </div> */}

                        <button type="submit" className="btn btn-dark btn-lg btn-block">Submit</button>
                    </form>
            

            </div>

        );
    }
}