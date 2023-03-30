import { GrAdd } from "react-icons/gr";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export default function Products() {
  const { user, setRegisterModal, products, activeCategory } =
    useContext(GlobalContext);
  const activeCategoryProducts = products.find(
    (product) => product.tag === activeCategory
  ).products;

  return (
    <div className="products-main px-[15%] flex flex-row items-center justify-center flex-wrap my-2 gap-x-20 ">
      {activeCategoryProducts.map((product, index) => {
        return (
          <div
            key={product.id}
            className={`${activeCategory}-product-${product.id} relative flex flex-col justify-center items-center gap-y-2 mb-4 product-border shadow-xl transition-all duration-300 hover:shadow-none`}
          >
            <img
              alt={product.name}
              className="product-image h-[220px] rounded-t-md"
              width="250"
              src={product.image_url}
            ></img>
            <div
              onClick={() => {
                setRegisterModal(true);
              }}
              className="add-product absolute top-3 right-3 bg-white p-2 rounded-3xl add-product-icon-shadow"
            >
              <GrAdd color="white" />
            </div>
            <div className="product-prices flex items-center gap-x-2">
              <span className="text-[var(--product-name-green)] font-[500]">
                {`$ ${product.price}`}
              </span>
              <span className="text-[var(--product-original-name-green)] line-through text-sm">
                {" "}
                {`$ ${product.original_price}`}
              </span>
            </div>
            <div className="product-name pb-3">
              <span className="font-[600]">{product.name}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
