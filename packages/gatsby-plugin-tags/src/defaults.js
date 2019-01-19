export default {
  query: `
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              tags
            }
          }
        }
      }
    }
  `,
  prefix: "/tags/",
  transformer: ({ data }) =>
    data.allMarkdownRemark.edges.map(({ node }) => node),
  slugOptions: {
    lower: true
  }
};
