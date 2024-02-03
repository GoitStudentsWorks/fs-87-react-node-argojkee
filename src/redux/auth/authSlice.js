import { createSlice } from '@reduxjs/toolkit';
import logOutAPI from 'API/Auth/logOutAPI';
import signInAPI from '../../API/Auth/signInAPI';
import signUpAPI from '../../API/Auth/signUpAPI';
import fetchCurrentUserAPI from 'API/Auth/fetchCurrentUserAPI';
import { changeUserAvatarAPI } from 'API/Auth/changeUserAvatarAPI';
import { changeUserData } from 'API/Auth/changeUserDataAPI';

const initialState = {
  user: {
    name: null,
    email: null,
    avatarURL: null,
    norm: null,
    gender: null,
  },
  token: null,
  authIsLoading: false,
  isLoadingChangeAvatar: false,
  isEditing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      /*****************signIn********************/
      .addCase(signInAPI.pending, state => {
        state.authIsLoading = true;
      })
      .addCase(signInAPI.fulfilled, (state, { payload }) => {
        state.authIsLoading = false;
        state.user = { ...payload.user };
        state.token = payload.token;
      })
      /*****************end********************/

      /*****************signUp********************/
      .addCase(signUpAPI.pending, state => {
        state.authIsLoading = true;
      })
      .addCase(signUpAPI.fulfilled, state => {
        state.authIsLoading = false;
      })
      /*****************end********************/

      /****************log out */
      .addCase(logOutAPI.fulfilled, state => {
        state.authIsLoading = false;
        state.user = { ...initialState.user };
        state.token = null;
      })
      .addCase(logOutAPI.pending, state => {
        state.authIsLoading = true;
      })
      .addCase(logOutAPI.rejected, state => {
        state.authIsLoading = false;
        state.user = { ...initialState.user };
        state.token = null;
      })
      /******************************fetch current user */
      .addCase(fetchCurrentUserAPI.pending, state => {
        state.authIsLoading = true;
      })
      .addCase(fetchCurrentUserAPI.fulfilled, (state, { payload }) => {
        state.authIsLoading = false;
        state.user = { ...payload.user };
      })
      .addCase(fetchCurrentUserAPI.rejected, state => {
        state.authIsLoading = false;
        state.user = { ...initialState.user };
        state.token = null;
      })

      /*****************************change user avatar */

      .addCase(changeUserAvatarAPI.fulfilled, (state, { payload }) => {
        state.isLoadingChangeAvatar = false;
        state.user.avatarURL = payload;
      })
      .addCase(changeUserAvatarAPI.pending, state => {
        state.isLoadingChangeAvatar = true;
      })
      .addCase(changeUserAvatarAPI.rejected, state => {
        state.isLoadingChangeAvatar = false;
      })

      /******************************fetch user info */
      .addCase(changeUserData.fulfilled, (state, { payload }) => {
        state.user = { ...state.user, ...payload.user };
      });
  },
});
export default authSlice.reducer;
