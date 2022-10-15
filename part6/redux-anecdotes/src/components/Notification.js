import { useSelector } from 'react-redux';

const Notification = () => {
    const notification = useSelector(({ notification }) => notification);

    const hideWhenNull = notification ? 'block' : 'none';

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        display: hideWhenNull,
    };
    return <div style={style}>you voted '{notification}'</div>;
};

export default Notification;
