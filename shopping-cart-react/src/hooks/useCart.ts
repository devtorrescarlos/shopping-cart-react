import { useState } from "react"
import { db } from "../data/db";
import type { Product, ProductItem } from "../types";
export default function useCart() {

  const [data] = useState<Product[]>(db);
  const [cart, setCart] = useState<ProductItem[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const MIN_ITEMS = 1;

  function addToCart(item: Product) {
    // Encontrar si un producto existe
    const itemExists = cart.find(productItem => productItem.id === item.id);
    if (itemExists) {
      // Nos aseguramos de obtener el mismo ID, entonces, creamos un nuevo arreglo y sumamos la cantidad, caso contrario
      // Devolvemos el mismo producto
      const updatedCart = cart.map(productItem => productItem.id === item.id ? { ...productItem, quantity: productItem.quantity + 1 } : productItem)
      setCart(updatedCart)
    } else {
      const newItem: ProductItem = { ...item, quantity: 1 }
      setCart([...cart, newItem]);
    }


  }

  function removeFromCart(id: number) {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart)
  }

  function incrementQuantity(id: number) {
    const updatedCart = cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
    setCart(updatedCart)
  }

  function decrementQuantity(id: number) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item, quantity: item.quantity - 1
        }
      }
      return item;
    });
    setCart(updatedCart)
  }

  function onClose() {
    setModalIsOpen(false)
    setCart([]);
  }

  return {
    data,
    cart,
    setCart,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    modalIsOpen,
    setModalIsOpen,
    onClose
  }

}