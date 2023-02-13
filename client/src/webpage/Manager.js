import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from '../components/footer/footer'
import AdminSidebar from '../components/staff/adminSidebar/adminSidebar'
import Xemdoanhthu from '../components/staff/xemdoanhthu/xemdoanhthu'
import AddEvent from '../components/staff/eventManage/addEvent.component'
import StaffManage from '../components/staff/staffManage/staffManage'
import AddStaff from '../components/staff/staffManage/addStaff'
import ChangeStaff from '../components/staff/staffManage/changeStaff'
import ChangeEvent from '../components/staff/eventManage/changeEvent'
import EventManage from '../components/staff/eventManage/eventManage'
import './manager.css'
import AddFacility from '../components/staff/khuvuichoi/addFacility'
import Facilities from '../components/staff/khuvuichoi/facilities'
import EditFacility from '../components/staff/khuvuichoi/editFacility'
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
                <Route exact path="/suanv/:idnv" element={<ChangeStaff/>}></Route>
                <Route exact path="/quanlysk" element={<EventManage/>}></Route>
                <Route exact path="/themsk" element={<AddEvent/>}></Route>
                <Route exact path="/suask/:idsk" element={<ChangeEvent/>}></Route>
                <Route exact path="/addFacility" element={<AddFacility/>}></Route>
                <Route exact path="/facilities" element={<Facilities/>}></Route>
                <Route exact path="/editFacility/:idfc" element={<EditFacility/>}></Route>
                <Route exact path="/services" element={<Services/>}></Route>
                <Route exact path="/addvephi" element={<Addservice/>}></Route>
                <Route exact path="/addVIP" element={<Addservice/>}></Route>
                <Route exact path="/editservice/:idloaive/:idve" element={<Editservice/>}></Route>
            </Routes>
        </div>
        </>
    )
}
