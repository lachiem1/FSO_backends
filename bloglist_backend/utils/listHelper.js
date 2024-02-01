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

const mostBlogs = (listOfBlogs) => {
    let authorNumbers = {};
    listOfBlogs.forEach((blog) => {
        const authorName = blog["author"];

        if (!authorNumbers[authorName]) {
            const numEntries = listOfBlogs.filter(
                (b) => b["author"] === authorName,
            ).length;
            authorNumbers[`${authorName}`] = Number(numEntries);
        }
    });
    console.log("authorNumbersObject: ", authorNumbers);

    let maxKey;
    let maxVal = 0;

    for (const [key, val] of Object.entries(authorNumbers)) {
        if (val > maxVal) {
            maxKey = key;
            maxVal = val;
        }
    }

    return { author: maxKey, blogs: maxVal };
};

const mostLikes = (listOfBlogs) => {
    let authorLikes = {};
    listOfBlogs.forEach((blog) => {
        const authorName = blog["author"];

        if (!authorLikes[authorName]) {
            authorLikes[authorName] = blog["likes"];
        } else {
            authorLikes[authorName] += blog["likes"];
        }
    });
    console.log("authorLikesObject: ", authorLikes);

    let maxKey;
    let maxVal = 0;

    for (const [key, val] of Object.entries(authorLikes)) {
        if (val > maxVal) {
            maxKey = key;
            maxVal = val;
        }
    }

    return { author: maxKey, likes: maxVal };
};

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes };
