export default {
  query: `{
    allMarkdownRemark {
      edges {
        node {
          fields {
            category
          }
        }
      }
    }
  }`,
  prefix: "/category/",
  transformer: ({ data }) =>
    data.allMarkdownRemark.edges.map(({ node }) => node),
  slugOptions: {
    lower: true
  }
};
