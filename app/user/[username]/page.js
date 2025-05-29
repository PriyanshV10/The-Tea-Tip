import React from 'react'
import PaymentPage from '@/app/components/PaymentPage';
import connectDB from '@/app/db/connectDB';
import User from '@/app/models/User';
import { notFound } from 'next/navigation';


const username = async ({ params }) => {
  const { username } = await params;

  if (!params || !params.username) {
    throw new Error('Username parameter is missing');
  }

  await connectDB();
  let user = await User.findOne({ username: params.username });
  if (!user) {
    return notFound();
  }

  return (
    <>
      <PaymentPage username={username} />
    </>
  );
}

export default username

export async function generateMetadata({ params }) {
  const { username } = await params;
  await connectDB();
  let user = await User.findOne({ username: username });
  if(!user) {
    return {
      title: "User not found - The Tea Tip",
    }
  }
  return {
    title: `${user.name} - The Tea Tip`,
  };
}