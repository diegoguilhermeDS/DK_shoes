import { useCart } from "@/providers/cartProvider/cartContext";
import { useProducts } from "@/providers/productContext";
import React from "react";
import { MiniCard } from "../mini_card";
import { iProduct } from '@/interfaces'

const CartModalContent = () => {
  const { setOpenModal } = useProducts();
  const { cart } = useCart();

  return (
    <>
      <div className="w-96 bg-white rounded relative rounded-md overflow-hidden animate-animationOpenModal">
        <button
          onClick={() => setOpenModal(false)}
          className="absolute top-2 right-3 font-semibold text-gray-100"
        >
          X
        </button>
        <header className="w-full bg-orange-400 p-2 flex items-center justify-center">
          <h2 className="font-semibold text-white text-lg">
            Carrinho de compras
          </h2>
        </header>
        <section className="min-h-1">
          <ul className="divide-y divide-gray-200">
            {cart.map((product: iProduct) => (
              <MiniCard key={product.id} product={product}/>
            ))}
          </ul>
        </section>
        {cart.length > 0 ? (
          <section className="bg-gray-900 w-full p-2 flex flex-col gap-2">
            <div className='flex justify-between'>
              <h3 className="text-white font-semibold text-sm">Quantidade:</h3>
              <span className="text-white font-semibold text-sm">{cart.length}</span>
            </div>
            <div className='flex justify-between'>
              <h3 className="text-white font-semibold text-sm">Total:</h3>
              <span className="text-white font-semibold text-sm">{cart.reduce((total, product) => total + (product.value * product.countCart), 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}</span>
            </div>
          </section>
        ) : (
          (() => {
            setOpenModal(false);
            return null;
          })()
        )}
      </div>
    </>
  );
};

export default CartModalContent;