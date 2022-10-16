import { createSlice } from '@reduxjs/toolkit';

const anecdoteSlice = createSlice({
    name: 'anecdote',
    initialState: [],
    reducers: {
        createAncedote(state, action) {
            return [...state, action.payload];
        },
        addVote(state, action) {
            const id = action.payload;
            return state.map((anecdote) =>
                anecdote.id === id
                    ? { ...anecdote, votes: anecdote.votes + 1 }
                    : anecdote
            );
        },
        getAnecdotes(_state, action) {
            return action.payload;
        },
    },
});

export const { createAncedote, addVote, getAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
