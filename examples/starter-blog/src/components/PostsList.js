import React from "react"
import PostsListCard from "./PostsListCard"

const PostsList = ({ postEdges }) => {
  return postEdges.map(({ node }) => {
    return <PostsListCard key={node.fields.slug} {...node} />
  })
}

export default PostsList
