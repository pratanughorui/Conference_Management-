import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

function Admin_Layout() {
  return (
    <>
    <Header/>
    <Outlet/>
    </>
  )
}

export default Admin_Layout