import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IBreadcrumb {
  title?: string;
  href?: string;
}

interface IBreadcrumbState {
  breadcrumbs: IBreadcrumb[];
}

const initialState: IBreadcrumbState = {
  breadcrumbs: [],
};

export const breadcrumbSlice = createSlice({
  initialState,
  name: "breadcrumbSlice",
  reducers: {
    addBreadcrumbs: (state, action: PayloadAction<IBreadcrumb[]>) => {
      // ingore if the same breadcrumb
      if (
        JSON.stringify(state.breadcrumbs) === JSON.stringify(action.payload)
      ) {
        return;
      }
      state.breadcrumbs = action.payload;
    },
  },
});

export default breadcrumbSlice.reducer;

export const { addBreadcrumbs } = breadcrumbSlice.actions;
