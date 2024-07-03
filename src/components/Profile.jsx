import React, {useEffect, useState} from 'react';
import birth from '../assets/BirthIcon.png';
import femaleIcon from '../assets/FemaleIcon.png'
import phone from '../assets/PhoneIcon.png';
import cross from '../assets/InsuranceIcon.png'
import axios from 'axios';
import { token } from './data/axiosInstance';
import download from '../assets/download_FILL0_wght300_GRAD0_opsz24 (1).png'

const Profile = () => {
  const [patientData, setPatientData] = useState({});
  useEffect(()=>{
    const fetchData= async ()=>{
      try{
        const response = await axios.get(
          "https://fedskillstest.coalitiontechnologies.workers.dev",
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        );
        const allresponses = response.data
        setPatientData(allresponses[3])

      }catch{

      }
    }
    fetchData()
  },[])
  const {
    name,
    date_of_birth,
    gender,
    insurance_type,
    emergency_contact,
    phone_number,
    profile_picture
  } = patientData;
const labTests= ['Blood Tests', 'CT Scans', 'Radiology Reports', 'X-Rays', 'Urine Test']
  return (
    <div >

<div className='rounded-2xl my-4 pr-10 pl-2 py-4  bg-white font-semibold w-[300px] h-[500px]'>
  <div className='flex flex-col items-center '>
  <img src={profile_picture} alt="patient" />
  <div>
  <h1 className='text-xl'>{name}</h1>

  </div>
  </div>
 
  <div className='text-sm'>
    <div className='flex gap-2 items-center my-2'>
      <img src={birth} alt="icon" />
      <div>
        <p >Date of Birth</p>
        <p>{date_of_birth}</p>
      </div>
    </div>
    <div className='flex gap-2 items-center my-2'>
      <img src={femaleIcon} alt="icon" />
      <div>
        <p>Gender</p>
        <p>{gender}</p>
      </div>
    </div>
    <div className='flex gap-2 items-center my-2'>
      <img src={phone} alt="icon" />
      <div>
        <p>Contact Info</p>
        <p>{phone_number}</p>
      </div>
    </div>
    <div className='flex gap-2 items-center my-2'>
      <img src={phone} alt="icon" />
      <div>
        <p>Emergency Contact</p>
        <p>{emergency_contact}</p>
      </div>
    </div>
    <div className='flex gap-2 items-center my-2'>
      <img src={cross} alt="icon" />
      <div>
        <p>Insurance Provider</p>
        <p>{insurance_type}</p>
      </div>
    </div>
    <button className='bg-[#01F0D0] px-4 py-2 rounded-2xl mx-auto my-6 flex flex-col'>Show all information</button>
  </div>
</div>
<div className='bg-white p-4 rounded-lg h-[200px] overflow-y-auto sidebar'>
      <h1 className='text-2xl font-semibold'>Lab Test</h1>
      {labTests.map((test, index)=>(
        <div key={index} className='flex justify-between items-center my-4 h-[20px]'>
          <h1>{test}</h1>
          <img src={download} alt="download" />

        </div>
      ))}
    </div>

    </div>
  )
}

export default Profile