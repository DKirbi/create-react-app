import React from 'react'

function MatchState(props) {
  return (
    <div className={`match-state ${props.halftime} ${props.secondHalf} ${props.ended}`} >
        <p>{props.matchState}</p>
    </div>
  )
}

export default MatchState