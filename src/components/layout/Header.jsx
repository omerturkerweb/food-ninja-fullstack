import { BsFillBasketFill, BsLightbulb } from "react-icons/bs";
import { Avatar, FormControl, MenuItem, Select } from "@mui/material";
import { useContext } from "react";
import GetAvatarName from "../../helpers/GetAvatarName";
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillLinkedin,
} from "react-icons/ai";
import { GlobalContext } from "../../context/GlobalContext";

export default function Header() {
  const socialIcons = [
    {
      icon: AiFillLinkedin,
      href: "https://www.linkedin.com/in/%C3%B6mer-t%C3%BCrker-44a28124b/",
    },
    {
      icon: AiFillGithub,
      href: "https://github.com/omerturkerweb",
    },
    {
      icon: AiFillInstagram,
      href: "https://www.instagram.com/omerturker.dev/",
    },
    {
      icon: AiFillTwitterCircle,
      href: "https://twitter.com/omerturkerweb",
    },
  ];
  const handleChange = (event) => {
    setLanguage(event.target.value);
  };
  const {
    language,
    setLanguage,
    setLoginModal,
    setRegisterModal,
    user,
    userData,
  } = useContext(GlobalContext);

  return (
    <header className="px-[15%]">
      <div className="header-main py-1 pl-[0.7%] flex justify-between items-center border-bottom-black mb-2">
        <div className="header-socials flex gap-x-1">
          {socialIcons.map((item, index) => {
            const Icon = item.icon;
            return (
              <a key={index} target="_blank" href={item.href}>
                <Icon
                  key={index}
                  size={18}
                  className="header-social-icon select-none rounded-full transition-all duration-300 hover:bg-[var(--header-social-hover)]"
                ></Icon>
              </a>
            );
          })}
        </div>
        <div className="header-report">
          <span className="font-light text-xs">
            any feedback?{" "}
            <a href="mailto:omerturkerweb@gmail.com" className="underline">
              contact me
            </a>
            .
          </span>
        </div>
      </div>
      <nav className="header-menu flex justify-between items-center pb-2 border-bottom-black">
        <FormControl className="flex" sx={{ m: 1, minWidth: 150, height: 60 }}>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={language}
            onChange={handleChange}
          >
            <MenuItem className="flex gap-x-1" value={"en"}>
              {" "}
              <span className="flex items-center gap-x-2">
                <img src={`https://flagcdn.com/w20/us.png`}></img>English
              </span>
            </MenuItem>
            <MenuItem className="flex gap-x-1" value={"tr"}>
              {" "}
              <span className="flex items-center gap-x-2">
                <img src={`https://flagcdn.com/w20/tr.png`}></img>Turkish
              </span>
            </MenuItem>
          </Select>
        </FormControl>
        <div className="header-brand-logo">
          <img width="100px" src={require("../../images/logo.png")}></img>
        </div>
        <nav className="flex items-center gap-x-2">
          {userData.user_id ? (
            <span className="user-avatar p-2 rounded-md cursor-pointer bg-[var(--header-top-green)] text-2xl font-[600]">
              {GetAvatarName(userData.user_name, userData.user_surname)}
            </span>
          ) : (
            <>
              <a
                onClick={() => setLoginModal(true)}
                href="#"
                className="font-[500]"
              >
                Login
              </a>
              <a
                onClick={() => setRegisterModal(true)}
                href="#"
                className="font-[500]"
              >
                Sign Up
              </a>
            </>
          )}

          <div className="header-basket transition-all duration-300 hover:bg-[var(--header-basket-button-hover)] bg-[var(--header-basket-button)] rounded-md p-3 flex items-center justify-center gap-x-1 text-white cursor-pointer">
            <BsFillBasketFill />
            <span>0</span>
            <p>items</p>
          </div>
          <button>
            <BsLightbulb />
          </button>
        </nav>
      </nav>
    </header>
  );
}
