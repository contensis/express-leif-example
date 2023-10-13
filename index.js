const { setupExpressServer } = require('./setup-express');
const { getBlogs, getSingleBlog } = require('./ContensisAPI.js');

const app = setupExpressServer();

// Initialise the blog listing route
app.get('/', async (req, res) => {
  try {
    const blogs = await getBlogs();

    const entryId = req.query.entryId;
    const blog = await getSingleBlog(entryId);

    if (blog) res.render('blog', { blog }); // --> views/blog.ejs
    else res.render('index', { blogs }); // --> views/index.ejs
  } catch (error) {
    console.error(error);
  }
});
