import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const blogSubmit = (event) => {
        event.preventDefault();
        const BlogObject = {
            title,
            author,
            url,
        };
        createBlog(BlogObject);
        setTitle('');
        setAuthor('');
        setUrl('');
    };

    return (
        <div className="formDiv">
            <form onSubmit={blogSubmit}>
                <div>
                    title:
                    <input
                        id='title'
                        placeholder="enter a title..."
                        onChange={({ target }) => setTitle(target.value)}
                        value={title}
                    />
                </div>
                <div>
                    author:
                    <input
                        id='author'
                        onChange={({ target }) => setAuthor(target.value)}
                        value={author}
                        type={'text'}
                    />
                </div>
                <div>
                    url:
                    <input
                        id='url'
                        onChange={(event) => setUrl(event.target.value)}
                        value={url}
                        type={'text'}
                    />
                </div>
                <div>
                    <button id='button-create' type="submit">create</button>
                </div>
            </form>
        </div>
    );
};

export default BlogForm;
