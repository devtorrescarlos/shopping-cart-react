import type { ProductItem } from "../types"
import { useMemo } from "react";
import formatCurrency from "../helpers/formatCurrency"

type ModalProps = {
    cart: ProductItem[];
    onClose: () => void;
}

export default function Modal({ cart, onClose }: ModalProps) {

    const totalAmount = useMemo(() => cart.reduce((accum, item) => accum + item.price * item.quantity, 0), [cart])

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end sm:items-center z-50">
            <div className="bg-rose50 rounded-t-lg sm:rounded-lg p-6 w-full sm:max-w-md 
          h-[80vh] sm:h-auto overflow-y-auto md:max-h-[50rem]">
                <div className="space-y-5 mb-5">
                    <img src="/images/icon-order-confirmed.svg" alt="Icon Order Confirmed" />
                    <h2 className="text-2xl font-bold text-rose900">Order Confirmed</h2>
                    <p className="text-gray-500 font-semibold">We hope you enjoy your food!</p>
                </div>

                <div className="bg-rose100 p-6 w-full rounded-md space-y-5">
                    {cart.map(item => (
                        <div key={item.id} className="flex items-center gap-4 border-rose300/90 border-b-2 space-y-5">
                            <img loading="lazy" className="rounded-md" src={item.image.thumbnail} alt="Product Image" />
                            <div className="p-2">
                                <h3 className="text-rose900 text-lg font-semibold">{item.name}</h3>
                                <p className="text-red font-semibold">{item.quantity}x</p>
                                <p className="text-gray-500 font-semibold">@{` ${formatCurrency(item.price)}  `}</p>
                            </div>
                            <p className="ml-auto font-bold text-lg">{formatCurrency(item.price * item.quantity)}</p>
                        </div>
                    ))}

                    <div className="flex space-between items-center">
                        <p className="text-lg font-rose900">Order Total</p>
                        <p className="text-xl text-rose900 font-semibold ml-auto">{formatCurrency(totalAmount)}</p>
                    </div>
                </div>
                <button className="mt-10 bg-red rounded-full p-4 w-full text-center text-rose50 font-semibold hover:bg-orange-800" onClick={() => onClose()}>Start new order</button>
            </div>
        </div>
    )
}
