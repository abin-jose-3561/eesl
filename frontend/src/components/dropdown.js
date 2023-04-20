import React, { useEffect,useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import DisplayData from './table'
import { Box, Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Dropdown = ()=> {

    //For storing the data in an array when an option is selected
    const [discom,setDiscom] = useState([])
    const [zone,setZone] = useState([])
    const [circle,setCircle] = useState([])
    const [division,setDivision] = useState([])
    const [subdivision,setSubdivision] = useState([])
    // const [lastread, setLastread]= useState([])

//For storing the selected option's sequence ids 
    const [selecteddiscom,setSelectedDiscom] = useState(null)
    const [selectedzone,setSelectedZone] = useState(null)
    const [selectedcircle,setSelectedCircle] = useState(null)
    const [selecteddivision,setSelectedDivision] = useState(null)
    const [selectedsubdivision,setSelectedSubDivision] = useState(null)
    // const [selectedlast,setSelectedLast] = useState(null)

// For storing the selected option names
  const [optionname, setOptionname] = useState({
    optiondiscom : '',
    optionzone : '',
    optioncircle : '',
    optiondivision : '',
    optionsubdivision : ''
  })

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
    let Discoms;
    let Labeldiscom
    if (value.some((v) => v.value === "All")) {
        Discoms = discom.filter((v) => v.office_id !== "All").map((v) => v.sequence_id).join(",");
        setSelectedDiscom(Discoms);

        Labeldiscom = discom.filter((v) => v.office_id !== "All").map((v) => v.office_id).join(",");
        setOptionname({
            ...optionname,
            optiondiscom : Labeldiscom
        });
      } 
      else{
    Discoms = value.map((v) => v.value); // get an array of selected values
    setSelectedDiscom(Discoms.join(","));
    console.log(Discoms)

    Labeldiscom = value.map((v) => v.label); // get an array of selected labels
    setOptionname({
        ...optionname,
        optiondiscom : Labeldiscom.join(",")
    });
      }
    
    setShowtable(false);

    
    const response = await fetch(`http://localhost:5000/discom/discom/${Discoms}`);
    const data = await  response.json();
    setZone(data);
    const response1 = await fetch(`http://localhost:5000/discom/zone/${Discoms}`);
    const data1 = await  response1.json();
    setCircle(data1);
    const response2 = await fetch(`http://localhost:5000/discom/circle/${Discoms}`);
    const data2 = await  response2.json();
    setDivision(data2);
    const response3 = await fetch(`http://localhost:5000/discom/division/${Discoms}`);
    const data3 = await  response3.json();
    setSubdivision(data3);
  };

    console.log("Selected Discom",selecteddiscom)
  

// when a zone is selected to get the circle dropdown values
const handleZoneChange = async (event, value) => {
   let Zones;
   let Labelzone;
    if (value.some((v) => v.value === "All")) {
        Zones = zone.filter((v) => v.office_id !== "All").map((v) => v.sequence_id).join(",");
        setSelectedZone(Zones);

        Labelzone = zone.filter((v) => v.office_id !== "All").map((v) => v.office_id).join(",");
        setOptionname({
            ...optionname,
            optionzone : Labelzone});
      }
      else {
      Zones = value.map((v) => v.value);
      setSelectedZone(Zones.join(","));

      Labelzone = value.map((v) => v.label);
    setOptionname({
        ...optionname,
        optionzone : Labelzone.join(",")});
      }

      if(selecteddiscom === null){

        const response =await fetch("http://localhost:5000/discom");
        const data = await response.json();
        setDiscom(data)
      }
      

    setShowtable(false);

    const responsedis = await fetch(`http://localhost:5000/zone/discom/${Zones}` );
    const datadis = await responsedis.json();
    setDiscom(datadis);

    const response = await fetch(`http://localhost:5000/zone/zone/${Zones}` );
    const data = await response.json();
    setCircle(data);

    const response1 = await fetch(`http://localhost:5000/zone/circle/${Zones}`);
    const data1 = await response1.json();
    setDivision(data1);

    const response2 = await fetch(`http://localhost:5000/zone/division/${Zones}`);
    const data2 = await response2.json();
    setSubdivision(data2);
};

console.log("Selected Zone", selectedzone)
console.log(discom)



// when a circle is selected to get the division dropdown values

    const handleCircleChange = async (event,value) => {
        let Circles;
        let Labelcircle;
        if (value.some((v) => v.value === "All")) {
            Circles = circle.filter((v) => v.office_id !== "All").map((v) => v.sequence_id).join(",");
            setSelectedCircle(Circles);

        Labelcircle = circle.filter((v) => v.office_id !== "All").map((v) => v.office_id).join(",");
        setOptionname({
            ...optionname,
            optioncircle : Labelcircle
        });
          }
          else {
          // otherwise, get an array of selected values and labels as before

        Circles = value.map((v) => v.value); // get an array of selected values
        setSelectedCircle(Circles.join(","))

        Labelcircle = value.map((v) => v.label);
        setOptionname({
            ...optionname,
            optioncircle : Labelcircle.join(",")
        });
          }

        setShowtable(false);
        const response =await fetch(`http://localhost:5000/circle/circle/${Circles}`);
        const data = await response.json();
        setDivision(data)
        const response1 =await fetch(`http://localhost:5000/circle/division/${Circles}`);
        const data1 = await response1.json();
        setSubdivision(data1)
    };
    console.log("Selected Circle",selectedcircle)
   

 // when a division is selected to get the subdivision dropdown values
     const handleDivisionChange = async (event,value) => {
        let Divisions;
        let Labeldiv;
       
        if (value.some((v) => v.value === "All")) {
            Divisions = division.filter((v) => v.office_id !== "All").map((v) => v.sequence_id).join(",");
            setSelectedDivision(Divisions);

        Labeldiv = division.filter((v) => v.office_id !== "All").map((v) => v.office_id).join(",");
        setOptionname({
            ...optionname,
            optiondivision : Labeldiv});

        console.log("labeldiv",Labeldiv)
          }
          else {
        Divisions = value.map((v) => v.value);
        setSelectedDivision(Divisions.join(","))

        Labeldiv = value.map((v) => v.label);
        setOptionname({
            ...optionname,
            optiondivision : Labeldiv.join(",")});
          }

        setShowtable(false)
        const response =await fetch(`http://localhost:5000/division/division/${Divisions}`);
            const data = await response.json();
           setSubdivision(data)
           
    };
    console.log("Selected Division",selecteddivision)
   

// when a subdivision is selected to get the section dropdown values
const handleSubdivisionChange = async (event,value) => {
    let Subdivisions;
    let Labelsub
    if (value.some((v) => v.value === "All")) {
        Subdivisions = subdivision.filter((v) => v.office_id !== "All").map((v) => v.sequence_id).join(",");
        setSelectedSubDivision(Subdivisions);

        Labelsub = subdivision.filter((v) => v.office_id !== "All").map((v) => v.office_id).join(",");
        setOptionname({
            ...optionname,
            optionsubdivision : Labelsub});
      }
      else {
    Subdivisions = value.map((v) => v.value);
    setSelectedSubDivision(Subdivisions.join(","))
    
    Labelsub = value.map((v) => v.label);
    setOptionname({
        ...optionname,
        optionsubdivision : Labelsub.join(",")});
       
      }
    setShowtable(false)

};

console.log("Selected Subdivision",selectedsubdivision)
console.log("Selected Option Names",optionname)

  return (
    <> 
<Accordion>
<AccordionSummary
//expandIcon={<ExpandMoreIcon />
 aria-controls="panel1a-content"
 id="panel1a-header"
>
<Typography>Organization Hierarchy Filters</Typography>
 </AccordionSummary>
 <AccordionDetails>

    <Box align="center" display="flex" marginTop="20px" marginLeft="20px">

        <Autocomplete
        multiple
      disablePortal
      id="combo-box-demo"
      onChange={handleStateChange}
      options={[    ...(discom.length > 0 ? [{ value: "All", label: "ALL" }] : []),
      ...discom.map((option) => ({
        value: option.sequence_id,
        label: option.office_id,
      })),
    ]}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Discom" />}
      isOptionEqualToValue={(option, value) => option.value === value.value}
    />
    

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

<Autocomplete
  multiple
  disablePortal
  id="combo-box-demo"
  onChange={handleZoneChange}
  options={[
    ...(zone.length > 0 ? [{ value: "All", label: "ALL" }] : []),
    ...zone.map((option) => ({
      value: option.sequence_id,
      label: option.office_id,
    })),
  ]}
  sx={{ width: 200 }}
  renderInput={(params) => <TextField {...params} label="Zone" />}
  isOptionEqualToValue={(option, value) => option.value === value.value}
/>


 &nbsp;&nbsp;&nbsp;&nbsp;

 <Autocomplete
      multiple
      disablePortal
      id="combo-box-demo"
      onChange={handleCircleChange}
      options={[
        ...(circle.length > 0 ? [{ value: "All", label: "ALL" }] : []),
        ...circle.map((option) => ({
          value: option.sequence_id,
          label: option.office_id,
        })),
      ]}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Circle" />}
      isOptionEqualToValue={(option, value) => option.value === value.value}
     
    />
&nbsp;&nbsp;&nbsp;&nbsp;

<Autocomplete
      multiple
      disablePortal
      id="combo-box-demo"
      onChange={handleDivisionChange}
      options={[
        ...(division.length > 0 ? [{ value: "All", label: "ALL" }] : []),
        ...division.map((option) => ({
          value: option.sequence_id,
          label: option.office_id,
        })),
      ]}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Division" />}
      isOptionEqualToValue={(option, value) => option.value === value.value}
 
    />

&nbsp;&nbsp;&nbsp;&nbsp;

<Autocomplete
    multiple
      disablePortal
      id="combo-box-demo"
      onChange={handleSubdivisionChange}
      options={[
        ...(subdivision.length > 0 ? [{ value: "All", label: "ALL" }] : []),
        ...subdivision.map((option) => ({
          value: option.sequence_id,
          label: option.office_id,
        })),
      ]}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="SUB Division" />}
      isOptionEqualToValue={(option, value) => option.value === value.value}

    />
        

</Box>
</AccordionDetails>

</Accordion>

        <br/><br/>
        <Button variant="contained"  type="submit" value="Fetch" onClick={(e) => setShowtable(true)}>FETCH</Button>
        <br/><br/>
       
        {showtable && <DisplayData optionname={optionname} /> }

        </>
  )
}

export default Dropdown;