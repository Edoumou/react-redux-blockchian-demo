import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: "user",
    initialState: [],
    reducers: {
        add(state, action) {
            state.push(action.payload);
        },
        load(state, action) {
            for(let i = 0; i < action.payload.length; i++) {
                state.push(action.payload[i]);
            }
        }
    }
});

export const { add, load } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;