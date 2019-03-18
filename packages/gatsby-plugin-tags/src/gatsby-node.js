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
      frontmatter: { tags }
    } = node;

    if (!tags) return;

    createNodeField({
      node,
      name: "tags",
      value: tags.map(tag => slugify(tag, { ...slugOptions }))
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

  pages.forEach(({ fields }) => {
    if (fields && fields.tag) {
      fields.tags.forEach(tag => tagSet.add(tag));
    }
  });

  tagSet.forEach(tag => {
    createPage({
      path: pathify(prefix, tag),
      component: templatePath,
      context: {
        tag
      }
    });
  });
};
