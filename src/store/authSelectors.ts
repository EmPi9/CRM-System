import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectAuth = (state: RootState) => state.auth;

export const selectIsAuthorized = createSelector(
    selectAuth,
    (auth) => auth.isAuthorized
)

