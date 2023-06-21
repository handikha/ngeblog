import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../components/Button";
import { register } from "../../store/slices/auth/slices";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { Formik } from "formik";
import { registerValidationSchema } from "../../store/slices/auth/validation";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isRegisterLoading, id, isVerfied } = useSelector((state) => {
    return {
      isRegisterLoading: state.auth.isRegisterLoading,
      id: state.auth.id,
      isVerfied: state.auth.isVerfied,
    };
  });

  useEffect(() => {
    document.title = "Ngeblog - Register";
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = (type) => {
    if (type === "password") {
      setShowPassword(!showPassword);
      return;
    }

    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // onButtonLogin();
    }
  };

  if (id && isVerfied) {
    return <Navigate to="/" replace />;
  }

  if (id && !isVerfied) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
        <h3 className="text-dark">Register Success!</h3>
        <p className="text-dark">
          Please check your email to verify your account
        </p>
        <Button
          title="Go To Ngeblog."
          isButton
          isPrimary
          type="link"
          path="/"
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full items-center justify-center  bg-light font-poppins">
      <div className="flex h-3/4 w-1/2 rounded-xl">
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
          <Formik
            initialValues={{
              username: "",
              email: "",
              phone: "",
              password: "",
              confirmPassword: "",
            }}
            validate={(values) => {
              try {
                registerValidationSchema.validateSync(values);
                return {};
              } catch (error) {
                return { message: error?.message };
              }
            }}
            validationSchema={registerValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(register(values));
              setSubmitting(false);
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              isSubmitting,
              errors,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit} className="w-full text-sm">
                <div className="relative w-full">
                  <input
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    type="text"
                    className="mt-4 bg-lighter"
                    id="username"
                    name="username"
                    autoFocus
                  />
                  <label htmlFor="username" className="placeholder">
                    Username
                  </label>
                </div>

                <div className="relative w-full">
                  <input
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    type="text"
                    className="mt-4 bg-lighter"
                    id="email"
                    name="email"
                  />
                  <label htmlFor="email" className="placeholder">
                    Email
                  </label>
                </div>

                <div className="relative w-full">
                  <input
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    type="text"
                    className="mt-4 bg-lighter"
                    id="phone"
                    name="phone"
                  />
                  <label htmlFor="phone" className="placeholder">
                    Phone
                  </label>
                </div>

                <div className="relative">
                  <input
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    type={showPassword ? "text" : "password"}
                    className="mt-4 bg-lighter"
                    id="password"
                    name="password"
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

                  {values.password && errors.password && (
                    <div className="message">
                      <ul className="mb-2 mt-2 text-xs">
                        <li
                          className={`${
                            values.password && values.password.length >= 6
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          Must be at least 6 characters.
                        </li>
                        <li
                          className={`${
                            values.password && /[a-z]/.test(values.password)
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          Must contain at least one lowercase letter.
                        </li>
                        <li
                          className={`${
                            values.password && /[A-Z]/.test(values.password)
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          Must contain at least one uppercase letter.
                        </li>
                        <li
                          className={`${
                            values.password && /[0-9]/.test(values.password)
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          Must contain at least one digit.
                        </li>
                        <li
                          className={`${
                            values.password &&
                            /[^a-zA-Z0-9]/.test(values.password)
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          Must contain at least one special character.
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <input
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    className="mt-4 bg-lighter"
                    id="confirmPassword"
                    name="confirmPassword"
                  />
                  <label htmlFor="confirmPassword" className="placeholder">
                    Re-Password
                  </label>
                  <span
                    className={`absolute right-1 top-[18px] cursor-pointer p-2 text-lg ${
                      showConfirmPassword ? "text-primary" : "text-light-gray"
                    } `}
                    onClick={() => handleShowPassword("confirmPassword")}
                    onKeyDown={handleKeyDown}
                  >
                    {showConfirmPassword ? (
                      <HiOutlineEye />
                    ) : (
                      <HiOutlineEyeSlash />
                    )}
                  </span>
                </div>
                {errors.confirmPassword ? (
                  <div className="mt-1 h-4  pl-5 text-xs text-red-500">
                    Passwords do not match
                  </div>
                ) : (
                  <div className="mt-1 h-4  pl-5 text-xs text-red-500"></div>
                )}

                <Button
                  title="Register"
                  className="mt-4 w-full shadow-md"
                  isPrimary
                  isButton
                  type="submit"
                  isDisabled={isRegisterLoading || !values}
                  isLoading={isRegisterLoading}
                />

                {errors}
              </form>
            )}
          </Formik>

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
