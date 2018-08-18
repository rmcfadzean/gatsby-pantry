import fs from "fs";
import URL from "url";
import { kebabCase } from "lodash";

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
              category
            }
          }
        }
      }
    }
  `);

  if (!templatePath) {
    reporter.panic(`
      "templatePath" is a required option for gatsby-plugin-categories
    `);
  }

  if (!fs.existsSync(templatePath)) {
    reporter.panic(`
      The template path passed to gatsby-plugin-categories does not exist
      ${templatePath}
    `);
  }

  const categorySet = new Set();
  baseUrl = baseUrl || "/category/";

  posts.forEach(({ node: { frontmatter: { category } } }) => {
    if (category) {
      categorySet.add(category);
    }
  });

  Array.from(categorySet).forEach(category => {
    createPage({
      path: URL.resolve(baseUrl, kebabCase(category)),
      component: templatePath,
      context: {
        category
      }
    });
  });
};
