const Blog = require("../models/blog");

const initialBlogs = [
    {
        title: "The Tale of Jeff",
        author: "MuhNumAJeff",
        url: "https://www.imdb.com/title/tt27550760/",
        likes: 99909090000,
    },
    {
        title: "ckhfbvsdkvbsd",
        author: "thisIsAnAuthor",
        url: "https://randomsite.org",
        likes: 689769,
    },
];

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((b) => b.toJSON());
};

module.exports = {
    initialBlogs,
    blogsInDb,
};
