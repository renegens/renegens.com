import { Link } from "gatsby"
import styled from "@emotion/styled"
import PropTypes from "prop-types"
import React from "react"

const Content = styled.div`
  max-width: 860px;
  padding: 1rem 1.0875rem;
  font-size: 1.2rem;
  color: #fff;
`

const NavLink = styled(Link)`
  color: #fff;
  margin-left: 15px;
  text-decoration: none;
  display: inline-block;
  position: relative;

  ::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #4ade80;
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  :hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
  
  &:hover {
    color: #4ade80;
  }
`

const GitHubLink = styled.a`
  color: #fff;
  margin-left: 15px;
  text-decoration: none;
  display: inline-block;
  position: relative;

  ::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #4ade80;
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  :hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
  
  &:hover {
    color: #4ade80;
  }
`

const HomeLink = styled(NavLink)`
  margin-left: 0;
`

const SiteHeader = styled.header`
  background: #000;
  display: flex;
  align-content: center;
  justify-content: center;
  border-bottom: 1px solid #333;
`

const Header = ({ siteTitle }) => (
  <SiteHeader>
    <Content>
      <p>
        <HomeLink to="/">{siteTitle}</HomeLink>
        <GitHubLink href="https://www.adviceworthgiving.com" target="_blank">
          Author
        </GitHubLink>
        <NavLink to="/blog">Blog</NavLink>
        <GitHubLink href="https://github.com/renegens" target="_blank">
          GitHub
        </GitHubLink>
        <GitHubLink href="https://www.linkedin.com/in/renegens" target="_blank">
          LinkedIn
        </GitHubLink>
      </p>
    </Content>
  </SiteHeader>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
