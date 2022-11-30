import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
    name: 'anecdote',
    initialState: [],
    reducers: {
        appendAnecdote(state, action) {
            return [...state, action.payload];
        },
        addVote(state, action) {
            return state.map((anecdote) =>
                anecdote.id === action.payload
                    ? { ...anecdote, votes: anecdote.votes + 1 }
                    : anecdote
            );
        },
        getAnecdotes(_state, action) {
            return action.payload;
        },
    },
});

export const { addVote, getAnecdotes, appendAnecdote } = anecdoteSlice.actions;

export const updateVote = (anecdoteToUpdate) => {
    return async (dispatch) => {
        const anecdote = await anecdoteService.addVotes(anecdoteToUpdate);
        dispatch(addVote(anecdote.id));
    };
};

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll();
        dispatch(getAnecdotes(anecdotes));
    };
};

export const createAncedote = (content) => {
    return async (dispatch) => {
        const anecdote = await anecdoteService.postAnecdotes(content);
        dispatch(appendAnecdote(anecdote));
    };
};

export default anecdoteSlice.reducer;
