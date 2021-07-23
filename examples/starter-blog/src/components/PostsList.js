import React from "react"
import PostsListCard from "./PostsListCard"

const PostsList = ({ postEdges }) => {
  postEdges.sort((a, b) => {
    const dateA = new Date(a.node.frontmatter.date)
    const dateB = new Date(b.node.frontmatter.date)
    return dateB - dateA
  })
  return postEdges.map(({ node }) => {
    return <PostsListCard key={node.fields.slug} {...node} />
  })
}

export default PostsList
