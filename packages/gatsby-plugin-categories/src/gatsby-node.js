import fs from "fs";
import slugify from "slug";

import defaultOptions from "./defaults";
import { pathify } from "./internals";

export const onCreateNode = ({ node, actions }, pluginOptions) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const { slugOptions } = {
      ...defaultOptions,
      ...pluginOptions
    };
    const {
      frontmatter: { category }
    } = node;

    if (!category) return;

    createNodeField({
      node,
      name: "category",
      value: slugify(category, { ...slugOptions })
    });
  }
};

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
  const pages = transformer(data);

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

  pages.forEach(({ fields }) => {
    if (fields && fields.category) {
      categorySet.add(fields.category);
    }
  });

  categorySet.forEach(category => {
    createPage({
      path: pathify(prefix, category),
      component: templatePath,
      context: {
        category
      }
    });
  });
};
