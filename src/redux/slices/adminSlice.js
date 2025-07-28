import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";
// fetch all users (only admin)
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async (_, {rejectWithValue}) => {
    
        const response = await axios.get(`${BASE_URL}/api/admin/users`,

        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`},
            }
        );
        return response.data;
});

console.log("Token:", localStorage.getItem("userToken"));

// Add the create user action
export const addUser = createAsyncThunk("admin/addUser", async (userData, {rejectWithValue}) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/admin/users`,
            userData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Update user info
export const updateUser = createAsyncThunk("admin/updateUser", async ({id, name, email, role}) => {
  
        const response = await axios.put(
            `${BASE_URL}/api/admin/users/${id}`, {name, email, role},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`, 
                },
            }
        );
        return response.data.user;
})

// Delete a user
export const deleteUser = createAsyncThunk("admin/deleteUser", async (id, {rejectWithValue}) => {
  try {
      await axios.delete(`${BASE_URL}/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return id;

  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// create slice
const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
          // Fetch all users
          .addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            // state.error = null;
          })
          .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
          })
          .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          })

          // Update user

          .addCase(updateUser.fulfilled, (state, action) => {
            const updatedUsers = action.payload;
            const userIndex = state.users.findIndex(
              (user) => user._id === updatedUsers._id
            );
            if (userIndex !== -1) {
              state.users[userIndex] = updatedUsers;
            }
          })
          .addCase(deleteUser.fulfilled, (state, action) => {
            state.users = state.users.filter(
              (user) => user._id !== action.payload
            );
          })

          .addCase(addUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(addUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users.push(action.payload.user); // add a new user to the state
          })
          .addCase(addUser.rejected, (state, action) => {
            state.loading = false;
             state.error = action.payload?.message || "Failed to fetch users";
          });
    }
});

export default adminSlice.reducer;