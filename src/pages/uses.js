import React from "react"

import LandingBio from "../components/landing-bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Uses Tech" keywords={[`uses`, `android`, `macbook`, 'apple']} />
    <h1>Uses Tech</h1>
    <h3>Macbook Pro 13"</h3>
  </Layout>
)

export default IndexPage
