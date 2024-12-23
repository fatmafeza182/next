'use client';
import { useEffect, useState } from 'react';
import PageContainer from '../Container/PageContainer'
import Counter from '../General/Counter';
import { Rating } from '@mui/material';
import Button from '../General/Button';
import useCart from '@/hooks/useCart';



export type CardProductProps = {
    id: string
    title: string
    description: string
    price: number
    quantity: number,
    image: string
    inStock: boolean
}


function DetailClients({ product }: { product: any }) {


    const { productCartQty, addToBasket, cartPrdcts } = useCart()
    const [displayButton, setDisplatButton] = useState(false)


    const [cardProduct, setCardProduct] = useState<CardProductProps>({

        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        quantity: 1,
        image: product.image,
        inStock: product.inStock,
    })


    useEffect(() => {
        setDisplatButton(false)
        let controlDisplay: any = cartPrdcts?.findIndex(cart => cart.id === product.id)
        if (controlDisplay > -1) {
            setDisplatButton(true)
        }
    }, [cartPrdcts])

    const increaseFunc = () => {
        if (cardProduct.quantity == 10) return
        setCardProduct(prev => ({ ...prev, quantity: prev.quantity + 1 }));
    }

    const decreaseFunc = () => {
        if (cardProduct.quantity == 1) return
        setCardProduct(prev => ({ ...prev, quantity: prev.quantity - 1 }));
    }

    const productRating = product?.reviews?.length
        ? product.reviews.reduce((acc: number, item: any) => acc + item.rating, 0) / product.reviews.length
        : 0;

    return (
        <div className='py-10 flex items-center'>
            <PageContainer >
                <div className="flex md-flex gap-10 justify-center">
                    <div className="relative h-[200px] w-[200px]">
                        <img src={product?.image} alt="" />
                    </div>
                    <div className=" w-full md:w-1/2 space-y-3">
                        <div className="text-xl md:text-2xl font-bold">{product?.title}</div>
                        <Rating name="read-only" value={productRating} readOnly />
                        <div className='text-slate-500'>{product?.description}</div>
                        <div>
                            <div>Stok Durumu</div>
                            {
                                product.inStock ? <div className='text-green-500'>Stokta Mevcut</div> : <div className='text-red-500'>Ürün Stokta mevcut değil</div>
                            }
                        </div>
                        <div className="text-lg md:text-2xl text-orange-600 font-bold">{product.price}</div>
                        {
                            displayButton ? <>
                                <Button text='Ürün Sepete eklendi' small outline onClick={() => { }} />
                            </> : <>
                                <div className='space-y-3'>
                                    <Counter increaseFunc={increaseFunc} decreaseFunc={decreaseFunc} cardProduct={cardProduct} />
                                    <Button text='Sepete Ekle' small onClick={() => addToBasket(cardProduct)} />
                                </div></>
                        }


                    </div>
                </div>

            </PageContainer>
        </div>
    )
}

export default DetailClients