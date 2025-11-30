/**
 * SEO hook that queries for data with Gatsby's useStaticQuery React hook
 * Returns props for use in Gatsby's Head export
 *
 * See: https://www.gatsbyjs.org/docs/reference/built-in-components/gatsby-head/
 */

import { useStaticQuery, graphql } from "gatsby"

export function useSEO({ description, lang = `en`, meta = [], keywords = [], title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const fullTitle = title ? `${title} | ${site.siteMetadata.title}` : site.siteMetadata.title

  const metaTags = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title || site.siteMetadata.title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata.author,
    },
    {
      name: `twitter:title`,
      content: title || site.siteMetadata.title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ]

  if (keywords.length > 0) {
    metaTags.push({
      name: `keywords`,
      content: keywords.join(`, `),
    })
  }

  return {
    htmlAttributes: { lang },
    title: fullTitle,
    meta: metaTags.concat(meta),
  }
}
