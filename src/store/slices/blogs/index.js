import { createSlice } from "@reduxjs/toolkit";

// @import async thunk
import { getArticles, getLikedArticles } from "./slices";
import { isErrorOccured } from "../auth";

const INITIAL_STATE = {
  articles: [],
  totalPage: 1,
  currentPage: 1,
  isArticlesLoading: false,
  isLikeArticleLoading: false,
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
          articles: action.payload?.result,
          totalPage: action.payload?.page,
          currentPage: action.payload?.blogPage,
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
