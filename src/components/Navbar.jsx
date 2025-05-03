import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-gray-800 h-[10vh] flex justify-around items-center lg:gap-200'>
      <div className='navcon flex justify-between items-center py-2 px-5'>
        {/* <div>
          <img src="/icons/logo.png" className='w-14' alt="" srcSet="" />
        </div> */}
        <div className='font-bold text-[16px] text-white'>
                        &lt;<span>pass</span><span className='text-purple-600 text-[20px]'>MG</span>/&gt;
                    </div>
      </div>
      <a href="https://github.com/Manoj-kumar-gs" className='text-white'>
          <button className='text-white bg-purple-600 my-5 mx-2 rounded-full flex  justify-between items-center ring-white ring-1 hover:cursor-pointer'>
            <img className='invert  w-8 p-1' src="/icons/github.svg" alt="github logo" />
            <span className='font-bold px-2 text-[14px]'>GitHub</span>
          </button>
      </a>
    </nav>
  )
}

export default Navbar
