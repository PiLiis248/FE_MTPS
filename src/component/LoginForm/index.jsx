import React from "react";
import Button from "../Button";
import { Input } from "../Input";
import { MESSAGE } from "../../utils/validate";
import { useForm } from "react-hook-form";
const LoginForm = () => {
  //   const { handleLogin } = useAuthContext();
  //   const [loginData, setLoginData] = useState({
  //     name: "",
  //     password: "",
  //   });
  //   const navigate = useNavigate();
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm();
  //   const onSubmit = async (data) => {
  //     try {
  //       const loginData = await handleLogin(data);
  //       if (!!loginData) {
  //         navigate(PATHS.HOME);
  //       }
  //     } catch (error) {
  //       console.log("Login error:", error);
  //     }
  //   };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="loginpage__wrapper">
      <div className="loginpage__wrapper-form">
        <div className="logo">
          <img src="/public/assets/images/dn_ava.png" alt="" />
        </div>
        <div className="textbox">
          <h1 className="title">Manage Traning Point System</h1>
        </div>
        <form className="form" method="post">
          <Input
            name="name"
            placeholder="Username"
            image="/assets/images/user-login.svg"
            {...register("name", {
              required: MESSAGE.required,
            })}
            error={errors?.name?.message || ""}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            image="/assets/images/pass-login.svg"
            {...register("password", {
              required: MESSAGE.required,
            })}
            error={errors?.password?.message || ""}
          />
          <div className="btn">
            <Button type="submit" className="btn-text">
              <span>Log in</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
