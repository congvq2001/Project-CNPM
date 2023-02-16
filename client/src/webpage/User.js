import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Event from '../components/customer/event/event.component'
import EventList from '../components/customer/eventList/eventList'
import CustomerHeader from '../components/customer/header/cusheader'
import Home from '../components/customer/home/Home'
import Profile from '../components/customer/profile/Profile'
import TicketBooking from '../components/customer/ticketBooking/ticketBooking'
import VIPRegister from '../components/customer/Vip-register/vipregister.component'
import Footer from '../components/footer/footer'
import Home1 from '../components/customer/home/Home1'
import Feedback from '../components/customer/feedback/feedback.component'

export default function User() {
    return (
        <div>
            <CustomerHeader/>
            <Routes>
                <Route index element={
                    <div>
                        <Home1 />
                        <Feedback />
                    </div>
                }></Route>
                <Route exact path="/home" element={
                    <div>
                        <Home1 />
                        <Feedback />
                    </div>
                }></Route>
                <Route exact path="/event" element={<EventList/>}></Route>
                <Route exact path="/event/:eventid" element={<Event/>}></Route>
                <Route exact path="/tickbooking" element={<TicketBooking/>}></Route>
                <Route exact path="/profile" element={<Profile/>}></Route>
                <Route exact path="/VIPRegister" element={<VIPRegister/>}></Route>
            </Routes>
            <Footer/>
        </div>
    )
}
