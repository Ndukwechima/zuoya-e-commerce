import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:9000"}`;
const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;

// Fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk(
  "adminOrders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/orders`, {
        headers: {
          Authorization: USER_TOKEN,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


//  update order delivery status
export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async ({id, status},  { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/api/admin/orders/${id}`, {status}, {
        headers: {
          Authorization: USER_TOKEN,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

//  delete an order
export const deleteOrder = createAsyncThunk(
  "adminOrders/deleteOrder",
  async (id,  { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/api/admin/orders/${id}`,{
        headers: {
          Authorization: USER_TOKEN,
        },
      });

      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// create slice
const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
    // Fetch all orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;

        // calculate total sales
        const totalSales = action.payload.reduce((acc, order) => {
          return acc + order.totalPrice;
        }, 0);

        state.totalSales = totalSales;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Update order status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
       const updatedOrder = action.payload;
        const orderIndex = state.orders.findIndex((order) => order._id === updatedOrder._id);

        if (orderIndex !== -1) {
          state.orders[orderIndex] = updatedOrder;
        }
    })
    
    // Delete order
      .addCase(deleteOrder.fulfilled, (state, action) => {
          state.orders = state.orders.filter((order) => order._id !== action.payload._id);
      })
  }
})

export default adminOrderSlice.reducer;


