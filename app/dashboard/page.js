"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import { fetchUser, updateProfile } from '../actions/userActions'
import { ToastContainer, toast, Bounce } from 'react-toastify';

const Dashboard = () => {
  const { data: session, status } = useSession()

  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    profilePic: '',
    coverPic: '',
    razorpayId: '',
    razorpaySecret: ''
  })

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push('/login')
    }
    else {
      getData()
    }
  }, [session, status])


  if (status === "loading") {
    return <div className="min-h-[84vh] flex items-center justify-center rounded-lg">
      <div role="status">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
      </div>
    </div>
  }

  const getData = async () => {
    let user = await fetchUser(session.user.name)
    setForm(user)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {

    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }
    let res = await updateProfile(formData, session.user.name)
    if (!res.error) {
      toast.success('Profile updated successfully!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    else {
      toast.error('Error in updating profile!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }

  const inputStyle = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

  return (
    <div className='my-10 p-2 w-full md:w-1/2 mx-auto text-white'>
      <h1 className='my-8 text-2xl font-bold text-center'>Welcome to your Dashboard!</h1>
      <form className='flex flex-col gap-4' action={handleSubmit}>

        <div className='flex flex-col gap-2'>
          <label htmlFor="name" className='font-medium'>Name</label>
          <input value={form.name || ""} onChange={handleChange} name='name' id='name' type="text" placeholder='Enter Your Name'
            className={inputStyle} required />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="email" className='font-medium'>Email</label>
          <input value={form.email ?? ""} onChange={handleChange} name='email' id='email' type="email" placeholder='Enter Your Email'
            className={inputStyle + " cursor-not-allowed"} required disabled={true} />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="username" className='font-medium'>Username</label>
          <input value={form.username || ""} onChange={handleChange} name='username' id='username' type="text" placeholder='Enter Your Username'
            className={inputStyle} required />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="profilePic" className='font-medium'>Profile Picture (URL)</label>
          <input value={form.profilePic || ""} onChange={handleChange} name='profilePic' id='profilePic' type="text" placeholder='Enter Profile Picture URL'
            className={inputStyle} />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="coverPic" className='font-medium'>Cover Picture (URL)</label>
          <input value={form.coverPic || ""} onChange={handleChange} name='coverPic' id='coverPic' type="text" placeholder='Enter Cover Picture URL'
            className={inputStyle} />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="razorpayId" className='font-medium'>Razorpay ID</label>
          <input value={form.razorpayId || ""} onChange={handleChange} name='razorpayId' id='razorpayId' type="text" placeholder='Enter Razorpay ID'
            className={inputStyle} />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="razorpaySecret" className='font-medium'>Razorpay Secret</label>
          <input value={form.razorpaySecret || ""} onChange={handleChange} name='razorpaySecret' id='razorpaySecret' type="text" placeholder='Enter Razorpay Secret'
            className={inputStyle} />
        </div>

        <div className='my-4 text-center'>
          <button type='submit' className='cursor-pointer p-2 px-4 rounded-lg bg-blue-700'>Save</button>
        </div>

      </form>
    </div>
  )
}

export default Dashboard

// export const metadata = {
//     title: "Dashboard - The Tea Tip",
// }
