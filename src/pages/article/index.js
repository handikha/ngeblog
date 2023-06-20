import React from "react";
import Search from "../../components/Search";
import Categories from "../../components/Categories";
import Popular from "../../components/Popular";
import Blogs from "../../json/blogs.json";
import { useParams } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import Button from "../../components/Button";

export default function Article() {
  const { id } = useParams();
  const blog = Blogs.blogs.find((blog) => blog.id === +id);
  console.log(blog);

  return (
    <div className="container grid grid-cols-1 gap-y-10 px-4 py-24 lg:grid-cols-3 lg:gap-x-10">
      <div className="grid h-fit grid-cols-1 gap-10">
        <Search />
        <Categories />
        <Popular />
      </div>

      <div className="col-span-2 grid h-fit w-full">
        <div className="aspect-[5/3] w-full overflow-hidden rounded-xl">
          <img
            src={blog.image}
            alt=""
            srcSet=""
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-8 rounded-xl">
          <h3 className="text-dark">{blog.title}</h3>
          <div className="text-sm italic text-gray">
            <span>By {blog.author} </span>
            <span className="mx-2">&#183;</span>
            <span>{formatDate(blog.date)}</span>
            <span className="mx-2">&#183;</span>
            {blog.tags.map((tag, index) => (
              <span key={index}>
                <Button
                  title={tag}
                  path="#"
                  className="italic hover:text-primary "
                  type="link"
                />
                {index === blog.tags.length - 1 ? "." : ", "}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 text-dark">{blog.content}</div>
      </div>
    </div>
  );
}
