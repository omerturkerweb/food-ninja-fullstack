import { Modal } from "@mui/material";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export default function Register() {
  const postRequestRegister = () => {
    const formData = new FormData();
    formData.append("action", "add-user");
    const userData = {
      name: user.name,
      surname: user.surname,
      password: user.password,
      email: user.mail,
    };
    for (let key in userData) {
      formData.append(key, userData[key]);
    }
    fetch("http://localhost/foodninja/index.php", {
      method: "POST",
      /* headers: {
        "Content-Type": "application/json",
      }, */ //cors error ???
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "30px 40px",
    borderRadius: "7px",
  };
  const { setUser, user, registerModal, setLoginModal, setRegisterModal } =
    useContext(GlobalContext);
  const registerFormSubmitHandle = (e) => {
    e.preventDefault();
    if (
      user.name !== "" &&
      user.surname !== "" &&
      user.password === user.passwordAgain &&
      user.mail !== ""
    ) {
      setRegisterModal(false);
      postRequestRegister();
    } else {
      alert("Please be sure filled all of the input correct !");
    }
  };
  return (
    <Modal open={registerModal} onClose={() => setRegisterModal(false)}>
      <div className=" outline-none" style={style}>
        <h3 className="text-[var(--header-basket-button-hover)]">
          Sign up{" "}
          <span
            onClick={() => {
              setRegisterModal(false);
              setLoginModal(true);
            }}
            className="text-gray-400 cursor-pointer text-xs hover:underline"
          >
            already have an account?
          </span>
        </h3>
        <hr className="my-3"></hr>
        <form className="flex flex-col items-start justify-center gap-y-3">
          <label className="flex flex-col justify-center items-start">
            <span>Name</span>
            <input
              onChange={(e) =>
                setUser(() => {
                  return { ...user, name: e.target.value };
                })
              }
              value={user.name}
              required
              className="input-name border border-gray-400 py-1 px-4 rounded-sm placeholder:text-sm"
              type="text"
              placeholder="enter your name"
            ></input>
          </label>
          <label className="flex flex-col justify-center items-start">
            <span>Surname</span>
            <input
              onChange={(e) =>
                setUser(() => {
                  return { ...user, surname: e.target.value };
                })
              }
              required
              className="input-surname border border-gray-400 py-1 px-4 rounded-sm placeholder:text-sm"
              type="text"
              placeholder="enter your lastname"
            ></input>
          </label>
          <label className="flex flex-col justify-center items-start">
            <span>Password</span>
            <input
              onChange={(e) =>
                setUser(() => {
                  return { ...user, password: e.target.value };
                })
              }
              required
              className="input-password border border-gray-400 py-1 px-4 rounded-sm placeholder:text-sm"
              type="password"
              placeholder="enter your password"
            ></input>
          </label>
          <label className="flex flex-col justify-center items-start">
            <span>Password Match</span>
            <input
              onChange={(e) =>
                setUser(() => {
                  return { ...user, passwordAgain: e.target.value };
                })
              }
              required
              className=" input-password-again border border-gray-400 py-1 px-4 rounded-sm placeholder:text-sm"
              type="password"
              placeholder="enter your password again"
            ></input>
          </label>
          <label className="flex flex-col justify-center items-start">
            <span>E-mail</span>
            <input
              onChange={(e) =>
                setUser(() => {
                  return { ...user, mail: e.target.value };
                })
              }
              required
              className=" input-mail border border-gray-400 py-1 px-4 rounded-sm placeholder:text-sm"
              type="email"
              placeholder="enter your email address"
            ></input>
          </label>
          <button
            className="p-4 bg-[var(--header-basket-button)] transition-all duration-300 hover:bg-[var(--header-basket-button-hover)] text-[var(--white)] rounded-md"
            type="submit"
            onClick={(e) => registerFormSubmitHandle(e)}
          >
            Register
          </button>
        </form>
      </div>
    </Modal>
  );
}
