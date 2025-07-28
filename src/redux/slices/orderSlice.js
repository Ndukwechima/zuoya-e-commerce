import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";

// Async Thunk for fetch Orders
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/my-orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk for fetch Order details by ID
export const fetchOrderDetails = createAsyncThunk("orderId/fetchOrderDetails", async (id, {rejectWithValue}) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/api/orders/${id}`,

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

// Create order Slice

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        totalOrders: 0,
        orderDetails: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
          // Fetch user orders
          .addCase(fetchUserOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchUserOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
          })
          .addCase(fetchUserOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          })

          // Fetch order details
          .addCase(fetchOrderDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchOrderDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.orderDetails = action.payload;
          })
          .addCase(fetchOrderDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          });
    }
});

export default orderSlice.reducer;