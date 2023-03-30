import { useContext } from "react";
import Slider from "react-slick";
import { GlobalContext } from "../../context/GlobalContext";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";

export default function CategorySlider() {
  const { categories, activeCategory, setActiveCategory } =
    useContext(GlobalContext);
  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <GrFormNextLink
        className="categories-icon categories-next-icon"
        size={30}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <GrFormPreviousLink
        className="categories-icon  categories-prev-icon"
        size={30}
        onClick={onClick}
      />
    );
  }
  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="category-slider-main px-[15%]">
      <Slider {...settings}>
        {categories.map((category, index) => {
          return (
            <div
              onClick={() => setActiveCategory(category.tag)}
              key={index}
              className={
                activeCategory === category.tag
                  ? "category active-category !flex !flex-col !items-center !justify-center"
                  : "category !flex !flex-col !items-center !justify-center"
              }
            >
              <img
                alt={category.title}
                className="w-[40px]"
                src={category.img}
              ></img>
              <span>{category.title}</span>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
