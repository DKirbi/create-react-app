import React, { useEffect, useState } from 'react';
import MatchInfo from './MatchInfo';
import axios from 'axios';
import PlayingTeam from './PlayingTeam';
import Score from './Score';
import MatchState from './MatchState';
export let matchStates;
export let secondHalf;
export let halftime;
export let firstHalf;
export let ended;
export let notStarted;
function Slide(props) {

  useEffect(() => {
    getData();
  }, []);
  const [isEnded, setEnded] = useState(false);
  
    

  const [country, setCountry] = useState([]);
  const [current, setCurrent] = useState(0);
  const getData = async () => {
    try {
      const res = await axios.get(
        'https://lmt.fn.sportradar.com/demolmt/en/Etc:UTC/gismo/event_fullfeed/0/1/12074'
      );
      const sportCategories = res.data.doc[0].data;
      
      //Gets all Countries for sport Soccer
      const soccer = sportCategories[0].realcategories;
      console.log(soccer.length);
    
      // console.log(soccerMatchTournaments);
      setCountry(soccer);
    } catch (err) {
      alert(err.message);
    }
    
  }
  return (
    <>
    {country.map((countries) => {
      
      matchStates = countries.tournaments[0].matches[0].status.name;
    
      secondHalf = matchStates === '2nd half';
      halftime = matchStates === 'Halftime';
      ended = matchStates === 'Ended';
      firstHalf = matchStates === '1st half';
      notStarted = matchStates === 'Not started';

    
    
    
      return (
        <>
            <div className={`slide not-startedBg ${ended ? 'endedBg' : ' '} ${halftime || secondHalf ? 'liveBg' : ''}`}>
              <MatchInfo 
                tournamentName={(countries.tournaments[0].name) + ' - ' + (countries.tournaments[0].seasontypename)}
                countryName={countries.name}
              />
              <div className="player-items">
                <PlayingTeam 
                  crest={'https://img.sportradar.com/ls/crest/big/'+ (countries.tournaments[0].matches[0].teams.home.uid) + '.png'}
                  crestAlt={countries.tournaments[0].matches[0].teams.home.abbr}
                  teamName={countries.tournaments[0].matches[0].teams.home.name} 
                  teamAbr={countries.tournaments[0].matches[0].teams.home.abbr}
                  />
                <Score 
                  time={countries.tournaments[0].matches[0]._dt.time}
                  date={countries.tournaments[0].matches[0]._dt.date}
                />
                <PlayingTeam 
                  crest={'https://img.sportradar.com/ls/crest/big/'+ (countries.tournaments[0].matches[0].teams.away.uid) + '.png'}
                  crestAlt={countries.tournaments[0].matches[0].teams.away.abbr}
                  teamName={countries.tournaments[0].matches[0].teams.away.name} 
                  teamAbr={countries.tournaments[0].matches[0].teams.away.abbr}
                />
              </div>
              <MatchState 
                matchState={countries.tournaments[0].matches[0].status.name}
                secondHalf={secondHalf ? 'mstate-sh' : ' '}
                ended={ended ? 'mstate-end' : ' '}
                halftime={halftime ? 'mstate-sh' : ''}
                className='bob'
              />
            </div>
            <div> 
              <p>Navigation dots</p>
            </div>
        </>
      );
  
  
    })}
    </>
  )
}

export default Slide;
