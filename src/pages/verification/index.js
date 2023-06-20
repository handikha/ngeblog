import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyAccount } from "../../store/slices/auth/slices";
import Button from "../../components/Button";

export default function Verificaion() {
  const dispatch = useDispatch();
  const { isRegisterLoading, isVerified } = useSelector((state) => {
    return {
      isRegisterLoading: state.auth.isRegisterLoading,
      isVerified: state.auth.isVerified,
    };
  });

  useEffect(() => {
    dispatch(verifyAccount());
  }, []);

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

  return <div></div>;
}
