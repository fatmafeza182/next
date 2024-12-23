import React from 'react'
import CardCount from './CardCount'
import HamburgerMenu from './HamburgerMenu'
import Search from './Search'
import User from './User'
import Logo from './Logo'
import { getCurrentUser } from '@/app/actions/getCurrentUser'

const Navbar = async () => {
    const currentUser = await getCurrentUser();
    return (
        <div className='flex item-center justify-between gap-3 md:gap-10 px-3 md:px-10 h-19 bg-amber-500 text-slate-100'>
            <Logo />
            <Search />
            <CardCount />
            <User currentUser={currentUser} />
            <HamburgerMenu />
        </div>
    )
}

export default Navbar;
