'use client';
import { CardProductProps } from "@/app/components/Detail/DetailClients";
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { toast } from 'react-hot-toast';


interface CartContextProps {
    productCartQty: number
    cartPrdcts: CardProductProps[] | null
    addToBasket: (product: CardProductProps) => void
    removeFromCart: (product: CardProductProps) => void
    addToBasketIncrease: (product: CardProductProps) => void
    addToBasketDecrease: (product: CardProductProps) => void
    removeCart: () => void
}

const CartContext = createContext<CartContextProps | null>(null)


interface Props {
    [propName: string]: any
}

export const CartContextProvider = (props: Props) => {
    const [productCartQty, setProductCartQty] = useState(0)
    const [cartPrdcts, setCartPrdcts] = useState<CardProductProps[] | null>(null)

    useEffect(() => {
        let getItem: any = localStorage.getItem('cart')
        let getItemParse: CardProductProps[] | null = JSON.parse(getItem)
        setCartPrdcts(getItemParse)
    }, [])

    const addToBasketIncrease = useCallback((product: CardProductProps) => {
        if (cartPrdcts) {
            const updatedCart = [...cartPrdcts];
            const existingItemIndex = cartPrdcts.findIndex(item => item.id === product.id);

            if (existingItemIndex > -1) {
                const existingItem = updatedCart[existingItemIndex];
                if (existingItem.quantity >= 10) {
                    return toast.error('Daha fazla ekleyemezsin');
                }
                updatedCart[existingItemIndex].quantity += 1;
                setCartPrdcts(updatedCart);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }
        }
    }, [cartPrdcts]);
    const addToBasketDecrease = useCallback((product: CardProductProps) => {
        if (cartPrdcts) {
            const updatedCart = [...cartPrdcts];
            const existingItemIndex = cartPrdcts.findIndex(item => item.id === product.id);

            if (existingItemIndex >= 0) {
                const existingItem = updatedCart[existingItemIndex];

                if (existingItem.quantity > 1) {


                    updatedCart[existingItemIndex].quantity -= 1;
                    setCartPrdcts(updatedCart);
                    localStorage.setItem('cart', JSON.stringify(updatedCart));
                }
            }
        }
    }, [cartPrdcts]);


    const removeCart = useCallback(() => {
        setCartPrdcts(null)
        toast.success('Sepet Temizlnedi')
        localStorage.setItem('cart', JSON.stringify(null))
    }, [])

    const addToBasket = useCallback((product: CardProductProps) => {
        setCartPrdcts(prev => {
            let updatedCart;
            if (prev) {
                updatedCart = [...prev, product]
            } else {
                updatedCart = [product]
            }
            toast.success('Ürün sepete eklendi...')
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            return updatedCart
        })
    }, [cartPrdcts])

    const removeFromCart = useCallback((product: CardProductProps) => {
        if (cartPrdcts) {
            const filteredProducts = cartPrdcts.filter(cart => cart.id !== product.id)
            setCartPrdcts(filteredProducts)
            toast.success('Ürün sepetten çıkarıldı...')
            localStorage.setItem('cart', JSON.stringify(filteredProducts))
        }
    }, [cartPrdcts])

    let value = {
        productCartQty,
        addToBasket,
        cartPrdcts,
        removeFromCart,
        removeCart,
        addToBasketIncrease,
        addToBasketDecrease
    }
    return (
        <CartContext.Provider value={value} {...props} />
    )

}
const useCart = () => {
    const context = useContext(CartContext)
    if (context == null) {
        throw new Error('Bir hata durumu mevcut')
    }
    return context
}

export default useCart

