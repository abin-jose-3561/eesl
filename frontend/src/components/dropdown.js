import React, { useEffect,useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import DisplayData from './table'
import { Box, Button } from '@mui/material';

const Dropdown = ()=> {
    const [discom,setDiscom] = useState([])
    const [zone,setZone] = useState([])
    const [circle,setCircle] = useState([])
    const [division,setDivision] = useState([])
    const [subdivision,setSubdivision] = useState([])
    const [section,setSection] = useState([])
    
    const [selecteddiscom,setSelectedDiscom] = useState(null)
    const [selectedzone,setSelectedZone] = useState(null)
    const [selectedcircle,setSelectedCircle] = useState(null)
    const [selecteddivision,setSelectedDivision] = useState(null)
    const [selectedsubdivision,setSelectedSubDivision] = useState(null)
    const [selectedsection,setSelectedSection] = useState('')

  const [recentlyselected, setRecentlyselected] = useState('')
  const[showtable,setShowtable] = useState(false)
  const[optionname, setOptionname]= useState('')



//to get the values of discom
    useEffect(()=>{
        const fetchStates =async () =>{
            const response =await fetch("http://localhost:5000/discom");
            const data = await response.json();
            setDiscom(data)
        };
        fetchStates();
    },[]);

// when a discom is selected to get the zone dropdown values
    const handleStateChange = async (event, value) => {
        const selectedDiscom = value ? value.value : null;
        setSelectedDiscom(selectedDiscom)
        
        const office = value ? value.label : null;
        setRecentlyselected(office)
        setOptionname('discom')

        setSelectedZone(null)
        setSelectedCircle(null)
        setSelectedDivision(null)
        setSelectedSubDivision(null)
        setSelectedSection(null)
        setShowtable(false)
        const response = await fetch(`http://localhost:5000/discom/${selectedDiscom}`);
        const data = await response.json();
        setZone(data)
        console.log(selectedDiscom)
    };
    
    console.log(selecteddiscom)
    console.log("option name",optionname)
// when a zone is selected to get the circle dropdown values
    const handleZoneChange = async (event,value) => {
        const selectedZone = value ? value.value : null;
        setSelectedZone(selectedZone)

        const office = value ? value.label : null;
        setRecentlyselected(office)
        setOptionname('zone')

        setSelectedCircle('')
        setSelectedDivision('')
        setSelectedSubDivision('')
        setSelectedSection('')
        setShowtable(false)
        const response = await fetch(`http://localhost:5000/zone/${selectedZone}`);
            const data = await  response.json();
            setCircle(data)
    };

    console.log(selectedzone)
    // when a circle is selected to get the division dropdown values
    const handleCircleChange = async (event,value) => {
        const selectedCircle = value ? value.value : null;
        setSelectedCircle(selectedCircle)

        const office = value ? value.label : null;
        setRecentlyselected(office)
        setOptionname('circle')

        setSelectedDivision('')
        setSelectedSubDivision('')
        setSelectedSection('')
        setShowtable(false)
        const response =await fetch(`http://localhost:5000/circle/${selectedCircle}`);
            const data = await response.json();
            setDivision(data)
    };
    console.log(selectedcircle)
 // when a division is selected to get the subdivision dropdown values
     const handleDivisionChange = async (event,value) => {
        const selectedDiv = value ? value.value : null;
        setSelectedDivision(selectedDiv)

        const office = value ? value.label : null;
        setRecentlyselected(office)
        setOptionname('division')

        setSelectedSubDivision('')
        setSelectedSection('')
        setShowtable(false)
        const response =await fetch(`http://localhost:5000/division/${selectedDiv}`);
            const data = await response.json();
           setSubdivision(data)
           
    };
    console.log(selecteddivision)


// when a subdivision is selected to get the section dropdown values
const handleSubdivisionChange = async (event,value) => {
    const selectedSub = value ? value.value : null;
    setSelectedSubDivision(selectedSub)
    
    const office = value ? value.label : null;
        setRecentlyselected(office)
        setOptionname('subdivision')

    setSelectedSection('')
    setShowtable(false)
    const response =await fetch(`http://localhost:5000/sub/${selectedSub}`);
        const data = await response.json();
       setSection(data)
       
};
console.log(selectedsubdivision)

// // when a subdivision is selected to get the section dropdown values
// const handleSectionChange = async event => {
//     const selectedSection = event.target.value;
//     setSelectedSection(selectedSection)
//     setRecentlyselected(selectedSection)
//     setShowtable(false)
// };
console.log("recent",recentlyselected)


  return (

<Box>
    <Box align="center" display="flex" marginTop="20px" marginLeft="20px">
        <Autocomplete
      disablePortal
      id="combo-box-demo"
      onChange={handleStateChange}
      options={discom.map(option => ({value:option.sequence_id, label: option.office_id}))}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Discom" />}
    />
        {/* <select id="discom" name="discom" value={selecteddiscom} onChange={handleStateChange}>
        <option value="" disabled={selecteddiscom !== ''}>Select an option</option>
            {discom.map(discom =>(
                <option key = {discom.sequence_id} value={discom.sequence_id}>
                    {discom.office_id}
                </option>
            ))}
        </select> */}

&nbsp;&nbsp;&nbsp;&nbsp;

<Autocomplete
      disablePortal
      id="combo-box-demo"
      onChange={handleZoneChange}
      options={zone.map(option => ({value:option.sequence_id, label: option.office_id}))}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Zone" />}
      disabled={!selecteddiscom}
    />


 &nbsp;&nbsp;&nbsp;&nbsp;

 <Autocomplete
      disablePortal
      id="combo-box-demo"
      onChange={handleCircleChange}
      options={circle.map(option => ({value:option.sequence_id, label: option.office_id}))}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Circle" />}
      disabled={!selectedzone}
    />
&nbsp;&nbsp;&nbsp;&nbsp;

<Autocomplete
      disablePortal
      id="combo-box-demo"
      onChange={handleDivisionChange}
      options={division.map(option => ({value:option.sequence_id, label: option.office_id}))}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Division" />}
      disabled={!selectedcircle}
    />

&nbsp;&nbsp;&nbsp;&nbsp;

<Autocomplete
      disablePortal
      id="combo-box-demo"
      onChange={handleSubdivisionChange}
      options={subdivision.map(option => ({value:option.sequence_id, label: option.office_id}))}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="SUB Division" />}
      disabled={!selecteddivision}
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



        <br/><br/>
        <Button variant="contained"  type="submit" value="Fetch" onClick={(e) => setShowtable(true)}>FETCH</Button>
        <br/><br/>
        </Box>
        {showtable && <DisplayData recent={recentlyselected} option={optionname}/> }
    

        </Box>
  )
}

export default Dropdown;