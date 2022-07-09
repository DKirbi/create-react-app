import React from 'react';
import MatchInfo from './MatchInfo';
import PlayingTeam from './PlayingTeam';
import Score from './Score';

function Slide() {
  return (
    <>
        <div className="slide not-started">
          <MatchInfo />
          <div className="player-items">
            <PlayingTeam />
            <Score />
            <PlayingTeam />
          </div>
          <div className="match-state">
            <p>NOT STARTED</p>
          </div>
        </div>
        <div> 
          <p>Navigation dots</p>
        </div>
    </>
  );
}

export default Slide;
