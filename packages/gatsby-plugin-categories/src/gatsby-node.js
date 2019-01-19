import fs from "fs";
import URL from "url";
import { kebabCase, lowerCase } from "lodash";
import defaultOptions from "./defaults";

// eslint-disable-next-line import/prefer-default-export
export const createPages = async (
  { graphql, actions, reporter },
  pluginOptions
) => {
  const { createPage } = actions;
  const { templatePath, prefix, query, transformer } = {
    ...defaultOptions,
    ...pluginOptions
  };

  const data = await graphql(query);
  const posts = transformer(data);

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

  posts.forEach(({ frontmatter: { category } }) => {
    if (category) {
      categorySet.add(lowerCase(category));
    }
  });

  categorySet.forEach(category => {
    createPage({
      path: URL.resolve(prefix, kebabCase(category)),
      component: templatePath,
      context: {
        category
      }
    });
  });
};
