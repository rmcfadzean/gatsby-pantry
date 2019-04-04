import React from "react"
import { Link, graphql } from "gatsby"
import { Container, Row, Col, Card } from "react-bootstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostTemplate = ({ location, data, pageContext }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Container>
        <Row>
          <Col md={8}>
            <article>
              <h1 className="mt-4">{post.frontmatter.title}</h1>

              <p className="lead">
                by
                <a href="#">Start Bootstrap</a>
              </p>

              <hr />
              <p>Posted on {post.frontmatter.date}</p>

              <hr />

              <img
                className="img-fluid rounded"
                src="http://placehold.it/900x300"
                alt=""
              />

              <hr />

              <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </article>
          </Col>

          <Col md={4}>
            {post.fields.category && (
              <Card className="my-4">
                <Card.Header>Filed Under</Card.Header>
                <Card.Body>
                  <Link to={`/category/${post.fields.category}`}>
                    {post.fields.category}
                  </Link>
                </Card.Body>
              </Card>
            )}
            {post.fields.tags && (
              <Card className="my-4">
                <Card.Header>Tags</Card.Header>
                <Card.Body>
                  {post.fields.tags.map(tag => (
                    <Link to={`/tag/${tag}`}>{tag}</Link>
                  ))}
                </Card.Body>
              </Card>
            )}
            <Card>
              <Card.Header>See our other posts</Card.Header>
              <Card.Body>
                {previous && (
                  <Link
                    to={previous.fields.slug}
                    rel="prev"
                    className="btn btn-secondary"
                  >
                    ← {previous.frontmatter.title}
                  </Link>
                )}

                {next && (
                  <Link
                    to={next.fields.slug}
                    rel="next"
                    className="btn btn-secondary"
                  >
                    {next.frontmatter.title} →
                  </Link>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
      fields {
        category
        tags
      }
    }
  }
`

export default BlogPostTemplate
