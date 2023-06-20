import React from "react";
import Spinner from "../../components/spinner";

export default function HomeLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner/>
    </div>
  );
}
