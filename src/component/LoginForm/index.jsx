// import React from "react";
// import Button from "../Button";
// import { Input } from "../Input";
// import { MESSAGE } from "../../utils/validate";
// import { useForm } from "react-hook-form";
// const LoginForm = () => {
//   //   const { handleLogin } = useAuthContext();
//   //   const [loginData, setLoginData] = useState({
//   //     name: "",
//   //     password: "",
//   //   });
//   //   const navigate = useNavigate();
//   //   const {
//   //     register,
//   //     handleSubmit,
//   //     formState: { errors },
//   //   } = useForm();
//   //   const onSubmit = async (data) => {
//   //     try {
//   //       const loginData = await handleLogin(data);
//   //       if (!!loginData) {
//   //         navigate(PATHS.HOME);
//   //       }
//   //     } catch (error) {
//   //       console.log("Login error:", error);
//   //     }
//   //   };
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   return (
//     <div className="loginpage__wrapper">
//       <div className="loginpage__wrapper-form">
//         <div className="logo">
//           <img src="/public/assets/images/dn_ava.png" alt="" />
//         </div>
//         <div className="textbox">
//           <h1 className="title">Manage Traning Point System</h1>
//         </div>
//         <form className="form" method="post">
//           <Input
//             name="id"
//             placeholder="Student ID"
//             image="/assets/images/user-login.svg"
//             {...register("id", {
//               required: MESSAGE.required,
//             })}
//             error={errors?.name?.message || ""}
//           />
//           <Input
//             type="password"
//             name="password"
//             placeholder="Password"
//             image="/assets/images/pass-login.svg"
//             {...register("password", {
//               required: MESSAGE.required,
//             })}
//             error={errors?.password?.message || ""}
//           />
//           <div className="btn">
//             <Button type="submit" className="btn-text">
//               <span>Log in</span>
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;


// import React from "react";
// import Button from "../Button";
// import { Input } from "../Input";
// import { MESSAGE } from "../../utils/validate";
// import { useForm } from "react-hook-form";
// import authService from "../../services/authService"; // Import the login function

// const LoginForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const { id, password } = data; // Destructure id and password from form data
//       const loginData = await authService.login(id, password); // Call login function with id and password
//       console.log("Login successful:", loginData);
//       // Handle successful login (e.g., store token, redirect)
//     } catch (error) {
//       console.error("Login error:", error);
//       // Handle login errors (e.g., display error message to user)
//     }
//   };

//   return (
//     <div className="loginpage__wrapper">
//       <div className="loginpage__wrapper-form">
//         <div className="logo">
//           <img src="/public/assets/images/dn_ava.png" alt="" />
//         </div>
//         <div className="textbox">
//           <h1 className="title">Manage Training Point System</h1>
//         </div>
//         <form className="form" onSubmit={handleSubmit(onSubmit)} method="post">
//           <Input
//             name="id"
//             placeholder="Student ID"
//             image="/assets/images/user-login.svg"
//             {...register("id", {
//               required: MESSAGE.required,
//             })}
//             error={errors?.id?.message || ""}
//           />
//           <Input
//             type="password"
//             name="password"
//             placeholder="Password"
//             image="/assets/images/pass-login.svg"
//             {...register("password", {
//               required: MESSAGE.required,
//             })}
//             error={errors?.password?.message || ""}
//           />
//           <div className="btn">
//             <Button type="submit" className="btn-text">
//               <span>Log in</span>
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

import React from "react";
import Button from "../Button";
import { Input } from "../Input";
import { MESSAGE } from "../../utils/validate";
import { useForm } from "react-hook-form";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { useAuthContext } from "../../context/AuthContext";



const LoginForm = () => {
const { handleLogin } = useAuthContext();
const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const navigate = useNavigate(); // Initialize useNavigate hook

  const onSubmit = async (data) => {
    try {
      
      const loginData = await handleLogin(data);
      if (!!loginData) {
        navigate ("/home")
      }
      // console.log("Login successful:", loginData);
      // Assuming login is successful and you've handled token storage etc.
      // navigate("/"); // Redirect to homepage
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

