import { useSelector, useDispatch } from 'react-redux';
import { updateVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote, handleVote }) => {
    return (
        <div>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={handleVote}>vote</button>
            </div>
        </div>
    );
};

const AnecdoteList = () => {
    const dispatch = useDispatch();

    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (filter) {
            return anecdotes.filter((anecdote) =>
                anecdote.content.toLowerCase().includes(filter.toLowerCase())
            );
        }
        return anecdotes;
    });

    const anecdotesToShow = [...anecdotes];
    anecdotesToShow.sort((a, b) => b.votes - a.votes);

    const handleVote = (anecdote) => {
        dispatch(updateVote(anecdote));
        dispatch(setNotification(anecdote.content, 5));
    };

    return (
        <div>
            {anecdotesToShow.map((anecdote) => (
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleVote={() => handleVote(anecdote)}
                />
            ))}
        </div>
    );
};

export default AnecdoteList;
