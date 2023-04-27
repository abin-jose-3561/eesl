import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import logo from './white.png';
import './App.css';
import DropdownOptions from './components/dropdown';
import NetDropdown from './components/netdropdown';
import Layout from './components/Layout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Paper } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    
    primary: {
      main: '#1976d2',
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#white',
    },
  },
});

export default function App() {

  const [theme, setTheme] = React.useState(darkTheme)

  const handleThemeChange = () => {
    if(theme === darkTheme){
        setTheme(lightTheme)
    }else{
        setTheme(darkTheme)
    }
  }
  // const [value, setValue] = React.useState(0);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex"
      alignItems="center"
      justifyContent="center"
      height="200vh">
      <Paper style={{ width: '100%', height: '100%',}}>
      <Layout theme={theme} handleThemeChange={handleThemeChange}/>
      </Paper>
      </Box>
    </ThemeProvider>

      

  );
}


