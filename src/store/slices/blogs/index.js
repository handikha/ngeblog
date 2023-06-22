import { createSlice } from "@reduxjs/toolkit";

// @import async thunk
import {
  createNewArticle,
  deleteArticle,
  getArticles,
  getLikedArticles,
} from "./slices";
import { isErrorOccured } from "../auth";

const INITIAL_STATE = {
  articles: [],
  allArticles: [],
  myArticles: [],
  totalPage: 1,
  currentPage: 1,
  isLoading: false,
  isArticlesLoading: false,
  isLikeArticleLoading: false,
  isUploaded: false,
  isDeleted: false,
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state, action) => {
        state.isArticlesLoading = true;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state = Object.assign(state, {
          isArticlesLoading: false,
          articles: action.payload?.data.result,
          totalPage: action.payload?.data.page,
          currentPage: action.payload?.data.blogPage,
          allArticles: action.payload?.response,
          myArticles: action.payload?.myArticles,
        });
      })

      .addCase(getArticles.rejected, (state, action) => {
        state.isArticlesLoading = false;
      })
      .addCase(getLikedArticles.pending, (state, action) => {
        state.isArticlesLoading = true;
      })
      .addCase(getLikedArticles.fulfilled, (state, action) => {
        state = Object.assign(state, {
          isLikeArticleLoading: false,
          articles: action.payload?.result,
        });
      })
      .addCase(getLikedArticles.rejected, (state, action) => {
        state.isLikeArticleLoading = false;
      })

      .addCase(createNewArticle.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createNewArticle.fulfilled, (state, action) => {
        state = Object.assign(state, {
          isLoading: false,
          isUploaded: true,
        });
      })
      .addCase(createNewArticle.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(deleteArticle.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = true;
      })

      .addMatcher(isErrorOccured, (state, action) => {
        state.isLikeArticleLoading = false;
        console.error(action.payload);
      });
  },
});

export default blogsSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import { getArticles } from "./slices";

// const INITIAL_STATE = {
//   articles: [],
//   totalPage: 1,
//   currentPage: 1,
//   isBlogsLoading: false,
// };

// const blogsSlice = createSlice({
//   name: "blogs",
//   initialState: INITIAL_STATE,
//   reducers: {},
//   extraReducers: (builder) =>
//     builder
//       .addCase(getArticles.pending, (state, action) => {
//         state.isBlogsLoading = true;
//       })
//       .addCase(getArticles.fulfilled, (state, action) => {
//         state = Object.assign(state, {
//           isBlogsLoading: false,
//           articles: action.payload?.result,
//           totalPage: action.payload?.page,
//           currentPage: action.payload?.blogPage,
//         });
//       })
//       .addCase(getArticles.rejected, (state, action) => {
//         state.isBlogsLoading = false;
//       }),
// });

// export default blogsSlice.reducer;
