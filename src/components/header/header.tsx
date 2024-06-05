import { Menu } from "lucide-react";
import "../header/header.css";
import Auth from "./registration/auth";
import ProductCard from "./products/products";
import ShoppingCart from "./shopping_cart/shopping_cart";
import useCart from "../../hooks/cart";

const Header = () => {
  const { cart, addToCart, removeFromItem, isProductAdded } = useCart();

  return (
    <>
      <header
        className={`h-16 w-full flex flex-row justify-center items-center bg-slate-600`}
      >
        <nav className="w-full">
          <ul className="flex justify-between px-8">
            <div className="flex justify-center items-center transition-all duration-300 rounded cursor-pointer w-10 h-10 hover:bg-slate-500">
              <Menu color="white" size={30} />
            </div>
            <div className="flex gap-4">
              <Auth />
              <ShoppingCart cart={cart} removeFromItem={removeFromItem}/>
            </div>
          </ul>
        </nav>
      </header>
      <ProductCard addToCart={addToCart} isProductAdded={isProductAdded} />
    </>
  );
};

export default Header;
