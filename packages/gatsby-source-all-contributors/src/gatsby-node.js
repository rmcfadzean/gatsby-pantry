/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { createRemoteFileNode } from "gatsby-source-filesystem";
import fs from "fs-extra";
import path from "path";

export const sourceNodes = async (gatsby, pluginOptions = {}) => {
  const {
    actions,
    createNodeId,
    createContentDigest,
    store,
    cache,
    reporter
  } = gatsby;
  const { createNode } = actions;

  const { rcPath = "./.all-contributorsrc" } = pluginOptions;

  const contributorsRcPath = path.resolve(rcPath);

  const contributorsRcData = await fs.readFile(contributorsRcPath, "utf-8");

  const { contributors } = JSON.parse(contributorsRcData);

  await Promise.all(
    contributors.map(async contributor => {
      const id = createNodeId(`contributors__${contributor.login}`);
      let fileNode;
      try {
        fileNode = await createRemoteFileNode({
          url: contributor.avatar_url,
          parentNodeId: id,
          store,
          cache,
          ext: ".jpg",
          createNode,
          createNodeId,
          reporter
        });
      } catch (e) {
        reporter.panic(e);
      }

      if (fileNode) {
        contributor.avatar___NODE = fileNode.id;
      }

      const nodeContent = JSON.stringify(contributor);

      const nodeMeta = {
        id,
        internal: {
          type: `Contributor`,
          content: nodeContent,
          contentDigest: createContentDigest(contributor)
        }
      };

      const node = { ...contributor, ...nodeMeta };

      createNode(node);
    })
  );
};
