import React from "react"
import { graphql } from "gatsby"
import { useSEO } from "../components/seo"

import LandingPage from "../components/landing-page"
import Layout from "../components/layout"

const IndexPage = ({ data }) => (
  <Layout fullWidth>
    <LandingPage data={data} />
  </Layout>
)

export default IndexPage

export function Head() {
  const seo = useSEO({ title: "Home", keywords: [`developer`, `android`, `blog`, `kotlin`, `contractor`] })
  return (
    <>
      <html lang={seo.htmlAttributes.lang} />
      <title>{seo.title}</title>
      {seo.meta.map((meta, i) => {
        if (meta.name) {
          return <meta key={i} name={meta.name} content={meta.content} />
        }
        if (meta.property) {
          return <meta key={i} property={meta.property} content={meta.content} />
        }
        return null
      })}
    </>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { draft: { eq: false } } }
      limit: 5
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            path
          }
          excerpt(pruneLength: 160)
        }
      }
    }
  }
`
