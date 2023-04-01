import { useContext, useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { GlobalContext } from "../../context/GlobalContext";
export default function Basket() {
  const { basket, setBasket, basketShow, setBasketShow } =
    useContext(GlobalContext);

  useEffect(() => {
    if (basketShow) {
      document.querySelector(".basket-main").classList.remove("hidden");
    } else {
      document.querySelector(".basket-main").classList.add("hidden");
    }
  }, [basketShow]);
  const removeBasketItemHandler = (itemId) => {
    let currentItem = basket.find((i) => i.productId === itemId);
    if (currentItem.productCount <= 1) {
      setBasket((prevBasket) => [
        ...prevBasket.filter((i) => i.productId !== itemId),
      ]);
    } else {
      currentItem.productCount -= 1;
      setBasket((prevBasket) => [
        ...prevBasket.filter((i) => i.productId !== itemId),
        currentItem,
      ]);
    }
  };
  const calculateTotalBasket = () => {
    if (basket.length === 0) {
      return "0";
    } else {
      const result = basket.reduce(
        (acc, item) => acc + item.productPrice * item.productCount,
        0
      );
      return result;
    }
  };
  return (
    <>
      <div className="basket-main fixed w-[30%] right-0 h-full z-10 basket-background  flex flex-col p-10 gap-y-5">
        <AiOutlineArrowLeft
          onClick={() => {
            setBasketShow(false);
          }}
          size={40}
          className="absolute top-[45%] cursor-pointer -left-5 bg-[var(--white)] rounded-md"
        />
        {basket.length === 0 ? (
          <h3>Basket is empty!</h3>
        ) : (
          basket.map((item) => {
            return (
              <div className="basket-item flex flex-row items-center gap-x-3">
                <img width={100} src={item.productImage}></img>
                <div className="basket-item-title flex gap-x-3">
                  <span>{`${item.productName.slice(0, 10)}...`}</span>
                  <span>${item.productPrice}</span>
                  <span>{item.productCount}</span>
                  <button
                    onClick={() => removeBasketItemHandler(item.productId)}
                    className="py-1 px-2 rounded-sm bg-[var(--white)]"
                  >
                    -
                  </button>
                </div>
              </div>
            );
          })
        )}
        <button className="apply-basket absolute bottom-10 right-40 py-2 px-4 bg-[var(--white)] rounded-md transition-all duration-300 hover:bg-[var(--header-top-green)] hover:border hover:border-white hover:text-white">
          {`apply basket (${calculateTotalBasket()}$)`}
        </button>
      </div>
    </>
  );
}
