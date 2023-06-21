import React, { useState, useEffect } from "react";

export default function Carousel({ blogs, interval = 3000 }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [currentSlide, interval]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === blogs.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? blogs.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="h-full w-full">
      {blogs.slice(0, 3).map((blog, index) => (
        <h3
          key={index}
          className={`duration-200 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {blog.title}
        </h3>
      ))}
    </div>
  );
}
