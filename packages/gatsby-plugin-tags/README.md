# gatsby-plugin-tags

Gatsby plugin to automatically create index pages for tagged content

## Install

`npm install --save gatsby-plugin-tags`

## How to use

```javascript
// gatsby-config.js

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: path.join(__dirname, 'posts')
      }
    },
    {
      resolve: "gatsby-plugin-tags",
      options: {
        templatePath: path.join(__dirname, '/src/templates/tag.js')
      }
    }
  ],
}
```

```javascript
// src/templates/tag.js

import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing";

export default class TagTemplate extends React.Component {
  render() {
    const { pageContext, data } = this.props;
    const { tag } = pageContext;
    return (
      <Layout>
        <div className="tag-container">
          <Helmet title={`Posts tagged "${tag}"`} />
          <PostListing postEdges={data.allMarkdownRemark.edges} />
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
          }
        }
      }
    }
  }
`;

```
