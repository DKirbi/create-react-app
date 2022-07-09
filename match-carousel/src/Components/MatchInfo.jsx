import React from 'react'

function MatchInfo(props) {
  return (
    <div className="match-info">
        <h2 className="tournament-name">{props.tournamentName}</h2>
        <h3 className="category-name">{props.countryName}</h3>
  </div>
  )
}

export default MatchInfo