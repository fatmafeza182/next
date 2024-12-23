import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
function HamburgerMenu() {
    return (
        <div className='relative flex md:hidden mt-3'>
            <GiHamburgerMenu className='mt-5' />
        </div>
    )
}

export default HamburgerMenu
