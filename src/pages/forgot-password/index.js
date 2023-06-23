import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { forgotPassword } from "../../store/slices/auth/slices";
import { Formik } from "formik";
import { forgotPasswordVaidationSchema } from "../../store/slices/auth/validation";
import { HiCheckCircle, HiXCircle } from "react-icons/hi2";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef("");

  const { isForgotPasswordLoading, error } = useSelector((state) => {
    return {
      isForgotPasswordLoading: state.auth.isForgotPasswordLoading,
      error: state.auth.error,
    };
  });

  const { id } = useSelector((state) => {
    return {
      id: state.auth.id,
    };
  });

  const [isEmailSent, setIsEmailSent] = useState(false);

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     event.preventDefault();
  //     dispatch(forgotPassword({ email: emailRef.current?.value }));
  //     setIsEmailSent(true);
  //   }
  // };

  // const onButtonSubmit = () => {
  //   if (emailRef.current?.value !== "") {
  //     dispatch(forgotPassword({ email: emailRef.current?.value }));
  //     setIsEmailSent(true);
  //   }
  // };

  if (id) {
    return <Navigate to="/" replace />;
  }

  const renderContent = () => {
    if (isForgotPasswordLoading) {
      return <div className="text-sm text-dark">Sending email...</div>;
    }

    if (error && !isForgotPasswordLoading) {
      return (
        <div className="flex flex-col items-center justify-center">
          <span className="text-3xl text-red-400">
            <HiXCircle />
          </span>
          <p className="text-sm">{error}</p>
          {/* <p className="mt-2"> Check your email to reset your password.</p> */}
        </div>
      );
    }

    if (isEmailSent && !isForgotPasswordLoading && !error) {
      return (
        <>
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl text-primary">
              <HiCheckCircle />
            </span>
            <p className="">Email sent!</p>
            <p className="mt-2"> Check your email to reset your password.</p>
          </div>
        </>
      );
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-light font-poppins">
      <div className="flex h-2/3 w-1/4 rounded-xl shadow-md">
        <div className="flex w-full flex-col items-center justify-center bg-lighter px-6 py-8">
          <h3 className="mb-4 text-center text-xl font-semibold text-dark">
            Forgot Password
          </h3>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={forgotPasswordVaidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setIsEmailSent(true);
              dispatch(forgotPassword(values));
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
            }) => (
              <form onSubmit={handleSubmit} className="w-full text-sm">
                <div className="relative w-full">
                  <input
                    ref={emailRef}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    type="email"
                    className="mt-4 bg-lighter"
                    id="email"
                    name="email"
                    autoFocus
                  />
                  <label htmlFor="email" className="placeholder">
                    Email
                  </label>
                </div>
                <div className="mt-1 h-4 pl-5 text-xs text-red-500">
                  {errors.email}
                </div>
                <Button
                  title="Send Email"
                  type="submit"
                  className="mt-4 w-full select-none shadow-md"
                  isPrimary
                  isButton
                  // onClick={onButtonSubmit}
                  isLoading={isForgotPasswordLoading}
                  isDisabled={isEmailSent && !isForgotPasswordLoading && !error}
                />
              </form>
            )}
          </Formik>

          <div className="mt-4 text-center">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
