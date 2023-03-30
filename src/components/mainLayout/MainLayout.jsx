import Login from "../auth/Login";
import Register from "../auth/Register";
import CategorySlider from "../layout/CategorySlider";
import Header from "../layout/Header";
import HeroSection from "../layout/HeroSection";
import Products from "../layout/Products";

export default function MainLayout() {
  return (
    <>
      <Register />
      <Login />
      <Header />
      <HeroSection />
      <CategorySlider />
      <Products />
    </>
  );
}
