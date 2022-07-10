import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import MatchInfo from './MatchInfo';
import MatchState from './MatchState';
import PlayingTeam from './PlayingTeam';
import Score from './Score';
let matchStates;
let secondHalf;
let halftime;
let firstHalf;
let ended;
let notStarted;

function MatchCarousel(props) {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(
        'https://lmt.fn.sportradar.com/demolmt/en/Etc:UTC/gismo/event_fullfeed/0/1/12074'
      );
      const sportCategories = res.data.doc[0].data;

      let soccer = sportCategories[0].realcategories.slice(0,10);

     
      setSlide(soccer);

      //With this hook we save all the sport slides into the 'sports' variable
      // setSports(soccer);
    } catch (err) {
      alert(err.message);
    }
  };

  const [slide, setSlide] = useState([]);
  const [current, setCurrent] = useState(0);

  const length = slide.length;
  // console.log(length);
  const autoScroll = true;
  let slideInterval;
  let intervalTime = 3000;

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
  }, [current]);
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
    console.log(current);
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  // let indicatorContainer = document.querySelector('.navigation-dots');
  // let indicators = [];
  // for(let i = 0; i < length; i++) {
  //   const dot = document.createElement('div');
  //   indicatorContainer.appendChild(dot);
  //   indicators.push(dot);
  // }

  // slide.forEach(function(_el, _i) {
  //   const dot = document.createElement('div');
  //   indicatorContainer.appendChild(dot);
  //   indicators.push(dot);
  // }); 


  

  return (
    <>
      <div className="carousel">
        <button onClick={nextSlide}>click me</button>
        {slide.map((slides, index) => {
          matchStates = slides.tournaments[0].matches[0].status.name;
          secondHalf = matchStates === '2nd half';
          halftime = matchStates === 'Halftime';
          ended = matchStates === 'Ended';
          firstHalf = matchStates === '1st half';
          notStarted = matchStates === 'Not started';

          return (
            <>
              <div
                className={`${
                  index === current
                    ? 'slide active not-startedBg'
                    : 'slide not-startedBg'
                } 
                  ${ended && 'endedBg'} 
                  ${halftime || secondHalf && 'liveBg'}
                  `}
                key={index}
              >
                {index === current && (
                  <>
                    <MatchInfo
                      tournamentName={
                        slides.tournaments[0].name +
                        ' - ' +
                        slides.tournaments[0].seasontypename
                      }
                      countryName={slides.name}
                    />
                    <div className="player-items">
                      <PlayingTeam
                        crest={
                          'https://img.sportradar.com/ls/crest/big/' +
                          slides.tournaments[0].matches[0].teams.home.uid +
                          '.png'
                        }
                        crestAlt={
                          slides.tournaments[0].matches[0].teams.home.abbr
                        }
                        teamName={
                          slides.tournaments[0].matches[0].teams.home.name
                        }
                        teamAbr={
                          slides.tournaments[0].matches[0].teams.home.abbr
                        }
                      />
                      <Score
                        time={slides.tournaments[0].matches[0]._dt.time}
                        date={slides.tournaments[0].matches[0]._dt.date}
                      />
                      <PlayingTeam
                        crest={
                          'https://img.sportradar.com/ls/crest/big/' +
                          slides.tournaments[0].matches[0].teams.away.uid +
                          '.png'
                        }
                        crestAlt={
                          slides.tournaments[0].matches[0].teams.away.abbr
                        }
                        teamName={
                          slides.tournaments[0].matches[0].teams.away.name
                        }
                        teamAbr={
                          slides.tournaments[0].matches[0].teams.away.abbr
                        }
                      />
                    </div>
                    <MatchState
                      matchState={
                        slides.tournaments[0].matches[0].status.name
                      }
                      secondHalf={secondHalf ? 'mstate-sh' : ' '}
                      ended={ended ? 'mstate-end' : ' '}
                      halftime={halftime ? 'mstate-sh' : ''}
                    />
                  </>
                )}

              </div>
              
            </>
          );
        })}
      </div>

      <div className="navigation-dots"></div>
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
    </>
  );
}

export default MatchCarousel;
