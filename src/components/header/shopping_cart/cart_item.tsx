import { EllipsisVertical as Elvert, Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IProduct } from "../../../hooks/cart";

interface ICartItemProps {
  cart: IProduct[];
  removeFromItem: (idToRemove: number) => void;
  closeModal: () => void
}

const CartItem = ({ cart, removeFromItem, closeModal }: ICartItemProps) => {
  const [toggles, setToggles] = useState<boolean[]>(() =>
    cart.map(() => false)
  );
  const componentRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>(() => cart.map(() => 1));

  useEffect(() => {
    setCounts(cart.map(() => 1));
  }, [cart]);

  const toggleHandler = (index: number) => {
    setToggles((prevToggles) =>
      prevToggles.map((toggle, i) => (i === index ? !toggle : toggle))
    );
  };

  const prevCountsLengthRef = useRef<number>(counts.length);

  useEffect(() => {
    if (prevCountsLengthRef.current > counts.length) {
      setToggles((prevToggles) => prevToggles.map(() => false));
    }
    prevCountsLengthRef.current = counts.length;
  }, [counts, setToggles]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !componentRef.current ||
        !componentRef.current.contains(event.target as Node)
      ) {
        setToggles((prevToggles) => prevToggles.map(() => false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const Increase = (index: number) => {
    setCounts(counts.map((count, i) => (i === index ? count + 1 : count)));
  };

  const Decrease = (index: number) => {
    setCounts(
      counts.map((count, i) => (i === index ? Math.max(1, count - 1) : count))
    );
  };


  return (
    <>
      <div className="overflow-y-scroll w-full p-6">
        <ul className="flex flex-col">
          {cart.map((product, index) => (
            <li className="item flex flex-col relative " key={index}>
              <div className="flex flex-row w-full justify-between">
                <div className="flex">
                  <div className="flex flex-row items-center justify-center h-24 mr-4 cursor-pointer">
                    <img
                      className="w-full h-full min-w-20 object-contain"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div className="mb-2 text-sm text-black text-left h-auto">
                    <a
                      href="#"
                      className="text-black hover:text-red-400 hover:underline"
                    >
                      {product.description}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => toggleHandler(index)}
                  className="flex flex-row items-center justify-center min-w-10 h-10 border-none p-0 bg-transparent hover:text-red-400 transition-colors duration-300"
                >
                  <Elvert className="w-6 h-6" />
                </button>
                {toggles[index] && (
                  <div
                    onClick={() => removeFromItem(product.id)}
                    ref={componentRef}
                    className="absolute z-10 right-0 top-0 w-60 pt-2 pb-2 pl-4 pr-4 bg-white shadow-md cursor-pointer remove"
                  >
                    <div className="flex gap-3 text-blue-800 h-10 items-center transition-colors duration-300">
                      <Trash2 />
                      <span>Remove</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-row justify-end w-full">
                <div className="flex flex-row items-start">
                  <button
                    className={`bg-transparent flex flex-row items-center justify-center w-10 h-10 ${
                      counts[index] > 1
                        ? "text-blue-700 cursor-pointer"
                        : "text-labelCol cursor-default"
                    }`}
                  >
                    <Minus
                      onClick={() => Decrease(index)}
                      className="w-6 h-6"
                    />
                  </button>
                  <input
                    type="number"
                    value={counts[index]}
                    onChange={(e) =>
                      setCounts(
                        counts.map((count, i) =>
                          i === index
                            ? Math.max(1, Number(e.target.value))
                            : count
                        )
                      )
                    }
                    className="w-14 ml-1 mr-4 text-center h-10 pl-3 pr-3 no-spin"
                  />
                  <button className="bg-transparent flex flex-row items-center justify-center w-10 h-10 text-blue-700 cursor-default">
                    <Plus
                      onClick={() => Increase(index)}
                      className="w-6 h-6 cursor-pointer"
                    />
                  </button>
                </div>
                <div className="w-1/4">
                  <span className="mt-1 inline-block">{product.price}₴</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="sticky bottom-bot-20 max-md:flex-col-reverse max-md:gap-2  flex flex-row items-center pt-4 pb-4 bg-white justify-between">
          <button onClick={closeModal} className="bg-gray-100 text-blue-500 max-md:w-full w-auto h-10 text-sm pl-4 pr-4 rounded-lg hover:text-blue-400 transition-colors duration-300">
            Continue shopping
          </button>
          <div className="flex flex-row max-md:gap-2 max-md:py-2 max-md:px-4 w-auto max-md:flex-col max-md:justify-between max-md:w-full p-6 items-center bg-slate-200 border border-green-500 rounded-borderFourth">
            <div className="mr-6 text-2xl max-md:w-full">
              <span>
                {cart
                  .reduce(
                    (total, product, index) =>
                      total + product.price * counts[index],
                    0
                  )
                  .toFixed(2)}
                ₴
              </span>
            </div>
            <a
              href="#"
              className="text-white max-md:w-full w-auto hover:text-white hover:bg-green-500 transition-colors duration-300 bg-green-600 text-lg h-12 flex items-center justify-center pl-4 pr-4 rounded-md"
            >
              Checkout order
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
