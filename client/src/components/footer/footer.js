import React from 'react'
import "./footer.css"

export default function Footer() {
    return (
    <div>
       <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top">
        <p className="col-md-4 mb-0 text-muted">© 20211 Copyright by Team 5 Software Engineering</p>   
        <a href="/" className="col-md-2 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <svg className="bi me-2" width={40} height={32}><use xlinkHref="#bootstrap" /></svg>
          <img width={80} height={80} src="https://f5-zpcloud.zdn.vn/1428543118007069371/2dd8db98fba036fe6fb1.jpg"/>
        </a>
        <div className='contact'>Contact: Số 1 Đại Cồ Việt-Hà Nội-Vietnam</div>
      </footer>
    </div>
    )
}
