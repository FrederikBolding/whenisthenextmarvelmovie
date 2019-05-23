import React from "react"

import SEO from "../components/seo"
import Countdown from '../components/Countdown.js';
import MadeWithLove from '../components/MadeWithLove.js'

import "../components/index.css"

const IndexPage = ({ pageContext: { nextMovie } }) => (
  <main>
    <SEO title="When is the next Marvel movie?" keywords={[`gatsby`, `application`, `react`, `marvel`, `superheroes`]} />
    <div className="App" style={{ backgroundImage: `url(http://image.tmdb.org/t/p/original/${nextMovie.backdrop_path})`, backgroundSize: "cover", backgroundPositionX: "center" }}>
        <div className="App-content">
          <h1>{nextMovie.title}</h1>
          <Countdown date={nextMovie.release_date}></Countdown>
          <MadeWithLove by="Frederik Bolding" link="https://frederikbolding.com" />
        </div>
      </div>
  </main>
)

export default IndexPage
