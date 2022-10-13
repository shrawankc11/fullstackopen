import { useSelector, useDispatch } from 'react-redux';

const addVote = (id) => {
    return {
        type: 'ADD_VOTE',
        data: { id },
    };
};

const App = () => {
    const anecdotes = useSelector((state) => state);
    const dispatch = useDispatch();

    console.log(anecdotes);

    const vote = (id) => {
        dispatch(addVote(id));
    };

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
            <h2>create new</h2>
            <form>
                <div>
                    <input />
                </div>
                <button>create</button>
            </form>
        </div>
    );
};

export default App;
