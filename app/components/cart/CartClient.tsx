"use client"
import useCart from "@/hooks/useCart";
import PageContainer from "../Container/PageContainer";
import { Button } from "@mui/material";
import Counter from "../General/Counter";
import { CardProductProps } from "../Detail/DetailClients";

const CartClient = () => {
    const { cartPrdcts, removeFromCart, removeCart, addToBasketIncrease, addToBasketDecrease } = useCart();

    console.log(cartPrdcts, "cartPrdcts")
    if (!cartPrdcts || cartPrdcts.length == 0) {
        return <div>Sepetinizde Ürün Bulunamamaktadır</div>
    }
    let cartPrdctsTotal = cartPrdcts.reduce((acc: any, item: CardProductProps) => acc + item.quantity * item.price, 0)
    return (
        <div className="my-3 md:my-10">
            <PageContainer>
                <div className="flex items-center gap-3 justify-center text-center border-b py-3 ">
                    <div className="w-1/5">Ürün Resmi </div>
                    <div className="w-1/5">Ürün Adı  </div>
                    <div className="w-1/5">Ürün Miktarı </div>
                    <div className="w-1/5">Ürün Fiyatı</div>
                    <div className="w-1/5"></div>
                </div>
                <div >
                    {
                        cartPrdcts.map(cart => {
                            return (
                                <div key={cart.id} className="flex items-center justify-between text-center">
                                    <div className="w-1/5 flex items-center justify-center my-5">
                                        <img src={cart.image} width={100} height={100} alt="" />
                                    </div>
                                    <div className="w-1/5">{cart.title}</div>
                                    <div className="w-1/5 justify-center">
                                        <Counter cardProduct={cart} increaseFunc={() => addToBasketIncrease(cart)} decreaseFunc={() => addToBasketDecrease(cart)} />
                                    </div>
                                    <div className="w-1/5">{cart.price} $</div>
                                    <div className="w-1/5 text-teal-800">
                                        <button onClick={() => removeFromCart(cart)}>Ürünü sil</button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="flex items-center justify-between my-5 py-5 border-1">
                    <button onClick={() => removeCart()} className="w-1/5 underline text-small">Sepeti sil</button>
                    <div className="text-lg md:text-2xl text-orange-600  font-bold">{cartPrdctsTotal}</div>
                </div>
            </PageContainer >
        </div >
    )

}
export default CartClient
