import React from "react"

import { StaticQuery, graphql } from "gatsby"

import SEO from "../components/seo"
import BackgroundImage from 'gatsby-background-image'
import Countdown from '../components/Countdown.js';
import MadeWithLove from '../components/MadeWithLove.js'
import GithubCorner from "react-github-corner";


import "../components/index.css"

const IndexPage = () => (
  <StaticQuery
    query={graphql`
    query backgroundImageQuery {
      allBackgroundImage(sort: {
        fields: [release_date]
        order: ASC
      }) {
        edges {
          node {
            title,
            release_date
            localImage {
              childImageSharp {
                fluid(maxHeight: 10000, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    `}
    render={data => {
      let movie = data.allBackgroundImage.edges.filter(x => new Date(x.node.release_date) > new Date())[0].node;
      return (
  <main>
    <SEO title="When is the next Marvel movie?" keywords={[`gatsby`, `application`, `react`, `marvel`, `superheroes`]} />
    <BackgroundImage className="App" fluid={movie.localImage.childImageSharp.fluid}>
        <div className="App-content">
          <h1>{movie.title}</h1>
          <Countdown date={movie.release_date}></Countdown>
          <MadeWithLove by="Frederik Bolding" link="https://frederikbolding.com" />
          <GithubCorner href="https://github.com/FrederikBolding/whenisthenextmarvelmovie" />
        </div>
      </BackgroundImage>
  </main>)}
} />)

export default IndexPage
