import { useDispatch } from 'react-redux';
import { createAncedote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addAnecdote = async (event) => {
        event.preventDefault();
        const content = event.target.addNew.value;
        event.target.addNew.value = '';
        dispatch(createAncedote(content));
    };

    return (
        <div>
            <h1>create new</h1>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="addNew" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
