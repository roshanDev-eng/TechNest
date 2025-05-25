import { Link } from "react-router-dom"
export default function Thankyou() {
    return(
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center px-4">
            <h1 className="text-4xl font-bold text-green-600 mb-4">   🎉 Thank You for Your Order!</h1>
            <p className="text-lg text-gray-700 mb-6"> Your order has been placed successfully. We'll get in touch with you soon.</p>

            <Link
            className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
            to="/shop">  Continue Shopping
            </Link>
        </div>
    )

}