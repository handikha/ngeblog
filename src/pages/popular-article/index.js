import React, { useEffect } from "react";
import Search from "../../components/Search";
import Categories from "../../components/Categories";
import Popular from "../../components/Popular";
import Blogs from "../../json/blogs.json";
import { useParams } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../../store/slices/blogs/slices";
import { getCategories } from "../../store/slices/categories/slices";
import { getPopularBlogs } from "../../store/slices/popular/slices";
import Spinner from "../../components/spinner";
import HomeLoading from "../home/home.loading";

export default function PopularArticle() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { popularBlogs, categories } = useSelector((state) => {
    return {
      popularBlogs: state.popularBlogs.data,
      categories: state.categories.data,
    };
  });

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getPopularBlogs());
  }, []);
  // console.log(articles);

  const article =
    popularBlogs && popularBlogs.find((popularBlog) => popularBlog.id === +id);
  console.log(article);

  if (!article) return <HomeLoading />;
  return (
    <div className="container grid grid-cols-1 gap-y-10 px-4 py-24 lg:grid-cols-3 lg:gap-x-10">
      <div className="col-span-2 grid h-fit w-full">
        <div className="aspect-[5/3] w-full overflow-hidden rounded-xl">
          <img
            src={process.env.REACT_APP_IMAGE_URL + article.imageURL}
            alt=""
            srcSet=""
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-8 rounded-xl">
          <h3 className="text-dark">{article.title}</h3>
          <div className="text-sm italic text-gray">
            <span>
              Written by{" "}
              {/* <span className="font-medium">{article.User.username}</span>{" "} */}
            </span>
            <span className="mx-2">&#183;</span>
            <span>{formatDate(article.createdAt)}</span>
            <span className="mx-2">&#183;</span>
            {article.Category.name}
          </div>
        </div>

        <div className="mt-4 text-dark">{article.content}</div>
      </div>
      <div className="grid h-fit grid-cols-1 gap-10">
        {/* <Search /> */}
        <Categories data={categories} />
        <Popular data={popularBlogs} />
      </div>
    </div>
  );
}
