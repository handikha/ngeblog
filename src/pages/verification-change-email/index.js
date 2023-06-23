import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyAccount } from "../../store/slices/auth/slices";
import Button from "../../components/Button";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

export default function VerificaionChangeEmail() {
  const dispatch = useDispatch();
  const { token } = useParams();
  const { isRegisterLoading, isVerified, error } = useSelector((state) => {
    return {
      isRegisterLoading: state.auth.isRegisterLoading,
      isVerified: state.auth.isVerified,
      error: state.auth.error,
    };
  });

  useEffect(() => {
    localStorage.setItem("token", token);

    dispatch(verifyAccount());
  }, [dispatch, token]);

  if (isRegisterLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        Verifying...
      </div>
    );

  if (isVerified) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
        <p className="text-dark">Verification success!</p>
        <Button
          isButton
          isPrimary
          title="Go To Ngeblog."
          type="link"
          path="/"
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      {error && (
        <>
          <p>{error.name}</p>
          <p>{error.message}</p>
          {/* <Button
            isButton
            isPrimary
            title="Go To Ngeblog."
            type="link"
            className="mt-2"
            onClick={() => {
              <Navigate to="/" replace />;
            }}
          /> */}
          <a
            href="/"
            className="mt-2 rounded-full bg-primary px-6 py-2 text-white hover:bg-primary-hover"
          >
            Go To Ngeblog
          </a>
        </>
      )}
    </div>
  );
}
