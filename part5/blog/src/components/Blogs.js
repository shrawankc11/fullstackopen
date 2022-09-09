import Blog from './Blog';

const Blogs = ({ blogs }) => {
    // const [blogs, setBlogs] = useState([])

    return (
        <div>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default Blogs;
