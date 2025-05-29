"use server"

import Razorpay from "razorpay"
import Payment from "../models/Payment"
import connectDB from "../db/connectDB"
import User from "../models/User"

export const initiate = async (amount, to_username, paymentForm) => {
    await connectDB()

    let user = await User.findOne({ username: to_username })
    const secret = user.razorpaySecret

    var instance = new Razorpay({ key_id: user.razorpayId, key_secret: secret})

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let x = await instance.orders.create(options).catch((error) => {
        console.error(error)
        throw new Error("Failed to create order")
    })

    if(!x) {
        throw new Error("Failed to create order")
    }

    await Payment.create({
        oid: x.id,
        amount: amount / 100,
        to_user: to_username,
        name: paymentForm.name,
        message: paymentForm.message
    }).catch((error) => {
        console.error(error)
        throw new Error("Failed to store payment")
    })

    return x;
}

export const fetchUser = async (username) => {
    await connectDB();
    try {
        let user = await User.findOne({ username: username });
        if (!user) {
            throw new Error("User not found");
        }
        return user.toObject({ flattenObjectIds: true });
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}

export const updateProfile = async (data, oldUsername) => {
    await connectDB();
    
    let ndata = Object.fromEntries(data)
    // check if the username is being updated, new username is available
    if (oldUsername !== ndata.username) {
        let user = await User.findOne({ username: ndata.username });
        if(user) {
            return { error: "Username already exists" }
        }
        await User.updateOne({ email: ndata.email }, ndata)
        // Now update all the usernames in the Payments table
        await Payment.updateMany({ to_user: oldUsername }, { to_user: ndata.username })
    }
    else {
        await User.updateOne({ email: ndata.email }, ndata)
    }     

    return { success: true }
    
}

export const fetchPayments = async (username) => {
    await connectDB()
    if (!username) {
        throw new Error("Username is required to fetch payments")
    }
    try {
        // find all the payments sorted by decreasing order of amounts
        let payments = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).limit(10).lean().exec()
        return payments.map(payment => JSON.parse(JSON.stringify(payment)))
    } catch (error) {
        console.error("Error fetching payments:", error)
        throw error
    }
}
