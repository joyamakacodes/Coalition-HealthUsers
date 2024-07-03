import React, { useEffect, useState } from 'react';
import search from '../assets/search_FILL0_wght300_GRAD0_opsz24.png';
import axios from 'axios';
import { token } from './data/axiosInstance';
import bars from '../assets/more_horiz_FILL0_wght300_GRAD0_opsz24.png';

const Sidebar = () => {
  const [patientData, setPatientData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fedskillstest.coalitiontechnologies.workers.dev', {
          headers: {
            'Authorization': `Basic ${token}`
          }
        });
        console.log('response', response);
        setPatientData(response.data);
        setActiveIndex(3)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-2xl my-6 sticky top-0 h-screen overflow-y-auto sidebar">
      <div className="p-4">
        <div className='flex justify-between items-center gap-x-32'>
          <h1 className="font-semibold text-xl">Patients</h1>
          <img src={search} alt="search icon" />
        </div>
        <div>
          {patientData.map(({ profile_picture, name, age, gender }, index) => (
            <div 
              key={index}
              className={`flex justify-between items-center my-4 p-2 rounded-lg cursor-pointer ${activeIndex === index ? 'bg-green-200' : ''}`}
            >
              <div className='flex items-center'>
                <img src={profile_picture} alt={name} className='w-10' />
                <div className='text-sm mx-2'>
                  <p className='font-semibold'>{name}</p>
                  <p className='text-gray-400'>{gender}, {age}</p>
                </div>
              </div>
              <div>
                <img src={bars} alt="bar icon" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
