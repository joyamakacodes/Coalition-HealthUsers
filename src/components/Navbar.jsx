import React from 'react';
import logo from '../assets/TestLogo.png';
import homeIcon from '../assets/home_FILL0_wght300_GRAD0_opsz24.png';
import people from '../assets/group_FILL0_wght300_GRAD0_opsz24.png';
import seniorDoc from '../assets/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc.png';
import setting from '../assets/settings_FILL0_wght300_GRAD0_opsz24.png';
import bars from '../assets/more_vert_FILL0_wght300_GRAD0_opsz24.png'

const Navbar = () => {
  const links = [
    {
      icon: homeIcon,
      page: 'Overview',
    },
    {
      icon: people,
      page: 'Patients',
    },
    {
      icon: homeIcon,
      page: 'Schedule',
    },
    {
      icon: homeIcon,
      page: 'Message',
    },
    {
      icon: homeIcon,
      page: 'Transactions',
    },
  ];

  return (
    <nav className='flex justify-between items-center px-10 py-4 bg-white' style={{borderRadius: '50px'}}>
      <div>
        <img src={logo} alt='logo' className='h-8 w-auto ' />
      </div>
      <ul className='flex gap-6 '>
        {links.map(({ icon, page }) => (
          <li key={page} className='flex items-center gap-2'>
            <img src={icon} alt={page} className='h-5 w-5' />
            <p>{page}</p>
          </li>
        ))}
      </ul>
      <div className='flex justify-between items-center gap-4'>
        <img src={seniorDoc} alt="woman" />
        <div>
          <p className='font-semibold'>Dr. Jose Simmons</p>
          <p className='text-gray-400'>General Practitioner</p>
        </div>
        <img src={setting} alt="sttibng" />
        <img src={bars} alt="bars" />
      </div>
      
    </nav>
  );
};

export default Navbar;
