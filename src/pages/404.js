import React from "react"
import { useSEO } from "../components/seo"

import Layout from "../components/layout"

const NotFoundPage = () => (
  <Layout>
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
)

export default NotFoundPage

export function Head() {
  const seo = useSEO({ title: "404: Not found" })
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
