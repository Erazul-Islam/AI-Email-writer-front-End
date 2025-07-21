"use client"

import Link from "next/link";

const Navbar = () => {
    return (
        <div className="py-4 flex justify-center items-center gap-10" >
            <Link href={'/'} >Email</Link>
            <Link href={'/image'} >Image</Link>
        </div>
    );
};

export default Navbar;