import React from "react"
import { Container } from "react-bootstrap"

const Footer = () => {
  return (
    <footer>
      <Container>
        &copy; {new Date().getFullYear()}{" "}
        <a href="https://northxsouth.co">
          North X South - Web Development Agency
        </a>{" "}
        &middot; Made with <a href="https://gatsbyjs.org">Gatsby</a>
      </Container>
    </footer>
  )
}

export default Footer
