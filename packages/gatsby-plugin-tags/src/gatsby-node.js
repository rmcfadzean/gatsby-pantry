import fs from "fs";
import URL from "url";
import { kebabCase } from "lodash";
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

  posts.forEach(({ frontmatter: { tags } }) => {
    if (tags) {
      tags.forEach(tag => tagSet.add(tag));
    }
  });

  tagSet.forEach(tag => {
    createPage({
      path: URL.resolve(prefix, kebabCase(tag)),
      component: templatePath,
      context: {
        tag
      }
    });
  });
};
