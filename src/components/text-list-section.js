import styled from "@emotion/styled"
import PropTypes from "prop-types"
import React from "react"

const Section = styled.div`
  text-align: left;
  margin-bottom: 10px;
`

const NameHeader = styled.h3`
  display: inline;
  border-radius: 1em 0 1em 0;
  background-image: linear-gradient(
    -100deg,
    rgba(255, 250, 150, 0.15),
    rgba(255, 250, 150, 0.8) 100%,
    rgba(255, 250, 150, 0.25)
  );
`

const Description = styled.ul`
  padding: 10px;
  font-size: 1.1rem;
`

const TextListSection = ({ title, items }) => (
  <Section>
    <NameHeader>{title}</NameHeader>
    <Description>
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </Description>
  </Section>
)

NameHeader.propTypes = {
  title: PropTypes.string,
}
Description.propTypes = {
  items: PropTypes.array,
}

export default TextListSection
