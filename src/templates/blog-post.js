import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import { useSEO } from "../components/seo"

const Content = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 1.45rem 1.0875rem;
`

const MarkedHeader = styled.h1`
  display: inline;
  color: #fff;
`

const HeaderDate = styled.h3`
  margin-top: 10px;
  color: #aaa;
`

// STYLE THE TAGS INSIDE THE MARKDOWN HERE
const MarkedContent = styled.div`
  color: #fff;
  
  a {
    text-decoration: none;
    color: #4ade80;
    transition: color 0.2s;
    
    &:hover {
      color: #22c55e;
      text-decoration: underline;
    }
  }
`

const BlogPost = ({ data }) => {
  if (!data || !data.markdownRemark) {
    return (
      <Layout>
        <Content>
          <p>Post not found.</p>
        </Content>
      </Layout>
    )
  }

  const post = data.markdownRemark
  return (
    <Layout>
      <Content>
        <MarkedHeader>{post.frontmatter?.title || "Untitled"}</MarkedHeader>
        <HeaderDate>
          {post.frontmatter?.date || ""}
          {post.fields?.readingTime && ` - ${post.fields.readingTime.text}`}
        </HeaderDate>
        {post.html && (
          <MarkedContent dangerouslySetInnerHTML={{ __html: post.html }} />
        )}
      </Content>
    </Layout>
  )
}

export default BlogPost

export function Head({ data }) {
  // Call hook unconditionally at the top level
  const post = data?.markdownRemark
  const seo = useSEO({
    title: post?.frontmatter?.title || "Post not found",
    description: post?.frontmatter?.description || post?.excerpt,
  })
  
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

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      excerpt(pruneLength: 160)
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        path
        title
      }
      fields {
        slug
      }
    }
  }
`
