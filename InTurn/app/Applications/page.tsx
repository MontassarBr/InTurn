import React from 'react'
import Link from 'next/link' // or import { Link } from 'react-router-dom'
import ApplicationsTable from '../components/ApplicationsTable/ApplicationsTable'

import Footer from '../components/Footer/Footer'
import './applications.css' // Import the CSS file
import Navbar from '../components/Navbar/Navbar'

function page() {
  return (
    <>
     <Navbar/>
      
      <div className="container">
      
        
        <ApplicationsTable/>
        <div className="link-container">
          <Link 
            href="/postInternship" 
            className="post-internship-button"
          >
            Post a new Internship
          </Link>
        </div>
      </div>
      
      <br />
      <br />
      <br />
      <br />
      
      <Footer/>
    </>
  )
}

export default page
