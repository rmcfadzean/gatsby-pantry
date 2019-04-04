import React from "react"
import { Nav, Container } from "react-bootstrap"
import { Link } from "gatsby"
import Footer from "./Footer"
import "../assets/stylesheets/style.scss"

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <Container>
          <Nav>
            <Nav.Item>
              <Nav.Link to="/" as={Link}>
                Home
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
