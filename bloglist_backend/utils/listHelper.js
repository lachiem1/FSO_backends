const dummy = (blogs) => {
    return 1;
};

const totalLikes = (listOfBlogs) => {
    let totalLikesInList = 0;
    listOfBlogs.forEach((blog) => {
        totalLikesInList += Number(blog["likes"]);
    });

    return totalLikesInList;
};

const favouriteBlog = (listOfBlogs) => {
    let mostPopularBlogObject;
    let currMostLikes = 0;

    listOfBlogs.forEach((blog) => {
        if (blog["likes"] > currMostLikes) {
            mostPopularBlogObject = blog;
            currMostLikes = blog["likes"];
        }
    });

    return mostPopularBlogObject;
};

module.exports = { dummy, totalLikes, favouriteBlog };
