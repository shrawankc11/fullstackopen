import { useSelector, useDispatch } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import { createNotification } from '../reducers/notificationReducer';

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
                anecdote.content.includes(filter)
            );
        }
        return anecdotes;
    });

    const handleVote = (anecdote) => {
        dispatch(addVote(anecdote.id));
        dispatch(createNotification(anecdote.content));
        setTimeout(() => {
            dispatch(createNotification(null));
        }, 5000);
    };

    return (
        <div>
            {anecdotes.map((anecdote) => (
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
