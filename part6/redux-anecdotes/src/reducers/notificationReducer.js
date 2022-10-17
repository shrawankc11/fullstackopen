import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(_state, action) {
            return action.payload;
        },
        removeNotification(state, action) {
            return null;
        },
    },
});

export const { createNotification, removeNotification } =
    notificationSlice.actions;
export default notificationSlice.reducer;
