import React, { useEffect, useState } from "react";
import Search from "../../components/Search";
import Categories from "../../components/Categories";
import Popular from "../../components/Popular";
import formatDate from "../../utils/formatDate";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/slices/categories/slices";
import { getPopularBlogs } from "../../store/slices/popular/slices";
import { getArticles, likeArticle } from "../../store/slices/blogs/slices";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import HomeLoading from "./home.loading";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import RenderCards from "../../components/Card";
import Carousel from "../../components/Carousel";

export default function Home() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    isArticlesLoading,
    currentPage,
    totalPage,
    articles,
    categories,
    popularBlogs,
    id,
    isVerified,
  } = useSelector((state) => {
    return {
      isArticlesLoading: state.blogs.isArticlesLoading,
      articles: state.blogs.articles,
      currentPage: state.blogs.currentPage,
      totalPage: state.blogs.totalPage,
      categories: state.categories.data,
      popularBlogs: state.popularBlogs.data,
      id: state.auth.id,
      isVerified: state.auth.isVerified,
    };
  });

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  const onButtonLike = (blogId) => {
    if (id && isVerified) {
      dispatch(likeArticle({ BlogId: blogId }));
      console.log(blogId);
      return;
    }

    handleOpenModal();
    // navigate("/login");
  };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getPopularBlogs());
    dispatch(getArticles({ id_cat: 3, page: 1, sort: "ASC" }));
    document.title = "Ngeblog.";
  }, []);

  const tempBlogs = [...articles];

  const sortedBlogs = params.category
    ? tempBlogs
        .filter((blog) => blog.Category.name === params.category)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : tempBlogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handlePagination = (type) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (typeof type === "number") {
      dispatch(
        getArticles({
          id_cat: 3,
          page: type,
          sort: "ASC",
        })
      );
      return;
    }

    dispatch(
      getArticles({
        id_cat: 3,
        page: type === "prev" ? currentPage - 1 : currentPage + 1,
        sort: "ASC",
      })
    );
  };

  if (isArticlesLoading) return <HomeLoading />;

  return (
    <div className="container grid grid-cols-1 gap-y-10 px-4 py-24 lg:grid-cols-3 lg:gap-x-10">
      <div className="grid h-fit grid-cols-1 gap-10">
        <Search />
        <Categories data={categories} />
        <Popular data={popularBlogs} />
      </div>

      {/* CARD CONTAINER */}
      <div className="grid h-fit w-full gap-y-10 sm:grid-cols-2 sm:gap-6 lg:col-span-2">
        {/* CAROUSEL */}
        {location.pathname === "/" && (
          <div className="col-span-full h-96 overflow-hidden rounded-xl bg-lighter">
            <Carousel data={popularBlogs} interval="3000" />
          </div>
        )}
        {params.category ? (
          <h5 className="col-span-full font-medium text-dark">
            <Button
              type="link"
              title="Home"
              path="/"
              className="hover:text-primary"
            />{" "}
            / {params.category}
          </h5>
        ) : (
          <h3 className="col-span-full text-2xl font-semibold text-dark">
            Latest Post
          </h3>
        )}

        {sortedBlogs.length > 0 ? (
          <RenderCards articles={sortedBlogs} onButtonLike={onButtonLike} />
        ) : (
          <div className="col-span-2 text-dark">
            Sorry, no articles have been created yet. You can try another
            category of articles
          </div>
        )}
        {sortedBlogs.length > 0 ? (
          <div className="col-span-2 place-self-center">
            <nav aria-label="Page navigation example">
              <ul className="inline-flex items-center -space-x-px">
                <li>
                  <div
                    onClick={() => {
                      if (currentPage === 1) {
                        return;
                      }
                      handlePagination("prev");
                    }}
                    className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 block cursor-pointer rounded-l-lg border bg-lightest px-3 py-2 leading-tight text-primary hover:bg-light"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </li>

                {/* PAGINATION NUMBER */}
                {Array.from({ length: totalPage }, (_, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      currentPage === index + 1
                        ? null
                        : handlePagination(index + 1)
                    }
                  >
                    <span
                      className={`border  px-3 py-2 leading-tight  ${
                        currentPage === index + 1
                          ? "cursor-default  border-primary bg-primary text-white"
                          : "cursor-pointer bg-lightest text-primary hover:bg-light"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </li>
                ))}

                <li>
                  <div
                    onClick={() => {
                      if (currentPage === totalPage) {
                        return;
                      }
                      handlePagination("next");
                    }}
                    className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 block cursor-pointer rounded-r-lg border bg-lightest px-3 py-2 leading-tight text-primary hover:bg-light"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        ) : null}
      </div>

      {!id && showModal && (
        <Modal showModal={showModal}>
          <p className=" ">
            You should login first to like or save this article.
          </p>
          <div className="mt-4 flex justify-end gap-4">
            <Button
              onClick={handleCloseModal}
              title="Close"
              className="font-medium hover:text-primary"
            />
            <Button
              type="button"
              onClick={() => {
                navigate("/login");
                handleCloseModal();
              }}
              title="Login"
              isButton
              isPrimary
            />
          </div>
        </Modal>
      )}

      {id && !isVerified && showModal && (
        <Modal showModal={showModal}>
          <p className=" ">Please verify your account</p>
          <div className="mt-4 flex justify-end gap-4">
            <Button
              onClick={handleCloseModal}
              title="Close"
              isButton
              isPrimary
            />
          </div>
        </Modal>
      )}

      {/* {showModal && (
        <div
          className={`absolute inset-0 z-10 flex items-center justify-center bg-black/50`}
        >
          <div
            className={`h-fit w-96 items-center rounded-lg bg-lightest px-8 py-6 text-gray`}
            style={{ opacity: showModal ? 1 : 0, transition: "opacity 0.5s" }}
          >
            <p>You should login first to like this article.</p>
            <div className="mt-8 flex justify-end gap-4">
              <Button
                onClick={handleCloseModal}
                title="Close"
                className="font-medium hover:text-primary"
              />
              <Button
                type="button"
                onClick={() => navigate("/login")}
                title="Login"
                isButton
                isPrimary
              />
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
