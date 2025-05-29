"use client"

import Image from "next/image";
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from "next/link";

export default function Home() {

  const { data: session, status } = useSession()

  if (status == "loading") {
        return <div className="min-h-[84vh] flex items-center justify-center rounded-lg">
            <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
            </div>
        </div>
    }

  return (
    <main className="text-white">
      <div className="w-full py-30 flex flex-col gap-4 justify-center items-center">
        <div className="text-4xl font-bold flex gap-2 justify-center items-center">
          <div>The Tea Tip</div>
          <img className="bg-[#020618] rounded-full" src="tea.gif" width={60} alt="" />
        </div>
        <div className="text-xl p-2">A crowdfunding platform for creators. Get funded by your supporters.</div>
        <div className="flex gap-2 mt-8">
          <Link href="/login" className="cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</Link>
          <Link href="/about" className=" cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</Link>
        </div>
      </div>
      <div className="bg-gray-700 w-full h-0.5 my-20"></div>
      <div className="container mx-auto">
        <h1 className="font-bold text-2xl text-center my-20">Your fans can buy you a Tea!</h1>
        <div className="flex flex-wrap gap-10 justify-around">
          <div className="item flex flex-col justify-center items-center gap-2">
            <img className="bg-slate-500 rounded-full p-2" width={100} src="man.gif" alt="" />
            <div className="flex flex-col justify-center items-center">
              <div className="font-bold">Fund Yourself</div>
              <div className="text-sm">Your Fans are available for you to help you</div>
            </div>
          </div>
          <div className="item flex flex-col justify-center items-center gap-2">
            <img className="bg-slate-500 rounded-full p-2" width={100} src="coin.gif" alt="" />
            <div className="flex flex-col justify-center items-center">
              <div className="font-bold">Fund Yourself</div>
              <div className="text-sm">Your Fans are available for you to help you</div>
            </div>
          </div>
          <div className="item flex flex-col justify-center items-center gap-2">
            <img className="bg-slate-500 rounded-full p-2" width={100} src="group.gif" alt="" />
            <div className="flex flex-col justify-center items-center">
              <div className="font-bold">Fund Yourself</div>
              <div className="text-sm">Your Fans are available for you to help you</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-700 w-full h-0.5 my-20"></div>
      <div className=" mb-20 container mx-auto">
        <h1 className="font-bold text-2xl text-center my-20">Learn More About Us</h1>
        <div className="flex flex-wrap gap-10 justify-around">
          <div className="item flex flex-col justify-center items-center gap-2">
            <img className="bg-slate-500 rounded-full p-2" width={100} src="man.gif" alt="" />
            <div className="flex flex-col justify-center items-center">
              <div className="font-bold">Fund Yourself</div>
              <div className="text-sm">Your Fans are available for you to help you</div>
            </div>
          </div>
          <div className="item flex flex-col justify-center items-center gap-2">
            <img className="bg-slate-500 rounded-full p-2" width={100} src="coin.gif" alt="" />
            <div className="flex flex-col justify-center items-center">
              <div className="font-bold">Fund Yourself</div>
              <div className="text-sm">Your Fans are available for you to help you</div>
            </div>
          </div>
          <div className="item flex flex-col justify-center items-center gap-2">
            <img className="bg-slate-500 rounded-full p-2" width={100} src="group.gif" alt="" />
            <div className="flex flex-col justify-center items-center">
              <div className="font-bold">Fund Yourself</div>
              <div className="text-sm">Your Fans are available for you to help you</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
