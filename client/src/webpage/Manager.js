import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from '../components/footer/footer'
import AdminSidebar from '../components/staff/adminSidebar/adminSidebar'
import Xemdoanhthu from '../components/staff/xemdoanhthu/xemdoanhthu'
import AddEvent from '../components/staff/eventManage/addEvent.component'
import StaffManage from '../components/staff/staffManage/staffManage'
import AddStaff from '../components/staff/staffManage/addStaff'
import ChangeStaff from '../components/staff/staffManage/changeStaff'
import CusManage from '../components/staff/cusManage/cusManage'
import ChangeCus from '../components/staff/cusManage/changeCus'
import ChangeEvent from '../components/staff/eventManage/changeEvent'
import EventManage from '../components/staff/eventManage/eventManage'
import './manager.css'
import AddGame from '../components/staff/khuvuichoi/addGame'
import Games from '../components/staff/khuvuichoi/games'
import EditGame from '../components/staff/khuvuichoi/editGame'
import Services from '../components/staff/khuvuichoi/services'
import Addservice from '../components/staff/khuvuichoi/addService'
import Editservice from '../components/staff/khuvuichoi/editService'
import EditserviceVIP from '../components/staff/khuvuichoi/editserviceVIP'


export default function Manager() {
    return (
        <>
        <div className='mana'>
            <AdminSidebar/>
            <Routes>
                <Route exact path="/xemdoanhthu" element={<Xemdoanhthu/>}></Route>
                <Route exact path="/quanlynv" element={<StaffManage/>}></Route>
                <Route exact path="/themnv" element={<AddStaff/>}></Route>
                <Route exact path="/quanlykh" element={<CusManage/>}></Route>
                <Route exact path="/suakh/:idkh" element={<ChangeCus/>}></Route>
                <Route exact path="/suanv/:idnv" element={<ChangeStaff/>}></Route>
                <Route exact path="/quanlysk" element={<EventManage/>}></Route>
                <Route exact path="/themsk" element={<AddEvent/>}></Route>
                <Route exact path="/suask/:idsk" element={<ChangeEvent/>}></Route>
                <Route exact path="/addGame" element={<AddGame/>}></Route>
                <Route exact path="/games" element={<Games/>}></Route>
                <Route exact path="/editGame/:idfc" element={<EditGame/>}></Route>
                <Route exact path="/services" element={<Services/>}></Route>
                <Route exact path="/addvephi" element={<Addservice/>}></Route>
                <Route exact path="/addVIP" element={<Addservice/>}></Route>
                <Route exact path="/editservice/:idloaive/:idve" element={<Editservice/>}></Route>
            </Routes>
        </div>
        </>
    )
}
