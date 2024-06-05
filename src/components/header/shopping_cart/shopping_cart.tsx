import useModal from "../../../hooks/useModal";
import { ShoppingCart as CartIcon, X } from "lucide-react";
import useBodyScrollLock from "../../../hooks/useBodyScrollLock";
import { IProduct } from "../../../hooks/cart";
import CartItem from "./cart_item";

export interface ShoppingCartProps {
  cart: IProduct[];
  removeFromItem: (idToRemove: number) => void;
}

const ShoppingCart = ({ cart, removeFromItem }: ShoppingCartProps) => {
  const { isOpen, isClosing, openModal, closeModal } = useModal();

  useBodyScrollLock(isOpen);

  return (
    <>
      <div
        onClick={openModal}
        className="flex justify-center relative items-center transition-all duration-300 rounded cursor-pointer w-10 h-10 hover:bg-slate-500"
      >
        <CartIcon color="white" size={30} />
        <span className="absolute min-w-5 h-5 text-white text-sm bg-green-500 rounded-borderCircle top-0 left-6">
          {cart.length}
        </span>
      </div>
      {isOpen && (
        <div
          className={`fixed p-5 top-0 left-0 h-full max-md:p-0 right-0 bottom-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-50 z-10
        ${isClosing ? "animate-fade-out" : "animate-fade-in"}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="bg-white max-h-full relative rounded-lg lg:w-3/5 md:w-4/5 xs:w-4/5 x-zero:w-full z-10 flex flex-col items-center ">
            <div className="flex w-full items-center text-2xl font-bold min-h-14 pl-6 pr-6 justify-between border-b ">
              <h2>Shopping cart</h2>
              <X
                onClick={closeModal}
                className="text-labelCol transition-all duration-300 hover:text-red-400 cursor-pointer"
              />
            </div>
            {cart.length > 0 ? (
              <CartItem cart={cart} removeFromItem={removeFromItem} closeModal={closeModal} />
            ) 
            : (
              <div className="p-6 w-full flex flex-col items-center overflow-y-scroll">
                <img
                  src="/modal-cart-dummy.svg"
                  className="max-w-60 mb-12"
                  alt="emptyCart"
                />
                <h4 className="font-bold text-xl mb-6">Empty shopping cart</h4>
                <p>But it's never too late to fix it:{`)`}</p>
              </div>
            )
            }
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
