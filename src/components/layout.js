/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"

import Header from "./header"
import "./layout.css"

const Content = styled.div`
  margin: 0 auto;
  max-width: ${props => props.fullWidth ? '100%' : '860px'};
  padding: ${props => props.fullWidth ? '0' : '0 1.0875rem 1rem'};
  padding-top: 0;
`

const GatsbyLink = styled.a`
  margin-left: 5px;
`

const Footer = styled.footer`
  display: flex;
  justify-content: center;
`

const Layout = ({ children, fullWidth = false }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Content fullWidth={fullWidth}>
          <main>{children}</main>
          {!fullWidth && (
            <Footer>
              © {new Date().getFullYear()}, Built with
              {` `}
              <GatsbyLink href="https://www.gatsbyjs.org">Gatsby</GatsbyLink>
            </Footer>
          )}
        </Content>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
}

export default Layout
