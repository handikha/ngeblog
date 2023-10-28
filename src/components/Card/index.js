import React, { useState } from "react";
import { FaHeart, FaRegEye, FaRegHeart } from "react-icons/fa";
import formatNumber from "../../utils/formatNumber";
import Button from "../Button";
import { HiOutlineTrash, HiUserCircle } from "react-icons/hi2";
import formatDate from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";

function Card({
  id,
  author,
  title,
  date,
  content,
  category,
  image,
  onButtonLike,
  onButtonDelete,
  username,
  writterImage,
  article,
  setSelectedArticle,
}) {
  const navigate = useNavigate();
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
            onClick={() => {
              setSelectedArticle(article);
              navigate(`/article/${id}`);
            }}
            className="cursor-pointer text-xl font-semibold capitalize text-dark duration-150 hover:text-primary">
            {title}
          </a>

          <div className="flex gap-2">
            <Button
              type="link"
              // path={`/category/${category}`}
              title={category}
              className="text-xs text-light-gray hover:text-primary"
            />
          </div>
        </div>
        <div className="mt-4 text-gray lg:block">
          <p className="line-clamp-2">{content}</p>
        </div>

        <div className="mt-6 flex items-center gap-x-2 text-sm  text-light-gray">
          <span className="flex items-center gap-2 text-xs">
            {/* Written by{" "} */}
            <div className="h-8 w-8 overflow-hidden rounded-full ">
              {writterImage ? (
                <img
                  src={process.env.REACT_APP_IMAGE_URL + writterImage}
                  alt=""
                  srcset=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-8 w-8 overflow-hidden rounded-full">
                  <HiUserCircle className="text-3xl" />
                </div>
              )}
            </div>
            <span className="cursor-pointer font-medium italic hover:text-primary">
              {author}
            </span>
          </span>

          <span className="">&#183;</span>
          <span className="text-xs">{date}</span>
        </div>
      </div>

      <div className="lg:pt4 flex gap-x-6 bg-lightest p-4 text-gray sm:pt-8">
        <div className="flex w-full items-center justify-between gap-x-1">
          <span
            className="text-lg text-red-400 duration-100 hover:cursor-pointer active:scale-125"
            onClick={onButtonLike}>
            <FaRegHeart />
          </span>

          {author === username && (
            <span
              onClick={onButtonDelete}
              className="cursor-pointer select-none rounded-md bg-red-400 p-2 text-white hover:bg-red-500">
              <HiOutlineTrash />
            </span>
          )}
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
  onButtonDelete = (id) => {},
  username,
  setSelectedArticle,
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
      onButtonDelete={() => onButtonDelete(article.id)}
      username={username}
      writterImage={article.User.imgProfile}
      article={article}
      setSelectedArticle={setSelectedArticle}
    />
  ));
}
