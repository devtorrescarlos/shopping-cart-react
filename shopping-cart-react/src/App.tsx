import ProductsCard from "./components/ProductsCard"
import ShoppingCart from "./components/ShoppingCart";
import Modal from "./components/Modal";
import useCart from "./hooks/useCart";

function App() {
  const { data, cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, modalIsOpen, setModalIsOpen, onClose } = useCart();

  return (
    <>
      <header className="p-8">
        <h1 className="font-black text-4xl text-rose900">Desserts</h1>
      </header>

      <main>
        <div className="md:flex gap-2 md:max-w-7xl">
          <div className="md:grid grid-cols-2 lg:grid-cols-3">
            {data.map(item => (
              <ProductsCard
                key={item.id}
                item={item}
                addToCart={addToCart}
                cart={cart}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
              />
            ))}
          </div>

          <section className="p-10 bg-rose50 rounded-lg mx-auto max-w-xs w-full md:max-h-max">
            <ShoppingCart
              cart={cart}
              removeFromCart={removeFromCart}
              setModalIsOpen={setModalIsOpen}
            />
          </section>
        </div>
      </main>

      {modalIsOpen ? (
        <section>
          <Modal
            onClose={onClose}
            cart={cart} />
        </section>
      ) : null}


      <footer className="text-center mt-10">
        <p className="text-lg font-semibold">Challenge by Frontend Mentor. Coded by Carlos Torres - <a href="https://github.com/devtorrescarlos">@devtorrescarlos.</a></p>
      </footer>
    </>

  )
}

export default App
