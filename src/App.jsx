import React from 'react'
import Navbar from './components/Navbar'
import Container from './components/Container'
import Footer from './components/Footer'

function App() {

  return (
    <>
    <div>
     <Navbar />
     <div className='bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]'>
      <Container />
     </div>
      <Footer />
    </div>
    </>
  )
}

export default App
