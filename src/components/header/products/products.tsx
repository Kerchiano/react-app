import { ShoppingCart as CartIcon, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { IProduct } from "../../../hooks/cart";

interface IAddToCart {
  addToCart: (product: IProduct) => void;
  isProductAdded: (productId: number) => boolean;
}

const ProductCard = ({ addToCart, isProductAdded }: IAddToCart) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://663f8690e3a7c3218a4d4d82.mockapi.io/api/v1/products"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (product: IProduct) => {
    addToCart(product);
  };

  return (
    <>
      <div className="blockProducts">
        <ul className="flex flex-wrap justify-left m-auto xl:mr-10 xl:ml-10 mt-20">
          {products.map((product: IProduct) => (
            <li className="xl:w-1/5 lg:w-1/3 md:w-1/3 sm:w-1/2 xs:w-1/2 x-zero:w-full text-white p-0 pr-1px pl-1px itemProduct" key={product.id}>
              <div className="h-52 bg-white p-2">
                <img
                  className="h-full w-full object-contain"
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <div className="pl-4 pr-4 relative border pt-4">
                <h2 className="mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                  {product.name}
                </h2>
                <div className="flex justify-between items-center mb-3">
                  <span>$ {product.price}</span>
                  <div
                    onClick={() => handleAddToCart(product)}
                    className="transition-all duration-300 rounded cursor-pointer w-8 h-8 hover:bg-slate-500 flex justify-center items-center"
                  >
                    {isProductAdded(product.id) ? (
                      <div className="relative">
                        <div className="rounded-borderCircle bg-green-500 w-4 h-4 absolute top-0 left-3">
                          <Check className="text-white w-4 h-4" />
                        </div>
                        <CartIcon className="text-green-500" />
                      </div>
                    ) : (
                      <CartIcon />
                    )}
                  </div>
                </div>
                <p className="dsc">{product.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProductCard;
