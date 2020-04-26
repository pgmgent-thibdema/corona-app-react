import React, {useEffect, useState} from 'react';
import { fetchGetData } from './fetch';
import './UI.css';
export const UI = () => {
  const URL_CORONA = 'https://api.thevirustracker.com/free-api?countryTotal=BE';
  const time = 1000;


  const [currentData, setData] = useState(null);

  useEffect(() => {
    const getDataCountry = async () => {
      const lol = await fetchGetData(URL_CORONA);
      let formattedData = [];
      lol.countrydata.forEach(element => {
        formattedData = Object.entries(element);
      });

      setData(formattedData);
    }
    getDataCountry();
    const getDataEveryTimeMS = setInterval(() => getDataCountry(), time);

    return () => clearInterval(getDataEveryTimeMS);
  }, [])

  const Content = ({data}) => {

    return(
      <tr className='row'>
        <td className='name'>{data[0]}</td>
        <td className='number'>{data[1]}</td>
      </tr>
    );
  }

  return(
    <div className='stats'>
      <h1>{ !!currentData && currentData[0][1].title}</h1>
      <table className='list'>
        { !!currentData && currentData.map((coronaProp, index) => {
            if(index !== 0) {
              return <Content key={index} data={coronaProp}/>
            }
        })}
      </table>
    </div>
  )
};