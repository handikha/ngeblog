import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { forgotPassword } from "../../store/slices/auth/slices";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef("");

  const { isForgotPasswordLoading } = useSelector((state) => {
    return { isForgotPasswordLoading: state.auth.isForgotPasswordLoading };
  });

  const { id } = useSelector((state) => {
    return {
      id: state.auth.id,
    };
  });

  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      dispatch(forgotPassword({ email: emailRef.current?.value }));
      setIsEmailSent(true);
    }
  };

  const onButtonSubmit = () => {
    if (emailRef.current?.value !== "") {
      dispatch(forgotPassword({ email: emailRef.current?.value }));
      setIsEmailSent(true);
    }
  };

  if (id) {
    return <Navigate to="/" replace />;
  }

  const renderContent = () => {
    if (isForgotPasswordLoading) {
      return <div className="text-sm text-dark">Sending email...</div>;
    } else if (isEmailSent) {
      emailRef.current.value = "";

      return (
        <div className="text-sm text-dark">
          <p className="">Email sent!</p>
          <p className="mt-2"> Check your email to reset your password.</p>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-light font-poppins">
      <div className="flex h-2/3 w-1/4 rounded-xl shadow-md">
        <div className="flex w-full flex-col items-center justify-center bg-lighter px-6 py-8">
          <h3 className="mb-4 text-center text-xl font-semibold text-dark">
            Forgot Password
          </h3>
          <form className="w-full text-sm">
            <div className="relative w-full">
              <input
                ref={emailRef}
                required
                type="text"
                className="mt-4 bg-lighter"
                id="email"
                autoFocus
                onKeyDown={handleKeyDown}
              />
              <label htmlFor="email" className="placeholder">
                Email
              </label>
            </div>
            <Button
              title="Send Email"
              className="mt-4 w-full select-none shadow-md"
              isPrimary
              isButton
              onClick={onButtonSubmit}
              isLoading={isForgotPasswordLoading}
              isDisabled={isForgotPasswordLoading}
            />
          </form>
          <div className="mt-4 text-center">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
