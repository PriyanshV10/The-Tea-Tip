import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/app/models/Payment";
import Razorpay from "razorpay";
import connectDB from "@/app/db/connectDB";
import User from "@/app/models/User";

export const POST = async (req) => {
    await connectDB()
    let body = await req.formData()
    body = Object.fromEntries(body)

    // Check if razorpay_order_id exists
    let p = await Payment.findOne({ oid: body.razorpay_order_id })
    if (!p) {
        return NextResponse.json({  success: false, message: "Order Id not found" })
    }

    // fetch the secret of the user who is getting the payment
    let user = await User.findOne({username: p.to_user})
    const secret = user.razorpaySecret

    // Verify the payment
    let result = validatePaymentVerification(
        {
            "order_id": body.razorpay_order_id,
            "payment_id": body.razorpay_payment_id
        },
        body.razorpay_signature,
        secret
    )

    if (result) {
        // Update the payment to completed
        const updatedPayment = await Payment.findOneAndUpdate({ oid: body.razorpay_order_id }, { done: true }, { new: true })
        const plainUpdatedPayment = JSON.parse(JSON.stringify(updatedPayment))
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/user/${plainUpdatedPayment.to_user}?payment=true`);
    }

    else {
        return NextResponse.json({ success: false, error: "Payment verification failed" })
    }
}