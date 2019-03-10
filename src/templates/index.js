import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Countdown from '../components/Countdown.js';
import MadeWithLove from '../components/MadeWithLove.js'

import "../components/index.css"

const IndexPage = ({ pageContext: { nextMovie } }) => (
  <Layout>
    <SEO title="When is the next Marvel movie?" keywords={[`gatsby`, `application`, `react`, `marvel`]} />
    <div className="App" style={{ backgroundImage: `url(http://image.tmdb.org/t/p/original/${nextMovie.backdrop_path})`, backgroundSize: "cover" }}>
        <header className="App-header">
          <h1>{nextMovie.title}</h1>
          <Countdown date={nextMovie.release_date}></Countdown>
          <MadeWithLove by="Frederik Bolding" link="https://frederik.bolding.com" />
        </header>
      </div>
  </Layout>
)

export default IndexPage
