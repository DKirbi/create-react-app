import React from 'react'

function PlayingTeam(props) {
  return (
    <div className="playing-teams">
      <img className="team-image" src={props.crest} alt={props.crestAlt} />
      <h1 className="country">{props.teamName}</h1>
      <h1 className="abbreviation">{props.teamAbr}</h1>
    </div>
  )
}

export default PlayingTeam