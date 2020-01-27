import React from "react"
import styled from "@emotion/styled"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TextListSection from "../components/text-list-section"

const Content = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 1.45rem 1.0875rem;
`

function UsesPage() {
  const data = useStaticQuery(graphql`
    query userJsonQuery {
      allUsesJson {
        edges {
          node {
            title
            items
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <SEO
        title="Uses Tech"
        keywords={[`uses`, `android`, `macbook`, "apple"]}
      />
      <Content>
        <h1>Uses</h1>
        {getUsesList(data)}
      </Content>
    </Layout>
  )
}

function getUsesList(data) {
  const usesArray = []
  data.allUsesJson.edges.forEach(item =>
    usesArray.push(
      <TextListSection
        title={item.node.title}
        items={item.node.items}
      ></TextListSection>
    )
  )
  return usesArray
}

export default UsesPage
