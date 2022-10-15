import { useSelector, useDispatch } from 'react-redux';
import { setValue } from '../reducers/filterReducer';

export default function Filter() {
    const dispatch = useDispatch();
    const filterValue = useSelector(({ filter }) => filter);
    const handleChange = (event) => {
        const value = event.target.value;
        dispatch(setValue(value));
    };

    const style = {
        marginBottom: 10,
    };

    return (
        <div style={style}>
            filter <input onChange={handleChange} value={filterValue} />
        </div>
    );
}
