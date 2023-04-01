import { GrAdd } from "react-icons/gr";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export default function Products() {
  const {
    user,
    setUser,
    userData,
    setRegisterModal,
    products,
    activeCategory,
    basket,
    setBasket,
    setBasketShow,
  } = useContext(GlobalContext);
  const activeCategoryProducts = products.find(
    (product) => product.tag === activeCategory
  ).products;
  useEffect(() => {
    if (basket.length !== 0) {
      localStorage.setItem("basket", JSON.stringify(basket));
    }
  }, [basket]);
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
                if (userData.user_id === 0) {
                  setRegisterModal(true);
                } else {
                  setBasketShow(true);
                  if (
                    basket.findIndex(
                      (item) => item.productName === product.name
                    ) !== -1
                  ) {
                    let productItem = basket.find(
                      (item) => item.productName === product.name
                    );
                    productItem.productCount += 1;
                    setBasket((prevBasket) => [
                      ...prevBasket.filter(
                        (item) => item.productName !== product.name
                      ),
                      productItem,
                    ]);
                  } else {
                    setBasket((prevBasket) => [
                      ...prevBasket,
                      {
                        productId: product.id,
                        productPrice: product.price,
                        productName: product.name,
                        productImage: product.image_url,
                        productOriginalPrice: product.original_price,
                        productCount: 1,
                      },
                    ]);
                  }
                }
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
