import React, { useEffect,useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import DisplayData from './table'
import { Box, Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../App.css'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Dropdown  () {


    //For storing the data in an array when an option is selected
    const [discom,setDiscom] = useState([])
    const [zone,setZone] = useState([])
    const [circle,setCircle] = useState([])
    const [division,setDivision] = useState([])
    const [subdivision,setSubdivision] = useState([])
    const [lastread, setLastread]= useState([])
    const [lastcommdate,setLastcommdate]=useState([])
    const [value, setValue] = useState(dayjs("2022-11-24T21:11:54"));
    const [value1, setValue1] = useState(dayjs("2022-11-24T21:11:54"));
    

//For storing the selected option's sequence ids 
    const [selecteddiscom,setSelectedDiscom] = useState('')
    const [selectedzone,setSelectedZone] = useState('')
    const [selectedcircle,setSelectedCircle] = useState('')
    const [selecteddivision,setSelectedDivision] = useState('')
    const [selectedsubdivision,setSelectedSubDivision] = useState('')
    const [selectedlast,setSelectedLast] = useState('')
    const [selectedlastcommdate,setSelectedLastcommdate] =useState('')


// For storing the selected option names
  const [optionname, setOptionname] = useState({
    optiondiscom : '',
    optionzone : '',
    optioncircle : '',
    optiondivision : '',
    optionsubdivision : '',
    optionlastread : '',
    optionlastcommdate:'',
    optiondate:'',
    optiondate1:''
  })

  const[showtable,setShowtable] = useState(false)
 
 
 

//to get the values of discom

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

    const response5 =await fetch("http://localhost:5000/lastread");
    const data5 = await response5.json();
    setLastread(data5)

    const response6 =await fetch("http://localhost:5000/lastcommdate");
    const data6 = await response6.json();
    setLastcommdate(data6)

};
    useEffect(()=>{
      if(selecteddiscom==='' && selectedzone==='' && selectedcircle==='' && selecteddivision==='' && selectedsubdivision===''){
        fetchStates();
      }

    },[selecteddiscom,selectedzone,selectedcircle,selecteddivision,selectedsubdivision]);

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

        const responsed =await fetch(`http://localhost:5000/circle/discom/${Circles}`);
        const datad = await responsed.json();
        setDiscom(datad)

        const responsez =await fetch(`http://localhost:5000/circle/zone/${Circles}`);
        const dataz = await responsez.json();
        setZone(dataz)
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
        const responsed =await fetch(`http://localhost:5000/division/discom/${Divisions}`);
        const datad = await responsed.json();
        setDiscom(datad)
        const responsez =await fetch(`http://localhost:5000/division/zone/${Divisions}`);
        const dataz = await responsez.json();
        setZone(dataz)
        const responsec =await fetch(`http://localhost:5000/division/circle/${Divisions}`);
        const datac = await responsec.json();
        setCircle(datac)
           
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
  
    const responsed =await fetch(`http://localhost:5000/subdivision/discom/${Subdivisions}`);
    const datad = await responsed.json();
    setDiscom(datad)
    const responsez =await fetch(`http://localhost:5000/subdivision/zone/${Subdivisions}`);
    const dataz = await responsez.json();
    setZone(dataz)
    const responsec =await fetch(`http://localhost:5000/subdivision/circle/${Subdivisions}`);
    const datac = await responsec.json();
    setCircle(datac)
    const responsediv =await fetch(`http://localhost:5000/subdivision/division/${Subdivisions}`);
    const datadiv = await responsediv.json();
    setDivision(datadiv)

};

// when a lasst read is selected to get the section dropdown values
const handleLastreadChange = async (event,value) => {
  let lastreadids;
  let Labellast
  if (value.some((v) => v.value === "All")) {
      lastreadids = lastread.filter((v) => v.lastread_status!== "All").map((v) => v.diff).join(",");
      setSelectedLast(lastreadids);

      Labellast = lastread.filter((v) => v.lastread_status !== "All").map((v) => v.lastread_status).join(",");
      setOptionname({
          ...optionname,
          optionlastread : Labellast});
    }
    else {
  lastreadids = value.map((v) => v.value);
  setSelectedLast(lastreadids.join(","))
  
  Labellast = value.map((v) => v.label);
  setOptionname({
      ...optionname,
      optionlastread : Labellast.join(",")});
     
    }
  setShowtable(false)

};
console.log(lastread)
console.log("selected lastread",selectedlast)

console.log("Selected Subdivision",selectedsubdivision)
console.log("Selected Option Names",optionname)

//when a lastcommunication date is selected to set the dropdowns
const handleLastcommdateChange = async (event,value) => {

  let lastdate;
  let Labellastdate
  
  if (value.some((v) => v.value === "All")) {
  //  lastdate = lastcommdate.filter((v) => v.last_commdate!== "All").map((v) => v.diff).join(",");
  // setSelectedLastcommdate(lastdate);
  
   Labellastdate = lastcommdate.filter((v) => v.last_commdate !== "All").map((v) => v.last_commdate).join(",");
  setOptionname({
   ...optionname,
  optionlastcommdate : Labellastdate});
  
  }
  
else {
  
  // lastdate = value.map((v) => v.value);
  // setSelectedLastcommdate(lastdate.join(","))
  Labellastdate = value.map((v) => v.label);
   setOptionname({
   ...optionname,
   optionlastcommdate : Labellastdate.join(",")});
   }
   setShowtable(false)
 
  };


 
 //date change

 const handleDateChange = (e) => {
  setShowtable(false)
  setValue(e);
  console.log("date", e)
  const formatteddate = dayjs(e).format('YYYY-MM-DD');
  console.log("FormatedDate",formatteddate)

  setOptionname({
    ...optionname,
    optiondate : formatteddate,
});
  
};

 const handleDateChange1 = (e) => {
    setShowtable(false);
    setValue1(e);
    const formatteddate1=dayjs(e).format('YYYY-MM-DD');
    console.log("formatteddate1",formatteddate1)
      setOptionname({
    ...optionname,
    optiondate1 : formatteddate1
 });
 };

  return (
    <> 
     
<Accordion>
<AccordionSummary
//expandIcon={<ExpandMoreIcon />
expandIcon={<ExpandMoreIcon />}
 aria-controls="panel1a-content"
 id="panel1a-header"
>
<Typography>Organization Hierarchy Filters</Typography>
 </AccordionSummary>
 <AccordionDetails>

    <Box align="center" display="flex" marginTop="20px" marginLeft="20px">
    <div className="dropdown">

      

        <Autocomplete
        multiple
      id="checkboxes-tags-demo"
      onChange={handleStateChange}
      options={[    ...(discom.length > 0 ? [{ value: "All", label: "ALL" }] : []),
      ...discom.map((option) => ({
        value: option.sequence_id,
        label: option.office_id,
      })),
    ]}
    disableCloseOnSelect
      getOptionLabel={(option) => option.label}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.label}
        </li>
      )}

      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Discom" />}
      isOptionEqualToValue={(option, value) => option.value === value.value}
    />
    

<Autocomplete
  multiple
  id="checkboxes-tags-demo"
  onChange={handleZoneChange}
  options={[
    ...(zone.length > 0 ? [{ value: "All", label: "ALL" }] : []),
    ...zone.map((option) => ({
      value: option.sequence_id,
      label: option.office_id,
    })),
  ]}
  disableCloseOnSelect
      getOptionLabel={(option) => option.label}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.label}
        </li>
      )}
  sx={{ width: 200 }}
  renderInput={(params) => <TextField {...params} label="Zone" />}
  isOptionEqualToValue={(option, value) => option.value === value.value}
/>


 <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      onChange={handleCircleChange}
      options={[
        ...(circle.length > 0 ? [{ value: "All", label: "ALL" }] : []),
        ...circle.map((option) => ({
          value: option.sequence_id,
          label: option.office_id,
        })),
      ]}
      disableCloseOnSelect
      getOptionLabel={(option) => option.label}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.label}
        </li>
      )}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Circle" />}
      isOptionEqualToValue={(option, value) => option.value === value.value}
     
    />

<Autocomplete
      multiple
      id="checkboxes-tags-demo"
      onChange={handleDivisionChange}
      options={[
        ...(division.length > 0 ? [{ value: "All", label: "ALL" }] : []),
        ...division.map((option) => ({
          value: option.sequence_id,
          label: option.office_id,
        })),
      ]}
      disableCloseOnSelect
      getOptionLabel={(option) => option.label}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.label}
        </li>
      )}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Division" />}
      isOptionEqualToValue={(option, value) => option.value === value.value}
 
    />

<Autocomplete
    multiple
      id="checkboxes-tags-demo"
      onChange={handleSubdivisionChange}
      options={[
        ...(subdivision.length > 0 ? [{ value: "All", label: "ALL" }] : []),
        ...subdivision.map((option) => ({
          value: option.sequence_id,
          label: option.office_id,
        })),
      ]}
      disableCloseOnSelect
      getOptionLabel={(option) => option.label}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.label}
        </li>
      )}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Sub Division" />}
      isOptionEqualToValue={(option, value) => option.value === value.value}
    />
 
 <div className='drop'>

<Autocomplete
    multiple
      disablePortal
      id="combo-box-demo"
      onChange={handleLastreadChange}
      options={[
        ...(lastread.length > 0 ? [{ value: "All", label: "ALL" }] : []),
        ...lastread.map((option) => ({
          value: option.diff,
          label: option.lastread_status,
        })),
      ]}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Last Read Status" />}
      isOptionEqualToValue={(option, value) => option.value === value.value}
    />

<Autocomplete
                              multiple
                              disablePortal
                              className='selectfield'
                              id="combo-box-demo"
                              onChange={handleLastcommdateChange}
                              options={[
                              ...(lastcommdate.length > 0 ? [{ value: "All", label: "ALL" }] : []),
                              ...lastcommdate.map((option) => ({
                              value: option.last_commdate,
                              label: option.last_commdate,
                                    })),
                                ]}
                              sx={{ width: 300, paddingBottom: 50}}
                              renderInput={(params) => <TextField {...params} label="Last Communication Date" />}
                              isOptionEqualToValue={(option, value) => option.value === value.value}

               />



 {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Date "
          inputFormat="DD-MM-YYYY"
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
          disableFuture={true}
        />
       
      </Stack>
    </LocalizationProvider>  */}



<Box className='parentDate'>
  <Box className='childDate'>
  <LocalizationProvider dateAdapter={AdapterDayjs}>

<Stack spacing={3}>
<DesktopDatePicker
  label="From-Date "
  inputFormat="DD-MMYYYY"
  className="my-date-picker"
  onChange={handleDateChange}
  renderInput={(params) => <TextField {...params} />}
/>
</Stack>
</LocalizationProvider>
  </Box>


<Box className='childDate'>
<LocalizationProvider dateAdapter={AdapterDayjs}>
<Stack spacing={3}>
  <DesktopDatePicker
  label="To-Date "
  inputFormat="DD-MMYYYY"
  className="my-date-picker"
  onChange={handleDateChange1}
  renderInput={(params) => <TextField {...params} />}
  />
  </Stack>
  </LocalizationProvider>

</Box>

</Box>




</div>   
 </div>

</Box>




<br/><br/>
        <Button variant="contained"  type="submit" value="Fetch" onClick={(e) => setShowtable(true)}>FETCH</Button>
       
 </AccordionDetails>

 {showtable && <DisplayData optionname={optionname} /> }    

</Accordion>



        </>
  )
}