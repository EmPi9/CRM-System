import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectAuth = (state: RootState) => state.auth;

export const selectIsAuthorized = createSelector(
    selectAuth,
    (auth) => auth.isAuthorized,
)

export const selectUserRole = createSelector(
    selectAuth,
    (auth) => auth.roleUser
)
