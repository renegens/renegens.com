import React from "react"
import { useSEO } from "../components/seo"

import LandingBio from "../components/landing-bio"
import Layout from "../components/layout"

const IndexPage = () => (
  <Layout>
    <LandingBio />
  </Layout>
)

export default IndexPage

export function Head() {
  const seo = useSEO({ title: "Home", keywords: [`developer`, `android`, `blog`] })
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
