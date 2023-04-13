import React, { useEffect,useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import DisplayData from './table'
import { Box, Button } from '@mui/material';

const Dropdown = ()=> {
    const [GSS,setGSS] = useState([])
    const [thirtythree,setThirtythree] = useState([])
    const [substation,setSubstation] = useState([])
    const [eleven,setEleven] = useState([])
    const [DT,setDT] = useState([])
    // const [section,setSection] = useState([])
    
    const [selecteddiscom,setSelectedDiscom] = useState([])
    const [selectedzone,setSelectedZone] = useState([])
    const [selectedcircle,setSelectedCircle] = useState(null)
    const [selecteddivision,setSelectedDivision] = useState(null)
    const [selectedsubdivision,setSelectedSubDivision] = useState(null)
    // const [selectedsection,setSelectedSection] = useState('')

  const [optiondiscom, setOptiondiscom] = useState(null)
  const [optionzone, setOptionzone] = useState(null)
  const [optioncircle, setOptioncircle] = useState(null)
  const [optiondivision, setOptiondivision] = useState(null)
  const [optionsubdivision, setOptionsubdivision] = useState(null)

  const[showtable,setShowtable] = useState(false)
 



//to get the values of discom
    useEffect(()=>{
        const fetchStates =async () =>{
            const response =await fetch("http://localhost:5000/discom");
            const data = await response.json();
            setDiscom(data)
            const response1 =await fetch("http://localhost:5000/zone");
            const data1 = await response1.json();
            setZone(data1)
            const response2 =await fetch("http://localhost:5000/circle");
            const data2 = await response2.json();
            setCircle(data2)
            const response3 =await fetch("http://localhost:5000/division");
            const data3 = await response3.json();
            setDivision(data3)
            const response4 =await fetch("http://localhost:5000/subdivision");
            const data4 = await response4.json();
            setSubdivision(data4)

        };
        fetchStates();
    },[]);

// when a discom is selected to get the zone dropdown values
const handleStateChange = async (event, value) => {
    const selectedDiscoms = value.map((v) => v.value); // get an array of selected values
    setSelectedDiscom(selectedDiscoms);
    console.log(selectedDiscoms)

    const offices = value.map((v) => v.label); // get an array of selected labels
    setOptiondiscom(offices.join(",")); // join the array with a comma and space separator
    setShowtable(false);
    
    
    const response = await fetch(`http://localhost:5000/discom/discom/${selectedDiscoms}`);
    const data = await  response.json();
    setZone(data);
    const response1 = await fetch(`http://localhost:5000/discom/zone/${selectedDiscoms}`);
    const data1 = await  response1.json();
    setCircle(data1);
    const response2 = await fetch(`http://localhost:5000/discom/circle/${selectedDiscoms}`);
    const data2 = await  response2.json();
    setDivision(data2);
    const response3 = await fetch(`http://localhost:5000/discom/division/${selectedDiscoms}`);
    const data3 = await  response3.json();
    setSubdivision(data3);
  };

    console.log(selecteddiscom)


// when a zone is selected to get the circle dropdown values

    const handleZoneChange = async (event,value) => {
        const selectedZones =  value.map((v) => v.value); // get an array of selected values
        setSelectedZone(selectedZones)

        const offices = value.map((v) => v.label); // get an array of selected labels
        setOptionzone(offices.join(","));
    

        
        setShowtable(false)

        const response = await fetch(`http://localhost:5000/zone/zone/${selectedZones}`);
        const data = await  response.json();
        setCircle(data)
        const response1 = await fetch(`http://localhost:5000/zone/circle/${selectedZones}`);
        const data1 = await  response1.json();
        setDivision(data1)
        const response2 = await fetch(`http://localhost:5000/zone/division/${selectedZones}`);
        const data2 = await  response2.json();
        setSubdivision(data2)
    };

    console.log(selectedzone)


// when a circle is selected to get the division dropdown values

    const handleCircleChange = async (event,value) => {
        const selectedCircles = value.map((v) => v.value); // get an array of selected values
        setSelectedCircle(selectedCircles)

        const offices = value.map((v) => v.label);
        setOptioncircle(offices.join(","));
       

        
        setShowtable(false)

        const response =await fetch(`http://localhost:5000/circle/circle/${selectedCircles}`);
        const data = await response.json();
        setDivision(data)
        const response1 =await fetch(`http://localhost:5000/circle/division/${selectedCircles}`);
        const data1 = await response1.json();
        setSubdivision(data1)
    };
    console.log(selectedcircle)


 // when a division is selected to get the subdivision dropdown values
     const handleDivisionChange = async (event,value) => {
        const selectedDivs = value.map((v) => v.value);
        setSelectedDivision(selectedDivs)

        const offices = value.map((v) => v.label);
        setOptiondivision(offices.join(","))
      

        setShowtable(false)
        const response =await fetch(`http://localhost:5000/division/division/${selectedDivs}`);
            const data = await response.json();
           setSubdivision(data)
           
    };
    console.log(selecteddivision)


// when a subdivision is selected to get the section dropdown values
const handleSubdivisionChange = async (event,value) => {
    const selectedSubs = value.map((v) => v.value);
    setSelectedSubDivision(selectedSubs)
    
    const offices = value.map((v) => v.label);
    setOptionsubdivision(offices.join(",s"))
       

    setShowtable(false)

    // const response =await fetch(`http://localhost:5000/sub/${selectedSub}`);
    //     const data = await response.json();
    //    setSection(data)
       
};
console.log(selectedsubdivision)

// // when a subdivision is selected to get the section dropdown values
// const handleSectionChange = async event => {
//     const selectedSection = event.target.value;
//     setSelectedSection(selectedSection)
//     setRecentlyselected(selectedSection)
//     setShowtable(false)
// };



  return (

<Box>
    <Box align="center" display="flex" marginTop="20px" marginLeft="20px">
        <Autocomplete
        multiple
      disablePortal
      id="combo-box-demo"
      onChange={handleStateChange}
      options={discom.map(option => ({value:option.sequence_id, label: option.office_id}))}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Discom" />}
    />
    

&nbsp;&nbsp;&nbsp;&nbsp;

<Autocomplete
    multiple
      disablePortal
      id="combo-box-demo"
      onChange={handleZoneChange}
      options={zone.map(option => ({value:option.sequence_id, label: option.office_id}))}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Zone" />}
      
    />


 &nbsp;&nbsp;&nbsp;&nbsp;

 <Autocomplete
      multiple
      disablePortal
      id="combo-box-demo"
      onChange={handleCircleChange}
      options={circle.map(option => ({value:option.sequence_id, label: option.office_id}))}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Circle" />}
     
    />
&nbsp;&nbsp;&nbsp;&nbsp;

<Autocomplete
      multiple
      disablePortal
      id="combo-box-demo"
      onChange={handleDivisionChange}
      options={division.map(option => ({value:option.sequence_id, label: option.office_id}))}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Division" />}
 
    />

&nbsp;&nbsp;&nbsp;&nbsp;

<Autocomplete
    multiple
      disablePortal
      id="combo-box-demo"
      onChange={handleSubdivisionChange}
      options={subdivision.map(option => ({value:option.sequence_id, label: option.office_id}))}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="SUB Division" />}

    />
        
&nbsp;&nbsp;&nbsp;&nbsp;

        {/* <label htmlFor="section">Section:</label> 
        <select  id ="section" name="section" value={selectedsection} onChange={handleSectionChange}>
        <option value="" disabled={selectedsection !== ''}>Select an option</option>
            {section.map(je_section =>(
                <option key = {je_section.sequence_id} value={je_section.sequence_id}>
                    {je_section.office_id}
                </option>
            ))}
        </select>  */}

</Box>

        <br/><br/>
        <Button variant="contained"  type="submit" value="Fetch" onClick={(e) => setShowtable(true)}>FETCH</Button>
        <br/><br/>
       
        {showtable && <DisplayData discom={optiondiscom} zone={optionzone} circle={optioncircle} division={optiondivision} subdivision={optionsubdivision} /> }
    

        </Box>
  )
}

export default Dropdown;