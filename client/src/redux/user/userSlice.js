import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    paymentInitiated: (state) => {
      state.loading = true;
    },
    paymentSuccess: (state) => {
      state.loading = false;

    },
    paymentFailure: (state) => {
      state.loading = false;
    },
    paymentVerified: (state) => {
      state.loading = false;
    },
    paymentVerificationFailed: (state) => {
      state.loading = false;
    },
    updatePaymentStatus: (state) => {
      if (state.currentUser) {
        state.currentUser.payment = true;
      }
    },
    
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signoutSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  paymentInitiated,
  paymentSuccess,
  paymentFailure,
  paymentVerified,
  paymentVerificationFailed,
  updatePaymentStatus,
} = userSlice.actions;

export default userSlice.reducer;