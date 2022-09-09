import { useState } from 'react';

const Blog = ({ blog, username, blogDelete, addLikes, blogCreator }) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    let buttonLable = visible === true ? 'hide' : 'show';

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    };

    const buttonStyle = {
        backgroundColor: 'blue',
        borderRadius: 3,
    };

    const showWhenVisible = { display: visible ? '' : 'none' };

    return (
        <div style={blogStyle} className='blog'>
            {blog.title} : {blog.author}
            <button onClick={toggleVisibility} className="toggleButton">
                {buttonLable}
            </button>
            <div style={showWhenVisible} className="visibleDiv">
                {blog.url}
                <br></br>
                likes:{blog.likes}
                <button onClick={() => addLikes(blog)} className="likeButton">
                    like
                </button>
                <br></br>
                {blog.user.name}
                <div>
                    {username === blogCreator ? (
                        <button
                            className="deleteButton"
                            style={buttonStyle}
                            onClick={() => blogDelete(blog)}
                        >
                            delete
                        </button>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
};
export default Blog;
