import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectAuth = (state: RootState) => state.auth;

export const selectIsAuthorized = createSelector(
    selectAuth,
    (auth) => auth.isAuthorized,
)

export const selectIsAdmin = createSelector(
    selectAuth,
    (auth) => auth.isAdmin
)

export const selectIsModerator = createSelector(
    selectAuth,
    (auth) => auth.isModerator
)

