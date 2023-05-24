
import { configureStore } from "@reduxjs/toolkit";
import { usersReducer, add, load } from "./slices/usersSlice";
const store = configureStore({
    reducer: {
        users: usersReducer
    }
});

export { store, add, load };