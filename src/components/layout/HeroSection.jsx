import Slider from "react-slick";

import { AiOutlineSearch } from "react-icons/ai";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export default function HeroSection() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };
  const { heroImages } = useContext(GlobalContext);

  return (
    <div className="hero-section-main my-2 px-[15%] relative">
      <Slider {...settings}>
        {heroImages.map((image, index) => {
          return (
            <div key={index} className="slide relative">
              <div className="slide-img">
                <img
                  alt={`product-slide-${index}`}
                  key={index}
                  className="h-[500px] w-full rounded-md"
                  src={image.image}
                ></img>
              </div>

              <div className="slide-description absolute top-[50px]">
                <h3 className="text-[var(--white)] font-[900] text-[50px] mx-3 pr-[30%]">
                  {image.text}
                </h3>
              </div>
            </div>
          );
        })}
      </Slider>
      <div className="slide-actions  absolute bottom-[12%] left-[16%] flex flex-col items-center">
        <div className="slide-search flex items-center">
          <input
            className="search-input"
            placeholder="search to find delicious meals one after another!"
            type="text"
          ></input>
          <span className="search-input-search-icon">
            <AiOutlineSearch color="white" />
          </span>
        </div>
        <div className="or text-[var(--white)] my-6 font-[600]">or</div>
        <div className="discover-foods">
          <button className="slider-discover-button">
            Discover all our flavors!
          </button>
        </div>
      </div>
    </div>
  );
}
