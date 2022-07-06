import React from 'react';

function Slide() {
  return (
    <div className="slide not-started">
      <div className="match-info">
        <h2 className="tournament-name">World Cup 2014 - Group A</h2>
        <h3 className="category-name">International</h3>
      </div>
      <div className="player-items">
        <div className="playing-teams">
          <img className="team-image" src="assets/canada.png" alt="germany" />
          <h1 className="country">Canada</h1>
          <h1 className="abbreviation">CAN</h1>
        </div>
        <div className="score">
          <p>VS</p>
          <p className="time">9:00</p>
          <p className="date">23/12/13</p>
        </div>
        <div className="playing-teams">
          <img className="team-image" src="assets/italy.png" alt="Italy" />
          <h1 className="country">Italy</h1>
          <h1 className="abbreviation">ITA</h1>
        </div>
      </div>
      <div className="match-state">
        <p>NOT STARTED</p>
      </div>
    </div>
  );
}

export default Slide;
