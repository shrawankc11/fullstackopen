import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { useEffect } from 'react';
import { getAnecdotes } from './reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import anecdoteService from './services/anecdotes';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        anecdoteService.getAll().then((anecdotes) => {
            dispatch(getAnecdotes(anecdotes));
        });
    }, [dispatch]);
    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    );
};

export default App;
