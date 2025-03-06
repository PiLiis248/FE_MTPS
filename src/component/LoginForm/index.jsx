// export default LoginForm;

import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { useAuthContext } from "../../context/AuthContext";
import { MESSAGE } from "../../utils/validate";
import Button from "../Button";
import { Input } from "../Input";


const LoginForm = () => {
const { handleLogin } = useAuthContext();
const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 

  const onSubmit = async (data) => {
    try {
      
      const loginData = await handleLogin(data);
      if (!loginData) {
        navigate ("/home")
      }
    
    } catch (error) {
      console.error("Login error:", error);
      // Handle login errors here
    }
  };

  return (
    <div className="loginpage__wrapper">
      <div className="loginpage__wrapper-form">
        <div className="logo">
          <img src="/public/assets/images/dn_ava.png" alt="" />
        </div>
        <div className="textbox">
          <h1 className="title">Manage Training Point System</h1>
        </div>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="email"
            placeholder="User email"
            image="/assets/images/user-login.svg"
            {...register("email", { required: MESSAGE.required })}
            error={errors?.email?.message || ""}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            image="/assets/images/pass-login.svg"
            {...register("password", { required: MESSAGE.required })}
            error={errors?.password?.message || ""}
          />
          <div className="btn">
            <Button type="submit" className="btn-text">
              Log in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

