import React, { useEffect } from "react";
import Button from "../Button";
import "./index.css";

export default React.memo(function Categories({ data, handleCategory }) {
  return (
    <div className="h-auto w-full rounded-xl bg-lighter p-6 font-poppins  shadow-md">
      <h3 className="categories-title ">Categories</h3>
      <div className="categories-container h-72 divide-y-[1px] divide-light overflow-hidden font-medium text-gray hover:overflow-auto">
        <span
          className="font-base block cursor-pointer py-3 duration-200 hover:pl-2 hover:text-primary"
          onClick={() => handleCategory("", "")}
        >
          All Categories
        </span>
        {data?.map((category, index) => (
          <Button
            key={index}
            className="font-base block w-full py-3 text-left duration-200 hover:pl-2 hover:text-primary"
            title={category.name}
            type="button"
            path={`/category/${category.name}`}
            onClick={() => handleCategory(category.id, category.name)}
          />
        ))}
      </div>
    </div>
  );
});
