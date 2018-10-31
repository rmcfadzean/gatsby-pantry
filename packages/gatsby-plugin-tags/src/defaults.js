export default {
  query: `
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `,
  prefix: "/tags/",
  transformer: ({ data }) =>
    data.allMarkdownRemark.edges.map(({ node }) => node)
};
