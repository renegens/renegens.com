import React from "react"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem 1rem;
  background-color: #000;
  color: #fff;
`

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
  color: #fff;
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #aaa;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`

const HeroRate = styled.p`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #4ade80;
  font-weight: bold;
`

const HeroAvailability = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #aaa;
`

const CurrentlyShipping = styled.div`
  margin-top: 2rem;
  text-align: left;
  max-width: 600px;
`

const ShippingItem = styled.p`
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  color: #aaa;
  
  &::before {
    content: "→ ";
    color: #4ade80;
  }
`

const CTAButton = styled.a`
  display: inline-block;
  background-color: #4ade80;
  color: #000;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 2rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #22c55e;
  }
`

const Section = styled.section`
  padding: 4rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    padding: 6rem 2rem;
  }
`

const ValuePropSection = styled(Section)`
  background-color: #000;
  color: #fff;
  text-align: center;
`

const ValuePropText = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.3;
  color: #fff;
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`

const ProblemsSection = styled(Section)`
  background-color: #111;
  color: #fff;
`

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #fff;
  text-align: center;
`

const ProblemsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const ProblemCard = styled.div`
  padding: 1.5rem;
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 4px;
`

const ProblemText = styled.p`
  color: #ddd;
  line-height: 1.6;
  margin: 0;
`

const ProofSection = styled(Section)`
  background-color: #000;
  color: #fff;
`

const ProofGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const ProofCard = styled.div`
  padding: 2rem;
  background-color: #111;
  border: 1px solid #333;
  border-radius: 4px;
`

const ProofTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #4ade80;
`

const ProofText = styled.p`
  color: #aaa;
  line-height: 1.6;
  margin-bottom: 0.5rem;
`

const TechBadgesSection = styled(Section)`
  background-color: #111;
  color: #fff;
  text-align: center;
`

const TechBadgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`

const TechBadge = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #1a1a1a;
  color: #4ade80;
  border: 1px solid #333;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.2s;
  
  &:hover {
    background-color: #222;
    border-color: #4ade80;
  }
`

const ArticlesSection = styled(Section)`
  background-color: #000;
  color: #fff;
`

const ArticlesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const ArticleLink = styled(Link)`
  display: block;
  padding: 1.5rem;
  background-color: #111;
  border: 1px solid #333;
  border-radius: 4px;
  text-decoration: none;
  color: #fff;
  transition: all 0.2s;
  
  &:hover {
    border-color: #4ade80;
    background-color: #1a1a1a;
  }
`

const ArticleTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #4ade80;
`

const FooterSection = styled(Section)`
  background-color: #000;
  color: #fff;
  text-align: center;
  padding-bottom: 4rem;
`

const FooterText = styled.p`
  color: #aaa;
  margin-bottom: 1rem;
  line-height: 1.8;
`

const FooterEmail = styled.a`
  color: #4ade80;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`

const LandingPage = ({ data }) => {
  const blogPosts = data?.allMarkdownRemark?.edges || []
  const latestPosts = blogPosts.slice(0, 5)

  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <HeroTitle>Senior Full-Stack Kotlin Contractor</HeroTitle>
        <HeroSubtitle>Android • KMP • SwiftUI iOS • Spring Boot</HeroSubtitle>
        {/* <HeroRate>$190–$230/hour • Remote only</HeroRate>
        <HeroAvailability>Available from February 2026</HeroAvailability> */}
        
        <CurrentlyShipping>
          <ShippingItem>Production KMP app (82% shared code) – launching Jan 2026</ShippingItem>
          <ShippingItem>Native SwiftUI iOS app – launching Dec 2025</ShippingItem>
        </CurrentlyShipping>
        
        {/* <CTAButton href="https://calendly.com" target="_blank" rel="noopener noreferrer">
          Book 15-min call →
        </CTAButton> */}
      </HeroSection>

      {/* Value Proposition */}
      <ValuePropSection>
        <ValuePropText>
          I deliver end-to-end Kotlin systems
        </ValuePropText>
      </ValuePropSection>

      {/* Problems I Solve */}
      <ProblemsSection>
        <SectionTitle>Problems I Solve</SectionTitle>
        <ProblemsGrid>
          <ProblemCard>
            <ProblemText>
              True full-stack Kotlin (mobile + Spring Boot 3 backend that never fights the client)
            </ProblemText>
          </ProblemCard>
          <ProblemCard>
            <ProblemText>
              KMP with 80–90% shared code while still using SwiftUI on iOS when it makes sense
            </ProblemText>
          </ProblemCard>
          <ProblemCard>
            <ProblemText>
              60 fps + tiny APKs on low-end devices
            </ProblemText>
          </ProblemCard>
          <ProblemCard>
            <ProblemText>
              Legacy Java → clean, maintainable Kotlin in weeks, not years
            </ProblemText>
          </ProblemCard>
          <ProblemCard>
            <ProblemText>
              Secure banking-grade compliance-ready architectures
            </ProblemText>
          </ProblemCard>
          <ProblemCard>
            <ProblemText>
              Backend APIs that are actually pleasant for mobile devs to consume
            </ProblemText>
          </ProblemCard>
        </ProblemsGrid>
      </ProblemsSection>

      {/* Tech Badges */}
      <TechBadgesSection>
        <SectionTitle>Technologies</SectionTitle>
        <TechBadgesContainer>
          <TechBadge as="span">Android</TechBadge>
          <TechBadge as="span">Kotlin</TechBadge>
          <TechBadge as="span">Jetpack Compose</TechBadge>
          <TechBadge as="span">KMP</TechBadge>
          <TechBadge as="span">SwiftUI</TechBadge>
          <TechBadge as="span">Spring Boot 3</TechBadge>
          <TechBadge as="span">Coroutines</TechBadge>
          <TechBadge as="span">Docker</TechBadge>
          <TechBadge as="span">Baseline Profiles</TechBadge>
          <TechBadge as="span">OpenAPI</TechBadge>
        </TechBadgesContainer>
      </TechBadgesSection>

      {/* Latest Articles */}
      <ArticlesSection>
        <SectionTitle>Latest Articles</SectionTitle>
        <ArticlesList>
          {latestPosts.length > 0 ? (
            latestPosts.map(({ node }) => (
              <ArticleLink key={node.id} to={node.frontmatter.path}>
                <ArticleTitle>{node.frontmatter.title}</ArticleTitle>
                {node.excerpt && <ProofText>{node.excerpt}</ProofText>}
              </ArticleLink>
            ))
          ) : (
            <>
              <ArticleLink to="/blog">
                <ArticleTitle>Shipping a production KMP app in 2025 – the real numbers</ArticleTitle>
              </ArticleLink>
              <ArticleLink to="/blog">
                <ArticleTitle>Why we kept SwiftUI for iOS (and still shared 100% logic)</ArticleTitle>
              </ArticleLink>
              <ArticleLink to="/blog">
                <ArticleTitle>60 fps on a $79 phone – exact config</ArticleTitle>
              </ArticleLink>
              <ArticleLink to="/blog">
                <ArticleTitle>GrapheneOS banking sandbox template</ArticleTitle>
              </ArticleLink>
              <ArticleLink to="/blog">
                <ArticleTitle>Full-stack Kotlin architecture + public repo</ArticleTitle>
              </ArticleLink>
            </>
          )}
        </ArticlesList>
      </ArticlesSection>

      {/* Footer */}
      <FooterSection>
        <FooterText>
          Remote contracts only • 6–12 months preferred
        </FooterText>
      </FooterSection>
    </>
  )
}

export default LandingPage

