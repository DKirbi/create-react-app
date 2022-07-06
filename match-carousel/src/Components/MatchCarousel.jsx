import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slide from './Slide';

function MatchCarousel() {
  useEffect(() => {
    getData();
  }, []);

  const [sports, setSports] = useState([]);

  const getData = async () => {
      try {
        const res = await axios.get(
          'https://lmt.fn.sportradar.com/demolmt/en/Etc:UTC/gismo/event_fullfeed/0/1/12074'
        );
        const sportCategories = res.data.doc[0].data;
        console.log(sportCategories);

        // for(let i = 0; i < sportCategories.length; i++) {
        //     console.log(sportCategories._id)
        // }

        setSports(sportCategories);
      } catch (err) {
        alert(err.message);
      }
    };

    return <>
        <div className="carousel">
        <Slide />
        <div className="navigation-dots"></div>
    </div>

        {sports.map((sport)=> (
                <li key="_id">
                    {sport.name + ' ' + sport._id }
                </li>
                
                // <Col sm={12} md={6} lg={4} key={sport.login.uuid} >
                //     <Contact contact={sport} />
                // </Col>
            ))
            }
    
    </>;
  };


export default MatchCarousel;
