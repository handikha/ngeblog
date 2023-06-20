import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../components/Button";
import { register } from "../../store/slices/auth/slices";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

export default function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onButtonRegister = () => {
    dispatch(
      register({
        username: usernameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        rePassword: rePasswordRef.current?.value,
      })
    );
  };

  const { id } = useSelector((state) => {
    return {
      id: state.auth?.id,
    };
  });

  useEffect(() => {
    document.title = "Ngeblog - Register";
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const handleShowPassword = (type) => {
    if (type === "password") {
      setShowPassword(!showPassword);
      return;
    }

    setShowRePassword(!showRePassword);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // onButtonLogin();
    }
  };

  if (id) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen w-full items-center justify-center  bg-light font-poppins">
      <div className="flex h-2/3 w-1/2 rounded-xl">
        <div className="relative w-full overflow-hidden  bg-primary">
          <img src="https://source.unsplash.com/400x600?blog" alt="" />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-6 text-white">
            <h3 className="text-2xl font-medium">Welcome!</h3>
            <p className="mt-4 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
              laboriosam.
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center bg-lighter px-6 py-8 shadow-md">
          <h3 className="mb-4 text-center text-xl font-semibold text-dark">
            Register
          </h3>
          <form action="" className="w-full text-sm">
            <div className="relative w-full">
              <input
                ref={usernameRef}
                required
                type="text"
                className="mt-4 bg-lighter"
                id="username"
              />
              <label htmlFor="username" className="placeholder">
                Username
              </label>
            </div>

            <div className="relative w-full">
              <input
                ref={emailRef}
                required
                type="email"
                className="mt-4 bg-lighter"
                id="email"
              />
              <label htmlFor="email" className="placeholder">
                Email
              </label>
            </div>

            <div className="relative">
              <input
                ref={passwordRef}
                required
                type={showPassword ? "text" : "password"}
                className="mt-4 bg-lighter"
                id="password"
              />
              <label htmlFor="password" className="placeholder">
                Password
              </label>
              <span
                className={`absolute right-1 top-[18px] cursor-pointer p-2 text-lg ${
                  showPassword ? "text-primary" : "text-light-gray"
                } `}
                onClick={() => handleShowPassword("password")}
              >
                {showPassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
              </span>

              <div className="message">
                <ul>
                  <li>asdasd</li>
                  <li>asdasd</li>
                  <li>asdasd</li>
                  <li>asdasd</li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <input
                ref={rePasswordRef}
                required
                type={showRePassword ? "text" : "password"}
                className="mt-4 bg-lighter"
                id="rePassword"
              />
              <label htmlFor="rePassword" className="placeholder">
                Re-Password
              </label>
              <span
                className={`absolute right-1 top-[18px] cursor-pointer p-2 text-lg ${
                  showRePassword ? "text-primary" : "text-light-gray"
                } `}
                onClick={() => handleShowPassword("rePassword")}
                onKeyDown={handleKeyDown}
              >
                {showRePassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
              </span>
            </div>

            <Button
              title="Register"
              className="mt-4 w-full shadow-md"
              isPrimary
              isButton
              type="submit"
              onClick={onButtonRegister}
            />
          </form>
          <p className="mt-4 text-center text-sm text-gray">
            Already have an account?
            <Button
              type="button"
              title="Login"
              // path="/login"
              onClick={() => navigate("/login")}
              className="ml-2  font-medium text-primary hover:underline"
            />
          </p>

          <Button
            type="link"
            path="/"
            title="Back to Ngeblog."
            className="mt-4 text-xs text-gray hover:text-primary hover:underline"
          />
        </div>
      </div>
    </div>
  );
}
