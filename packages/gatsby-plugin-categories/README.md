# gatsby-plugin-categories

**DEPRECATED/UNSUPPORTED but PRs are welcome**

Gatsby plugin to automatically create index pages for tagged content

## Install

`yarn add gatsby-plugin-categories`

## How to use

See [the example](https://github.com/rmcfadzean/gatsby-pantry/tree/master/examples/starter-blog#readme)

1. Install gatsby-plugin-categories.
2. Add `src/components/PostsList.js`,  `src/components/PostsListCard.js`, `src/templates/category.js`.
3. edit `gatsby-config.js`.
4. Add posts category.
5. Add links to categories page wherever you want.

### Install gatsby-plugin-categories

`yarn add gatsby-plugin-categories`

### Add 3files

You must add 3files.
`src/components/PostList.js`([example](../examples/starter-blog/src/components/PostList.js)), `src/components/PostListCard.js`([example](../examples/starter-blog/src/components/PostListCard.js)), `src/templates/category.js`([example](../examples/starter-blog/src/templeates/category.js))

If you don't use `gatsby-starter-blog`, file path may be different.

If you want to change order of articles, please sort `postEdges` in `src/componetns/PostList.js`

### Edit gatsby-config.js

```js
plugins: [
  {
    resolve: "gatsby-plugin-categories",
    options: {
      templatePath: `${__dirname}/src/templates/category.js`,
    },
  }
]
```

### Add links to categories page

categories page path is `/category/yourcategory`

If you want to add link in blog post, edit `blog-post.js`.

1. Edit pageQuery. [example](../examples/starter-blog/src/templates/blog-post.js#117)
2. Add Link. [example](../examples/starter-blog/src/templates/blog-post.js#47)

### Options

You can view the defaults in [`defaults.js`](https://github.com/rmcfadzean/gatsby-pantry/blob/master/packages/gatsby-plugin-categories/src/defaults.js)
