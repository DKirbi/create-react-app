import React from 'react'

function Score(props) {
  return (
    <div className="score">
        <p>VS</p>
        <p className="time">{props.time}</p>
        <p className="date">{props.date}</p>
    </div>
  )
}

export default Score