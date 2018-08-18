import fs from "fs";
import URL from "url";

// eslint-disable-next-line import/prefer-default-export
export const createPages = async (
  { graphql, actions, reporter },
  { templatePath, baseUrl }
) => {
  const { createPage } = actions;

  const {
    data: {
      allMarkdownRemark: { edges: posts }
    }
  } = await graphql(`
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
  `);

  if (!templatePath) {
    reporter.panic(`
      "templatePath" is a required option for gatsby-plugin-tags
    `);
  }

  if (!fs.existsSync(templatePath)) {
    reporter.panic(`
      The template path passed to gatsby-plugin-tags does not exist
      ${templatePath}
    `);
  }

  const tagSet = new Set();
  baseUrl = baseUrl || "/tags/";

  posts.forEach(({ node: { frontmatter: { tags } } }) => {
    if (tags) {
      tagSet.add(tags);
    }
  });

  Array.from(tagSet)[0].forEach(tag => {
    createPage({
      path: URL.resolve(baseUrl, tag),
      component: templatePath,
      context: {
        tag
      }
    });
  });
};
