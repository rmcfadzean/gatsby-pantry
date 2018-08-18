# gatsby-plugin-categories

Gatsby plugin to automatically create index pages for tagged content

## Install

`npm install --save gatsby-plugin-categories`

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
      resolve: "gatsby-plugin-categories",
      options: {
        templatePath: path.join(__dirname, '/src/templates/category.js')
      }
    }
  ],
}
```

```javascript
// src/templates/category.js

import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing";

export default class TagTemplate extends React.Component {
  render() {
    const { pageContext, data } = this.props;
    const { category } = pageContext;
    return (
      <Layout>
        <div className="tag-container">
          <Helmet title={`Posts in category "${category}"`} />
          <PostListing postEdges={data.allMarkdownRemark.edges} />
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { category: { eq: $category } } }
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
