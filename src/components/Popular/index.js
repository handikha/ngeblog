import React from "react";
import Button from "../Button";
import Blog from "../../json/blogs.json";
import formatDate from "../../utils/formatDate";
import { HiHeart } from "react-icons/hi2";

export default function Popular({ data }) {
  return (
    <div className="h-80 w-full rounded-xl bg-lighter p-6 font-poppins shadow-md lg:h-fit">
      <h3 className="popular-title ">Top Posts</h3>
      <div className="popular-container h-52 divide-y-[1px] divide-light overflow-hidden text-gray hover:overflow-auto lg:h-full">
        {data.map((blog, index) => (
          <div key={index} className="flex flex-row items-center gap-x-4">
            <span className="mr-2 w-4 text-2xl font-semibold">
              {index + 1}.
            </span>
            <div className="flex flex-col justify-start gap-y-2 py-3">
              <Button
                className=" block font-semibold hover:text-primary "
                title={blog.title}
                type="link"
                path="#"
              />
              <div className=" flex items-center gap-x-2 text-sm italic text-light-gray">
                {/* <a
                  href="/user/afedsas"
                  className="flex items-center hover:text-primary"
                >
                  <div className=" mr-2 h-4 w-4 overflow-auto rounded-full bg-primary">
                    <img
                      src="https://source.unsplash.com/50x50?asian"
                      alt=""
                      srcSet=""
                      className="w-full-h-full object-cover"
                    />
                  </div>
                  <span>{blog.author}</span>
                </a> */}
                <span>
                  <HiHeart />
                </span>
                <span>{blog.total_fav}</span>
                <span className="">&#183;</span>
                <span className="">{blog.Category.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
