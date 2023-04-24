import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import logo from './white.png';
import './App.css';
import DropdownOptions from './components/dropdown';
import NetDropdown from './components/netdropdown';
import Layout from './components/Layout';



export default function App() {
  // const [value, setValue] = React.useState(0);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  return (
    <Layout>
        {/* <Box sx={{ width: '100%'}} align="center">
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="hierarchy tabs"
      >
        <Tab label="Org Hierarchy" />
        <Tab label="Net Hierarchy" />
      </Tabs>
      {value === 0 && <DropdownOptions />}
      {value === 1 && <NetDropdown/>}
        </Box> */}
        </Layout>
      

  );
}


