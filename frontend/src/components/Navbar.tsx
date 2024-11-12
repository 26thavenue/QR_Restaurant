// import React from 'react'
import { buttonVariants } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { URLS } from "@/lib/constants"
const Navbar = () => {
  return (
    <div className="flex justify-between px-6 py-4 items-center">
        <div className="h-4 w-4 bg-neutral-400 hover:translate-y-1 cursor-pointer transition-all duration-300 ease-in-out"></div>
        <div className="hidden lg:flex jutify-between items-center gap-4 ">
            <h1 className="cursor-pointer hover:p-1 hover:text-neutral-400 transition-color duration-300 ease-in-out ">Products</h1>
            <h1 className="cursor-pointer hover:p-1 hover:text-neutral-400 transition-color duration-300 ease-in-out ">Contact Us</h1>
            <h1 className="cursor-pointer hover:p-1 hover:text-neutral-400 transition-color duration-300 ease-in-out ">Pricing</h1>
            <Link to ={URLS.MENU}>
              <h1 className="cursor-pointer hover:p-1 hover:text-neutral-400 transition-color duration-300 ease-in-out ">Browse</h1>
            </Link>      
        </div>
        <div className="flex items-center justify-center gap-4 ">
            <Link to ={URLS.LOGIN} className={buttonVariants({ variant: "default" })}>Login</Link>
            <Link to ={URLS.SIGNUP} className={buttonVariants({ variant: "outline" })}>Signup</Link>
        </div>
    </div>
  )
}

export default Navbar