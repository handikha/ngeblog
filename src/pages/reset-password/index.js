import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import {
  HiCheckCircle,
  HiOutlineEye,
  HiOutlineEyeSlash,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../store/slices/auth/slices";
import { Formik } from "formik";
import { resetPasswordValidationSchema } from "../../store/slices/auth/validation";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();

  const formikRef = useRef();

  const { id, loading, error, success } = useSelector((state) => {
    return {
      id: state.auth.id,
      loading: state.auth.isResetPasswordLoading,
      error: state.auth.error,
      success: state.auth.success,
    };
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onResetPassword = () => {
    if (formikRef.current) {
      const values = formikRef.current.values;
      dispatch(
        resetPassword({
          data: values,
          token,
        })
      );
    }
  };

  if (id) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen w-full items-center justify-center  bg-light font-poppins">
      <div className="flex h-2/3 w-1/4 rounded-xl shadow-md">
        <div className="flex w-full flex-col items-center justify-center bg-lighter px-6 py-8">
          <h3 className="mb-4 text-center text-xl font-semibold text-dark">
            Reset Password
          </h3>
          <Formik
            innerRef={formikRef}
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            validationSchema={resetPasswordValidationSchema}
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
              <form className="w-full text-sm">
                {success ? (
                  <>
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-3xl text-primary">
                        <HiCheckCircle />
                      </span>
                      <p className="">Password changed!</p>
                      <p className="mt-2">Please login</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative w-full">
                      <input
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="password"
                        required
                        type={showPassword ? "text" : "password"}
                        className="mt-4 bg-lighter"
                        id="password"
                        autoFocus
                      />
                      <label htmlFor="password" className="placeholder">
                        New Pasword
                      </label>
                      <span
                        className={`absolute right-1 top-[18px] cursor-pointer p-2 text-lg ${
                          showPassword ? "text-primary" : "text-light-gray"
                        } `}
                        onClick={handleShowPassword}
                      >
                        {showPassword ? (
                          <HiOutlineEye />
                        ) : (
                          <HiOutlineEyeSlash />
                        )}
                      </span>
                      {errors.password && (
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
                        name="confirmPassword"
                        required
                        type={showPassword ? "text" : "password"}
                        className="mt-4 bg-lighter"
                        id="confirmPassword"
                      />
                      <label htmlFor="confirmPassword" className="placeholder">
                        Re-New Password
                      </label>
                      <span
                        className={`absolute right-1 top-[18px] cursor-pointer p-2 text-lg ${
                          showPassword ? "text-primary" : "text-light-gray"
                        } `}
                        onClick={handleShowPassword}
                      >
                        {showPassword ? (
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
                  </>
                )}
                {success ? (
                  <Button
                    title="Login"
                    className=" mt-4 w-full select-none shadow-md"
                    isPrimary
                    isButton
                    type="button"
                    onClick={() => navigate("/login")}
                    isLoading={loading}
                    isDisabled={isSubmitting || loading}
                  />
                ) : (
                  <Button
                    title="Reset Password"
                    className=" mt-4 w-full select-none shadow-md"
                    isPrimary
                    isButton
                    type="button"
                    onClick={onResetPassword}
                    isLoading={loading}
                    isDisabled={isSubmitting || loading}
                  />
                )}
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
