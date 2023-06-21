import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useRef } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../store/slices/auth/slices";
import { Formik } from "formik";
import { loginValidationSchema } from "../../store/slices/auth/validation";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, loading, error } = useSelector((state) => {
    return {
      id: state.auth.id,
      loading: state.auth.isLoginLoading,
      error: state.auth.error,
    };
  });

  // const usernameRef = useRef(null);
  // const passwordRef = useRef(null);

  // const onButtonLogin = async () => {
  //   const username = usernameRef.current?.value;
  //   const password = passwordRef.current?.value;

  //   dispatch(
  //     login({
  //       username: username,
  //       password: password,
  //     })
  //   );
  // };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  useEffect(() => {
    document.title = "Ngeblog - Login";
  }, []);

  if (id) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen w-full items-center justify-center  bg-light font-poppins">
      <div className="flex h-2/3 w-1/2 rounded-xl shadow-md">
        <div className="relative w-full overflow-hidden bg-primary">
          <img src="https://source.unsplash.com/400x600?blog" alt="" />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-6 text-white">
            <h3 className="text-2xl font-medium">Welcome Back!</h3>
            <p className="mt-4 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
              laboriosam.
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center bg-lighter px-6 py-8">
          <h3 className="mb-4 text-center text-xl font-semibold text-dark">
            Login
          </h3>
          <Formik
            initialValues={{ username: "", email: "", phone: "", password: "" }}
            validate={(values) => {
              try {
                loginValidationSchema.validateSync(values);
                return {};
              } catch (error) {
                console.log("error", error?.message);
                return { message: error?.message };
              }
            }}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(login(values));
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
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
                    autoFocus
                  />
                  <label htmlFor="username" className="placeholder">
                    Username
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
                  />
                  <label htmlFor="password" className="placeholder">
                    Password
                  </label>
                  <span
                    className={`absolute right-1 top-[18px] cursor-pointer p-2 text-lg ${
                      showPassword ? "text-primary" : "text-light-gray"
                    } `}
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
                  </span>
                </div>
                <p
                  className="mt-2 h-4  cursor-pointer pl-5 text-xs font-medium text-primary  hover:underline"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </p>
                {error && (
                  <div className="mt-2 pl-5 text-xs text-red-500">
                    {error}
                  </div>
                )}

                <Button
                  title="Login"
                  className=" mt-4 w-full select-none shadow-md"
                  isPrimary
                  isButton
                  type="submit"
                  // onClick={onButtonLogin}
                  isLoading={loading}
                  isDisabled={isSubmitting || loading}
                />
              </form>
            )}
          </Formik>
          {/* <form action="" className="w-full text-sm">
            <div className="relative w-full">
              <input
                ref={usernameRef}
                required
                type="text"
                className="mt-4 bg-lighter"
                id="username"
                autoFocus
              />
              <label htmlFor="username" className="placeholder">
                Username
              </label>
            </div>

            <div className="relative">
              <input
                ref={passwordRef}
                required
                type={showPassword ? "text" : "password"}
                className="mt-4 bg-lighter"
                id="password"
                onKeyDown={handleKeyDown}
              />
              <label htmlFor="password" className="placeholder">
                Password
              </label>
              <span
                className={`absolute right-1 top-[18px] cursor-pointer p-2 text-lg ${
                  showPassword ? "text-primary" : "text-light-gray"
                } `}
                onClick={handleShowPassword}
              >
                {showPassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
              </span>
            </div>
            {error && passwordRef.current?.value !== "" ? (
              <div className="mt-2 h-4  pl-5 text-xs text-red-500">{error}</div>
            ) : (
              <div className="mt-2 h-4"></div>
            )}

            <Button
              title="Login"
              className=" mt-4 w-full select-none shadow-md"
              isPrimary
              isButton
              type="button"
              onClick={onButtonLogin}
              isLoading={loading}
              isDisabled={loading}
            />
          </form> */}

          <p className="mt-4 text-center text-sm text-gray">
            New to <span className="font-semibold">Ngeblog.</span>?
            <Button
              type="button"
              title="Register Now"
              // path="/register"
              onClick={() => navigate("/register")}
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
