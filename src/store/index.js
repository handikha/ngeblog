import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth";
import categoriesReducer from "./slices/categories";
import popularBlogsReducer from "./slices/popular";
import blogsReducer from "./slices/blogs";

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    popularBlogs: popularBlogsReducer,
    blogs: blogsReducer,
  },
});

export default store;
