import React, { useState, useEffect } from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const Carousel = ({ data, interval }) => {
  const navigate = useNavigate();
  const topThree = data.slice(0, 3);
  const [blogs, setBlogs] = useState(topThree);
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  // console.log(topThree);

  useEffect(() => {
    const timer = setInterval(() => {
      nextBlog();
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const nextBlog = () => {
    setCurrentBlogIndex((prevIndex) => (prevIndex + 1) % blogs.length);
  };

  const prevBlog = () => {
    setCurrentBlogIndex(
      (prevIndex) => (prevIndex - 1 + blogs.length) % blogs.length
    );
  };

  return (
    blogs.length > 0 && (
      <div
        className="relative flex h-full w-full items-center justify-between bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${
            process.env.REACT_APP_IMAGE_URL + blogs[currentBlogIndex].imageURL
          })`,
        }}
      >
        <div
          className="flex h-full w-24 cursor-pointer select-none items-center justify-center text-2xl text-white"
          onClick={prevBlog}
        >
          <span className="rounded-full bg-black/20 p-2">
            <HiChevronDoubleLeft />
          </span>
        </div>
        <div
          className="mb-10 w-full cursor-pointer self-end bg-gradient-to-r from-transparent via-black/30 to-transparent text-center"
          onClick={() =>
            navigate(`/popular-article/${blogs[currentBlogIndex].id}`)
          }
        >
          <h3 className="text-white">{blogs[currentBlogIndex].title}</h3>
          <p className="text-lighter">{blogs[currentBlogIndex].content}</p>
        </div>
        <div
          className="flex h-full w-24 cursor-pointer select-none items-center justify-center text-2xl text-white"
          onClick={nextBlog}
        >
          <span className="rounded-full bg-black/20 p-2">
            <HiChevronDoubleRight />
          </span>
        </div>
      </div>
    )
  );
};

export default Carousel;
