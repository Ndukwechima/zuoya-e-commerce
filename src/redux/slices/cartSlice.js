import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { updateCartItemQuantity } from "./cartSlice";
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";


// Helper function to load cart from localStorage
const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : {products:[]};
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch cart for a user or guest
export const fetchCart = createAsyncThunk("cart/fetchCart", async ({userId, guestId},
    {rejectedWithValue}) => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/cart`,
           
          {
            params: {
              userId,
              guestId,
            },
          }
        );
      } catch (error) {
        console.error(error);
        return rejectedWithValue(error.response.data);
      }
    });

    // Add an item to the cart for a user or guest
    export const addToCart = createAsyncThunk("cart/addToCart", async ({productId, userId, guestId, quantity, size, color}, {rejectedWithValue}) => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/cart`,
          {
            productId,
            quantity,
            size,
            color,
            guestId,
            userId,          
          });
          return response.data;
      } catch (error) {
        console.error(error);
        return rejectedWithValue(error.response.data);
      }
    });

// Update the quantity of an item in the cart
export const updateCartItemQuantity = createAsyncThunk("cart/updateCartItemQuantity", async ({productId, quantity, size, color, guestId, userId}, {rejectedWithValue}) => {
    try {
        const response = await axios.put(`${BASE_URL}/api/cart`, {
            productId,
            quantity,
            size,
            color,
            guestId,
            userId,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return rejectedWithValue(error.response.data);
    }
});

// Remove an item from the cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({productId, size, color, guestId, userId}, {rejectedWithValue}) => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/cart`, {
            data: {
                productId,
                size,
                color,
                guestId,
                userId,
    }
    });

    return response.data;
} catch (error) {
        console.error(error);
        return rejectedWithValue(error.response.data);
    }
}
);

// Merge guest cart into user cart
export const mergeGuestCart = createAsyncThunk("cart/mergeCart", async ({guestId, user}, {rejectedWithValue}) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/cart/merge`, {
            guestId,

            user,
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
            }       
        );

    return response.data;

    } catch (error) {
        console.error(error);
        return rejectedWithValue(error.response.data);
    }

});

// Create Slice
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.cart = {products: [] };
            localStorage.removeItem("cart");
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchCart.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
          })
          .addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch cart items";
          })
          ////////////

          .addCase(addToCart.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
          })
          .addCase(addToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to add to cart";
          })

          ////////////

          .addCase(updateCartItemQuantity.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
          })
          .addCase(updateCartItemQuantity.rejected, (state, action) => {
            state.loading = false;
            state.error =
              action.payload?.message || "Failed to update item quantity";
          })

          ////////////

          .addCase(removeFromCart.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(removeFromCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
          })
          .addCase(removeFromCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to remove item";
          })

          ////////////

          .addCase(mergeGuestCart.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(mergeGuestCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
          })
          .addCase(mergeGuestCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to merge cart";
          });
    }
})

export const { clearCart } = cartSlice.actions;
 export default cartSlice.reducer