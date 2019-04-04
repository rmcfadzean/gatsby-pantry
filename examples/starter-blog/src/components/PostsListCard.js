import React from "react"
import { Link } from "gatsby"
import { Card } from "react-bootstrap"

const PostsListCard = ({ frontmatter, fields, excerpt }) => {
  const title = frontmatter.title || fields.slug

  return (
    <Card className="mb-4">
      <Card.Body>
        <h2 className="card-title">{title}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: frontmatter.description || excerpt,
          }}
        />
        <Link to={`/${fields.slug}/`} className="btn btn-primary">
          Read More &rarr;
        </Link>
      </Card.Body>
      <Card.Footer className="text-muted">
        Posted on {frontmatter.date}
      </Card.Footer>
    </Card>
  )
}

export default PostsListCard
