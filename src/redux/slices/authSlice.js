import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Retrieve user info and token from local storage if available
const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Check for an existing guest ID in the localStorage or generate a new One
const initialGuestId =
  localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

// Define the initial state
const initialState = {
  user: userFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

// Async Thunk for User Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectedWithValue }) => {
    try {
      const response = await axios.post(
        `${
          import.meta.VITE_BACKEND_URL || "http://localhost:9000"
        }/api/users/login`,
        userData
      );

      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);

      return response.data.user; // Return the user object from the response
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  }
);

      console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);


// Async Thunk for User Registeration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectedWithValue }) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:9000"
        }/api/users/register`,
        userData
      );

      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);

      return response.data.user; // Return the user object from the response
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  }
);

// Create Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.guestId = `guest_${new Date().getTime()}`; // Reset guest ID on logout
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userToken");
            localStorage.setItem("guestId", state.guestId); // Set new guest ID in the localStorage
        },
        generateNewGuestId: (state) => {
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.setItem("guestId", state.guestId); // Set new guest ID in the localStorage
        }
    },

    extraReducers: (builder) => {
        builder
          .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          })

          .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
          })
          .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          });
        
    }
});

export const { logout, generateNewGuestId} = authSlice.actions;
export default authSlice.reducer;