import { Alert, AlertTitle, Modal } from "@mui/material";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export default function Login() {
  const {
    loginModal,
    setLoginModal,
    user,
    setUser,
    loginSuccess,
    setLoginSuccess,
    userData,
    setUserData,
  } = useContext(GlobalContext);
  useEffect(() => {
    const loginFailedAlert = document.querySelector(".login-info-failed");
    const loginSuccessAlert = document.querySelector(".login-info-success");
    if (loginSuccess === "success") {
      loginSuccessAlert.classList.toggle("invisible");
      setTimeout(() => {
        loginSuccessAlert.classList.toggle("invisible");
      }, 4000);
    } else if (loginSuccess === "failed") {
      loginFailedAlert.classList.toggle("invisible");
      setTimeout(() => {
        loginFailedAlert.classList.toggle("invisible");
      }, 4000);
    }
  }, [loginSuccess]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "30px 40px",
    borderRadius: "7px",
  };
  const loginHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("action", "user-login");
    formData.append("mail", user.mail);
    formData.append("password", user.password);
    fetch("http://localhost/foodninja/index.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        const loginResult =
          response !== "invalid values" ? "success" : "failed";
        if (loginResult === "success") {
          setLoginModal(false);
          setLoginSuccess("success");
          setUserData(response);
          setUser((user) => ({ ...user, login: true }));
        } else if (loginResult === "failed") {
          setLoginSuccess("failed");
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (userData.user_name !== "") {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);
  return (
    <>
      <Alert
        className="fixed bottom-5 right-5 z-10 invisible login-info-success "
        variant="filled"
        severity="success"
      >
        <AlertTitle>Success</AlertTitle>
        Login success! — <strong>You can start buy some delicious food!</strong>
      </Alert>

      <Alert
        className="fixed bottom-5 right-5 z-50 invisible login-info-failed"
        variant="filled"
        severity="error"
      >
        <AlertTitle>Error</AlertTitle>
        Login Failed ! — <strong>check it out your mail and password!</strong>
      </Alert>

      <Modal open={loginModal} onClose={() => setLoginModal(false)}>
        <div className=" outline-none" style={style}>
          <h3 className="text-[var(--header-basket-button-hover)]">Login</h3>
          <hr className="my-3"></hr>
          <form
            onSubmit={loginHandler}
            className="flex flex-col items-start justify-center gap-y-3"
          >
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
                placeholder="enter your email address"
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

            <button
              className="p-4 bg-[var(--header-basket-button)] transition-all duration-300 hover:bg-[var(--header-basket-button-hover)] text-[var(--white)] rounded-md"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
