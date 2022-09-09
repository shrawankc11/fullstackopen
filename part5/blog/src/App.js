import { useState, useEffect, useRef } from 'react';
// import Blogs from './components/Blogs'
import blogService from './services/blogs';
import userService from './services/users';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';

//seperate component for both message pending...
const ErrorMessage = ({ message }) => {
    if (message === null) return;
    return <h1 className="error">{message}</h1>;
};

const Message = ({ message }) => {
    if (message === null) return;
    return <h1 className="notification">{message}</h1>;
};

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [message, setMessage] = useState(null);

    const blogFormRef = useRef();

    if (user) {
        blogService.setToken(user);
    }

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        let loggedInUser, user;
        if (window.localStorage.getItem('loggedInUser')) {
            loggedInUser = window.localStorage.getItem('loggedInUser');
            user = JSON.parse(loggedInUser);
            setUser(user);
        }
    }, []);

    useEffect(() => {
        setBlogs(blogs.sort((first, second) => second.likes - first.likes));
    }, [blogs]);

    const addLikes = async (blog) => {
        const response = await blogService.updateLikes(blog, blog.id);
        setBlogs(
            blogs.map((b) =>
                b.id === blog.id ? { ...blog, likes: response.likes } : b
            )
        );
    };

    const blogDelete = async (blog) => {
        const confirmation = window.confirm(
            `Do you want to delet ${blog.title} ${blog.author}`
        );
        if (confirmation) {
            await blogService.deleteBlogs(blog.id);
            setBlogs(blogs.filter((b) => b.id !== blog.id));
            alert('blog delete successfully');
        }
    };

    const createBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility();
        const response = await blogService.create(blogObject);
        const data = await response.data;
        if (response.status === 201) {
            setMessage(
                `a new blog ${data.title} by ${data.author} toggleVisibilityadded`
            );
            setBlogs(blogs.concat(data));
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        } else if (response.status === 400) {
            setErrorMessage(response.data.error);
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
        }
    };

    const handleLogin = async (userObject) => {
        try {
            const user = await userService.login(userObject);
            window.localStorage.setItem('loggedInUser', JSON.stringify(user));
            setUser(user);
            setMessage('Logged In Succesfully!');
            setTimeout(() => {
                setMessage(null);
            }, 2500);
        } catch (err) {
            setErrorMessage(err.response.data.error);
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
        }
    };

    const handleLogout = () => {
        window.localStorage.removeItem('loggedInUser');
        setUser(null);
        setMessage('logged out succesfully!');
        setTimeout(() => {
            setMessage(null);
        }, 3000);
    };

    const blogForm = () => (
        <Togglable ref={blogFormRef} buttonLabel="add Blog">
            <BlogForm createBlog={createBlog} />
        </Togglable>
    );

    if (user === null) {
        return (
            <LoginForm userLogin={handleLogin}>
                <Message message={message} />
                <ErrorMessage message={errorMessage} />
            </LoginForm>
        );
    } else {
        return (
            <div>
                <Message message={message} />
                <div>
                    <h2>blogs</h2>
                    {user.username} logged in
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <h1>create new</h1>
                {user === null ? '' : blogForm()}
                <div id='blog'>
                    {blogs.map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            username={user.username}
                            addLikes={addLikes}
                            blogDelete={blogDelete}
                            blogCreator={blog.user.username}
                        />
                    ))}
                </div>
            </div>
        );
    }
};

export default App;
