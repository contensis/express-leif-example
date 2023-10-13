const { Client, Op, Query } = require('contensis-delivery-api');

/**
 * The Contensis Client allows you to run a range of operations through our Delivery API to retrieve content.
 *
 * All operations for the API hang off the ContensisClient type, which is created using the static method Zengenti.Contensis.Client.Create().
 * The Create() method allows parts of the Default configuration to be partially or completely overridden for that instance.
 *
 * Our Contensis Client requires the `rootUrl` which is the url of your cms, it
 * also requires the `accessToken` and `projectId`, both of these
 * can be found within your CMS.
 *
 */
const ContensisClient = Client.create({
  rootUrl: `https://api-${process.env.ALIAS}.cloud.contensis.com`,
  projectId: process.env.PROJECT_API_ID,
  accessToken: process.env.ACCESS_TOKEN,
});

/**
 * Get Blogs
 * To get a blogs, simply create a `new Query`
 * We meed set what `contentTypeId` we are querying and set the `versionStatus` to `latest` so we get the latest content back
 * Note that we can pass in the `pageSize` and `pageIndex`
 * @returns {Array<Objects>}
 */
exports.getBlogs = async () => {
  try {
    const query = new Query(
      Op.equalTo('sys.contentTypeId', 'blogPost'),
      Op.equalTo('sys.versionStatus', 'published')
    );
    query.pageIndex = 0;
    query.pageSize = 9;
    const entries = await ContensisClient.entries.search(query);

    if (entries && entries.totalCount >= 1) return entries.items;
  } catch (e) {
    console.error(e);
  }
};

/**
 * Get a single Blog by its Path
 * To get a blog by a path, query the nodes
 * with a query param of `path` equal to the desired blog with that path
 * Note that you need to send the `entryFields: '*'` and `entryLinkDept: 1` to be able to get the data back
 * @param path - string - the path of the blog
 * @returns {Object}
 */
exports.getSingleBlog = async (entryId) => {
  try {
    if (!entryId) return null;
    const entry = await ContensisClient.entries.get({ id: entryId });
    if (entry) return entry;
  } catch (e) {
    console.error(e);
  }
};
