"use client"
import useCart from "@/hooks/useCart";
import { FaShoppingBasket } from "react-icons/fa";

const CardCount = () => {
    const { cartPrdcts } = useCart();
    return (
        <div className='hidden md:flex relative mt-4'>
            <FaShoppingBasket size={25} onClick={() => { }} />
            <div className="absolute top-0 left-4 text-xs bg-orange-900 w-5 h-5 flex items-center justify-center rounded-full ">{cartPrdcts?.length}</div>
        </div>
    )
}

export default CardCount
