import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slide, { notStarted, matchStates, secondHalf, halftime, ended, firstHalf } from './Slide';
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa';



function MatchCarousel() {
  useEffect(() => {
    getData();
  }, []);




  const [country, setCountry] = useState([]);
  const [matchInfo, setMatchInfo] = useState([]);
  const [Matches, setSoccerMatch] = useState([]);
  const [sports, setSports] = useState([]);
  const [current, setCurrent] = useState(0);
  const getData = async () => {
      try {
        const res = await axios.get(
          'https://lmt.fn.sportradar.com/demolmt/en/Etc:UTC/gismo/event_fullfeed/0/1/12074'
        );
        const sportCategories = res.data.doc[0].data;
        
        //Gets all Countries for sport Soccer
        const soccer = sportCategories[0].realcategories;
        
        

        //returns all the soccerMatch matches
        const soccerMatch = soccer.map(function(match) {
          return (match.tournaments[0].matches[0]);
        });
        

        const soccerMatchTournaments = soccer.map(function(match) {
          return (match.tournaments[0]);
        });
        // console.log(soccerMatchTournaments);
        setCountry(soccer);
        // setMatchInfo(soccerMatchTournaments);
        // setSoccerMatch(soccerMatch);
        // const teamAwayNames = soccerMatch.map(function(matchData) {
        //   return ( matchData.map(function(anotherMatchData) {
        //     return (anotherMatchData.teams.away.name);
        //   }));
        // });
        // const teamAwayNames = soccerMatch.map(function(matchData) {
        //   return ( matchData.map(function(anotherMatchData) {
        //     return (anotherMatchData.teams.away)

        //   }));
        // });
        
        

        // console.log(teamAwayNames);
        // setTeamAwayName(teamAwNameList)

        // const tournaments = soccer.map(function(soccerTournaments) {
        //   return (soccerTournaments.tournaments)
          
        // })

       
        // console.log(sportCategories);
        // console.log(soccer);  
        // for(let i = 0; i < sportCategories.length; i++) {
        //     console.log(sportCategories._id)
        // }


        // setSports(sportCategories);  // Gets all the sports

       

       

//With this hook we save all the sport countries into the 'sports' variable
        setSports(soccer);
        
       
        // soccer.map(function(element) {
        //   console.log(element.tournaments[0].matches);


        // }) 


      } catch (err) {
        alert(err.message);
      }
      
    };
//////END OF AXIOS SCHTEBACLE!!!

    // console.log(Matches);




    const length = sports.length;

     const nextSlide = () => {
      setCurrent(current === length - 1 ? 0 : current + 1)
    }
   
    // console.log(current);
    
    return (
      <>
        <div className="carousel">
          <Slide />
          <div className="navigation-dots"></div>
        </div>

        <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
        {/* {sports.map((sport, index) => {
          return (
            <div>
              <li key={index}>{sport.name}</li>
            </div>
          );
        })} */}

        {country.map((countries) => {
          return (
            <>
            <li>{(countries.tournaments[0].name) + ' - ' + (countries.tournaments[0].seasontypename)}</li>
            <li>{countries.name}</li>
            <li>{countries.tournaments[0].matches[0].teams.away.name}<img src={'https://img.sportradar.com/ls/crest/big/'+ countries.tournaments[0].matches[0].teams.away.uid + '.png'} /></li>
            <li>{countries.tournaments[0].matches[0].teams.home.name}<img src={'https://img.sportradar.com/ls/crest/big/'+ countries.tournaments[0].matches[0].teams.home.uid + '.png'} /></li>
            <li>{countries.tournaments[0].matches[0].status.name}</li>
            <li>{countries.tournaments[0].matches[0]._dt.time}</li>
            <li>{countries.tournaments[0].matches[0]._dt.date}</li>
            
            
            </>
          )
        })

        }
        {matchInfo.map((matchInf) => {
          return (
            <>
               <li>{(matchInf.name) + ' - ' + (matchInf.seasontypename) }</li>
               <li>{matchInf.matches[0].teams.away.name}</li>
               <li>{matchInf.matches[0].status.name}</li>
               <li>{matchInf.matches[0]._dt.time}</li>
               <li>{matchInf.matches[0]._dt.date}</li>
            </>
           
          );
        })}
        
        {Matches.map((match) => {
          return (
            <div>
              <li key={match.teams.away.uid} className="red">{match.teams.away.name} <img src={'https://img.sportradar.com/ls/crest/big/'+ match.teams.away.uid + '.png'} /></li>
              <li key={match.teams.home.uid} className="green">{match.teams.home.name} <img src={'https://img.sportradar.com/ls/crest/big/'+ match.teams.home.uid + '.png'} /></li>
              <p>{match.status.name}</p>
              <p>{match._dt.time}</p>
              <p>{match._dt.date}</p>
            </div>
          );
        })}
        
        {/* {teamAwayName.map((tAway, index) => {
          return (
            <li key={index}>
              {tAway}
            </li>
          );
        })} */}
      </>
    );
  };


export default MatchCarousel;
