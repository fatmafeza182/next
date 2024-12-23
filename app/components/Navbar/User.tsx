"use client"
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation"
import React, { useState } from "react";
import { FaUser } from "react-icons/fa6";

interface UserProps {
    currentUser: User | undefined,
}

const UserOne: React.FC<UserProps> = ({ currentUser }) => {
    const router = useRouter();
    const [openMenu, setOpenMenu] = useState(false);

    const menuFunc = (type: string) => {
        setOpenMenu(false);  // Menüyi kapat
        if (type === "logout") {
            signOut();
            router.push("/login");
        } else if (type === "register") {
            router.push("/register");
        } else {
            router.push("/login");
        }
    };

    return (
        <div className='hidden md:flex gap-2 mt-4 cursor-pointer'>
            <div onClick={() => setOpenMenu(!openMenu)}>
                <FaUser size="25px" />
            </div>
            <div>{currentUser ? currentUser.name : "User"}</div>
            {openMenu && (
                <div className="absolute w-[150px] top-10 bg-white shadow-lg right-0 p-2 rounded-md">
                    {currentUser ? (
                        <div className="space-y-1">
                            <div onClick={() => router.push('/admin')} className="text-slate-600">Admin</div>
                            <div onClick={() => menuFunc("logout")} className="text-slate-600">Logout</div>
                        </div>
                    ) : (
                        <div>
                            <div onClick={() => menuFunc("register")} className="text-slate-600">Register</div>
                            <div onClick={() => menuFunc("login")} className="text-slate-600">Login</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserOne;
