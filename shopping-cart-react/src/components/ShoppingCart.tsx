import { useMemo } from "react"
import formatCurrency from "../helpers/formatCurrency"
import type { ProductItem } from "../types"
type ShoppinCartProps = {
    cart: ProductItem[]
    removeFromCart: (id: number) => void
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ShoppingCart({ cart, removeFromCart, setModalIsOpen }: ShoppinCartProps) {

    const totalAmount = useMemo(() => cart.reduce((accum, item) => accum + item.price * item.quantity, 0), [cart])

    return (
        <>
            <h2 className="text-red text-2xl font-bold">Your Cart({cart.length})</h2>
            <div className="flex flex-col items-center justify-center mt-10">
                {cart.length >= 1 ? (
                    <>
                        {cart.map(item => (
                            <div key={item.id} className="border-b-2 space-y-5 mb-3 w-full">
                                <h3 className="text-rose900 text-lg font-semibold">{item.name}</h3>
                                <div className="flex justify-between items-center gap-4">
                                    <p className="text-red font-semibold">{item.quantity}x</p>
                                    <p className="text-gray-500 font-semibold">@{` ${formatCurrency(item.price)}  `}<span className="text-rose900/85 font-semibold">{formatCurrency(item.price * item.quantity)}</span></p>
                                    <button className="border-2 border-gray-500 rounded-full px-2 mb-1 text-gray-500 font-semibold hover:text-gray-400 hover:border-gray-400"
                                        onClick={() => removeFromCart(item.id)}>X</button>
                                </div>
                            </div>
                        ))}

                        <div className="flex gap-2 w-full mt-10">
                            <p className="text-lg text-rose900 ">Order Total</p>
                            <p className="text-xl text-rose900 font-semibold ml-auto">{formatCurrency(totalAmount)}</p>
                        </div>

                        <div className="flex items-center gap-6 mt-10 bg-gray-500/30 text-rose900 text-lg text-center px-6 py-2 rounded-lg">
                            <img className="h-7 w-10" src="/images/icon-carbon-neutral.svg" alt="Icon Carbon Neutral" />
                            <p>This is a <span className="font-bold">Carbon neutral delivery</span></p>
                        </div>


                        <button className="mt-10 bg-red rounded-full p-4 w-full text-center text-rose50 font-semibold hover:bg-orange-800" onClick={() => setModalIsOpen(true)}>Confirm Order</button>

                    </>
                ) : (
                    <div className="flex items-center flex-col">
                        <img src="/images/illustration-empty-cart.svg" alt="empty-cart-svg" />
                        <p className="text-rose900/85 text-lg font-semibold">Your added items will appear here</p>
                    </div>
                )}

            </div>
        </>

    )
}
