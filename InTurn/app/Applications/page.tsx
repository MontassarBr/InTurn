import React from 'react'
import ApplicationsTable from '../components/ApplicationsTable/ApplicationsTable'
import NavbarAfterLogin from '../components/NavbarAfterLogin/NavbarAfterLogin'
import Footer from '../components/Footer/Footer'

function page() {
  return (
    <>
    <NavbarAfterLogin/>
    <ApplicationsTable/>
    <br />
    <br />
    <br />
    <br />
    
    <Footer/>
    </>
   
  )
}

export default page
