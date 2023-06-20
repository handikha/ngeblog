import React, { useState } from "react";
import { FaHeart, FaRegEye, FaRegHeart } from "react-icons/fa";
import formatNumber from "../../utils/formatNumber";
import Button from "../Button";
import { HiOutlineBookmark } from "react-icons/hi2";
import formatDate from "../../utils/formatDate";

function Card({
  id,
  author,
  title,
  date,
  content,
  category,
  image,
  onButtonLike,
}) {
  return (
    <div className="group  min-h-max w-full overflow-hidden rounded-lg font-poppins shadow-lg">
      <div className="aspect-[2/1] w-full overflow-hidden sm:aspect-[5/3]">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover duration-200 group-hover:scale-110"
        />
      </div>

      <div className="flex h-48 flex-col justify-start bg-lightest p-4">
        <div className="">
          <a
            href={`/article/${id}`}
            className="text-xl font-semibold text-dark duration-150 hover:text-primary"
          >
            {title}
          </a>

          <div className="flex gap-2">
            <Button
              type="link"
              path={`/category/${category}`}
              title={category}
              className="text-xs text-light-gray hover:text-primary"
            />
          </div>
        </div>
        <div className="mt-4 text-gray lg:block">
          <p className="line-clamp-2">{content}</p>
        </div>

        <div className="mt-6 flex items-center gap-x-2 text-sm italic text-light-gray">
          <a
            href="/user/profile/"
            className="flex items-center hover:text-primary"
          >
            <div className="mr-2 h-6 w-6 overflow-auto rounded-full bg-primary">
              <img
                src="https://source.unsplash.com/50x50?potrait"
                alt=""
                srcSet=""
                className="w-full-h-full object-cover"
              />
            </div>
            <span className="text-xs">{author}</span>
          </a>
          <span className="">&#183;</span>
          <span className="text-xs">{date}</span>
        </div>
      </div>

      <div className="lg:pt4 flex gap-x-6 bg-lightest p-4 text-gray sm:pt-8">
        <div className="flex items-center gap-x-1">
          <span
            className="text-lg text-red-400 duration-100 hover:cursor-pointer active:scale-125"
            onClick={onButtonLike}
          >
            {/* {liked ? <FaHeart /> : <FaRegHeart />} */}
            <FaRegHeart />
          </span>
          <span className="w-8 select-none text-light-gray">
            {/* {formatNumber(likesCount)} */}
          </span>
        </div>
        {/* <div className="flex items-center gap-x-1 text-light-gray">
          <span className="text-lg">
            <FaRegEye />
          </span>
          <span>{formatNumber(views)}</span>
        </div> */}
      </div>
    </div>
  );
}

export default function RenderCards({
  articles = [],
  onButtonLike = (id) => {},
}) {
  return articles.map((article, index) => (
    <Card
      key={index}
      id={article.id}
      author={article.User.username}
      date={formatDate(article.createdAt)}
      image={process.env.REACT_APP_IMAGE_URL + article.imageURL}
      title={article.title}
      content={article.content}
      category={article.Category.name}
      onButtonLike={() => onButtonLike(article.id)}
    />
  ));
}
