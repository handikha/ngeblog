import React, { useEffect } from "react";
import Button from "../../components/Button";

export default function NotFound() {
  useEffect(() => {
    document.title = "Not Found";
  }, []);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
      <h3 className="mb-4 text-dark">Oops, looks like you got lost.</h3>
      <Button
        isButton
        isPrimary
        title="Back to Ngeblog."
        type="link"
        path="/"
      />
      <p className="text-sm text-gray">or</p>
      <Button
        type="link"
        path="/register"
        title="Register"
        className="text-sm font-medium text-gray hover:text-primary hover:underline"
      />
    </div>
  );
}
