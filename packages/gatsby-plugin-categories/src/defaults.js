export default {
  query: `{
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            category
          }
        }
      }
    }
  }`,
  prefix: "/category/",
  transformer: ({ data }) =>
    data.allMarkdownRemark.edges.map(({ node }) => node)
};
