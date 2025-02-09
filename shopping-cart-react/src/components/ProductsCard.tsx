import type { Product, ProductItem } from "../types";
import formatCurrency from "../helpers/formatCurrency";

type ProductCardsProps = {
  item: Product
  addToCart: (item: Product) => void
  cart: ProductItem[]
  incrementQuantity: (id : number) => void
  decrementQuantity: (id : number) => void
}
export default function ProductsCard({ item, addToCart, cart, incrementQuantity, decrementQuantity }: ProductCardsProps) {

  const cartItem = cart.find(cartProductItem => cartProductItem.id === item.id);

  return (
    <>
      <div>
        <div className="p-8 flex items-center flex-col relative">
          <img loading="lazy" className="rounded-lg hover:scale-110 transition-transform" src={`${item.image.desktop}`} alt="imagen-producto" />
          <div className={`absolute bottom-3 flex items-center gap-3  ${cartItem ? ('bg-red') : ('bg-rose50 border-rose900')} text-lg py-2 px-4 rounded-full border hover:scale-105 transition-transform hover:cursor-pointer hover:border-red`}>

            {cartItem ? (
              <div className="flex items-center gap-5 px-4">
                <button className="border-2 border-rose50 rounded-full px-1 py-1 hover:bg-rose50/30"><img className="h-4 w-4" src="/images/icon-decrement-quantity.svg" alt="Icon to Decrement the Quantity" onClick={() => decrementQuantity(item.id)} /></button>
                <p className="text-rose50 font-semibold">{cartItem.quantity}</p>
                <button className="border-2 border-rose50 rounded-full px-1 py-1 hover:bg-rose50/30"><img className="h-4 w-4" src="/images/icon-increment-quantity.svg" alt="Icon to Increment the Quantity" onClick={() => incrementQuantity(item.id)} /></button>
              </div>
            ) : (
              <>
                <img src="/images/icon-add-to-cart.svg" alt="carrito-icon" />
                <button className="text-rose900 hover:text-red font-semibold" onClick={() => addToCart(item)}>Add To Cart</button>
              </>
            )}
          </div>


        </div>
        <div className="m-4 px-9">
          <p className="text-gray-400">{item.category}</p>
          <p className="text-lg text-rose900 font-semibold">{item.name}</p>
          <p className="text-lg text-red font-semibold">{formatCurrency(item.price)}</p>
        </div>
      </div>
    </>
  );
}
