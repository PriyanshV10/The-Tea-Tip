import React from 'react'

const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className='p-4 bg-black text-white mx-auto w-full flex justify-center items-center'>
        Copyright &copy; {currentYear} The Tea Tip - Fund your Projects.
    </footer>
  )
}

export default Footer
