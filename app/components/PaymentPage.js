"use client"

import Script from 'next/script'
import { React, useEffect, useState } from 'react'
import { initiate, fetchUser, fetchPayments } from '../actions/userActions'
import { useSession } from 'next-auth/react'
import { toast, Bounce } from 'react-toastify';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const PaymentPage = ({ username }) => {

    const [paymentForm, setPaymentForm] = useState({
        name: "",
        message: "",
        amount: ""
    })
    const [currentUser, setCurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (searchParams.get("paymentDone") == "true") {
            toast.info('Payment has been made!', {
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
            router.push(`/user/${username}`)
        }
    }, [])

    const { data: session } = useSession()

    const handleChange = (e) => {
        setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        try {
            let user = await fetchUser(username)
            if (!user) {
                throw new Error("User not found")
            }
            setCurrentUser({ ...user })
            let dbPayments = await fetchPayments(username)
            setPayments(dbPayments)
        } catch (error) {
            toast.error('🦄 Wow so easy!', {
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

    const pay = async (amount) => {
        try {
            let a = await initiate(amount, username, paymentForm)
            if (!a) {
                throw new Error("Error in payment")
            }
            let orderId = a.id;
            var options = {
                "key": currentUser.razorpayId, // Enter the Key ID generated from the Dashboard
                "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "The Tea Tip", //your business name
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": orderId, //This is a sample Order ID. Pass the id obtained in the response of Step 1
                "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
                "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                    "name": "Gaurav Kumar", //your customer's name
                    "email": "gaurav.kumar@example.com",
                    "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            }

            var rzp1 = new Razorpay(options);
            rzp1.open();
        }
        catch (error) {
            toast.error('🦄 Wow so easy!', {
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

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <div>
                <div className='bg-gray-500 w-full h-0.5'></div>
                <div className="cover relative w-full mx-auto">
                    {currentUser.coverPic ? <img className='w-full mx-auto h-[300px]' src={currentUser.coverPic} alt="cover picture" /> : <div className='h-100 w-full bg-slate-700'></div>}
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-black overflow-hidden border-2 rounded-full size-32">
                        <img className='object-cover rounded-full' src={currentUser.profilePic || "/avatar.gif"} alt="" />
                    </div>
                </div>
                <div className='text-white my-20 flex flex-col gap-2 justify-center items-center'>
                    <div className='text-2xl font-bold'>{currentUser.name}</div>
                    <div>Lets help {currentUser.name} by a Tea Tip</div>
                    <div className='text-gray-400'>{payments.length} Supporters.</div>
                </div>
                <div className="payment w-4/5 my-10 text-white mx-auto flex md:flex-row flex-col gap-4">
                    <div className="supporters w-full md:w-1/2 p-4 rounded-lg bg-slate-800">
                        <h1 className='my-4 text-xl font-bold'>Top Supporters</h1>
                        <ul className='m-4'>
                            {payments.length === 0 && <li className='text-lg'>No supporters yet</li>}
                            {payments?.map((payment, i) => {
                                // only show the entry if done is true
                                if (!payment?.done) {
                                    return null
                                }
                                return (
                                    <li key={i} className='my-4 flex gap-2 items-center text-lg'>
                                        <img width={30} src="/coin.gif" alt="pic" />
                                        <div>{payment?.name} donated <span className='font-bold'>₹{payment?.amount}</span> with a message "{payment?.message}".</div>
                                    </li>
                                )
                            })}

                        </ul>
                    </div>
                    <div className="makePayment w-full md:w-1/2 p-4 flex flex-col gap-8 rounded-lg bg-slate-800">
                        <h1 className='my-4 text-xl font-bold'>Make a Payment</h1>
                        <div className='flex flex-col gap-2'>
                            <input type="text" name="name" value={paymentForm.name} onChange={handleChange} className='w-4/5 mx-auto p-3 rounded-lg bg-gray-700' placeholder='Enter Name' />
                            <input type="text" name="message" value={paymentForm.message} onChange={handleChange} className='w-4/5 mx-auto p-3 rounded-lg bg-gray-700' placeholder='Enter Message' />
                            <input type="number" name="amount" value={paymentForm.amount} onChange={handleChange} className='w-4/5 mx-auto p-3 rounded-lg bg-gray-700' placeholder='Enter Amount' />
                            <button className='cursor-pointer w-fit mx-auto bg-blue-700 p-3 px-5 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed' disabled={(!paymentForm.name || paymentForm.name.length < 2) || (!paymentForm.message || paymentForm.message.length < 2) || !paymentForm.amount} onClick={() => {
                                if (paymentForm.amount) {
                                    pay(paymentForm.amount + "00")
                                }
                            }}>Pay</button>
                        </div>
                        <div className='flex mx-auto gap-4'>
                            <button className='cursor-pointer bg-blue-700 p-3 px-5 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed' disabled={(!paymentForm.name || paymentForm.name.length < 2) || (!paymentForm.message || paymentForm.message.length < 2)} onClick={() => { pay(1000) }}>Pay ₹10</button>
                            <button className='cursor-pointer bg-blue-700 p-3 px-5 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed' disabled={(!paymentForm.name || paymentForm.name.length < 2) || (!paymentForm.message || paymentForm.message.length < 2)} onClick={() => { pay(2000) }}>Pay ₹20</button>
                            <button className='cursor-pointer bg-blue-700 p-3 px-5 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed' disabled={(!paymentForm.name || paymentForm.name.length < 2) || (!paymentForm.message || paymentForm.message.length < 2)} onClick={() => { pay(3000) }}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default PaymentPage
