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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function NetDropdown  () {
    const [gss,setGss] = useState([])
    const [thirtythree,setThirtythree] = useState([])
    const [substation,setSubstation] = useState([])
    const [eleven,setEleven] = useState([])
    const [dt,setDt] = useState([])
 
    const [selectedgss,setSelectedGss] = useState('')
    const [selectedthirtythree,setSelectedThirtythree] = useState('')
    const [selectedsubstation,setSelectedSubstation] = useState('')
    const [selectedeleven,setSelectedEleven] = useState('')
    const [selecteddt,setSelectedDt] = useState('')


  const [optionname, setOptionname] = useState({
    optiongss : '',
    optionthirtythree : '',
    optionsubstation : '',
    optioneleven : '',
    optiondt : ''
  })

  const[showtable,setShowtable] = useState(false)
 


//to get the values of discom
    
        const fetchStates =async () =>{
            const response =await fetch("http://localhost:5000/net/gss");
            const data = await response.json();
            setGss(data)
            const response1 =await fetch("http://localhost:5000/net/thirtythree");
            const data1 = await response1.json();
            setThirtythree(data1)
            const response2 =await fetch("http://localhost:5000/net/substation");
            const data2 = await response2.json();
            setSubstation(data2)
            const response3 =await fetch("http://localhost:5000/net/eleven");
            const data3 = await response3.json();
            setEleven(data3)
            const response4 =await fetch("http://localhost:5000/net/dt");
            const data4 = await response4.json();
            setDt(data4)
          };


useEffect(()=>{
  if(optionname.optiongss ==='' && optionname.optionthirtythree ==='' && optionname.optionsubstation ==='' && optionname.optioneleven ==='' && optionname.optiondt ===''){ 
        fetchStates();
  }
    },[optionname]);

  console.log(gss)
// when a GSS is selected to get the 33kv dropdown values
const handleGssChange = async (event, value) => {
    let gsss;
    let Labelgss
    if (value.some((v) => v.value === "All")) {
        gsss = gss.filter((v) => v.nin_id !== "All").map((v) => v.sequence_id).join(",");
        setSelectedGss(gsss);

        Labelgss = gss.filter((v) => v.nin_id !== "All").map((v) => v.nin_id).join(",");
        setOptionname({
            ...optionname,
            optiongss : Labelgss
        });
      } 
      else{
    gsss = value.map((v) => v.value); // get an array of selected values
    setSelectedGss(gsss);
    console.log(gsss)

    Labelgss = value.map((v) => v.label); // get an array of selected labels
    setOptionname({
        ...optionname,
        optiongss : Labelgss.join(",")
    });
      }
    setShowtable(false);
    const response = await fetch(`http://localhost:5000/gss/gss/${gsss}`);
    const data = await  response.json();
    setThirtythree(data);
    const response1 = await fetch(`http://localhost:5000/gss/thirtythree/${gsss}`);
    const data1 = await  response1.json();
    setSubstation(data1);
    const response2 = await fetch(`http://localhost:5000/gss/substation/${gsss}`);
    const data2 = await  response2.json();
    setEleven(data2);
    const response3 = await fetch(`http://localhost:5000/gss/eleven/${gsss}`);
    const data3 = await  response3.json();
    setDt(data3);
  };

    console.log("gss",selectedgss)
  

// when a Thirtythree is selected to get the circle dropdown values
const handleThirtythreeChange = async (event, value) => {
   let thirtythrees;
   let Labelthirtythree;
    if (value.some((v) => v.value === "All")) {
        thirtythrees = thirtythree.filter((v) => v.nin_id !== "All").map((v) => v.sequence_id).join(",");
        setSelectedThirtythree(thirtythrees);

        Labelthirtythree = thirtythree.filter((v) => v.nin_id !== "All").map((v) => v.nin_id).join(",");
        setOptionname({
            ...optionname,
            optionthirtythree : Labelthirtythree});
      }
      else {
      thirtythrees = value.map((v) => v.value);
      setSelectedThirtythree(thirtythrees);

      Labelthirtythree = value.map((v) => v.label);
    setOptionname({
        ...optionname,
        optionthirtythree : Labelthirtythree.join(", ")});
      }

    setShowtable(false);

    const responsegss = await fetch(`http://localhost:5000/thirtythree/gss/${thirtythrees}` );
    const datagss = await responsegss.json();
    setGss(datagss);

    const response = await fetch(`http://localhost:5000/thirtythree/thirtythree/${thirtythrees}` );
    const data = await response.json();
    setSubstation(data);
    const response1 = await fetch(`http://localhost:5000/thirtythree/substation/${thirtythrees}`);
    const data1 = await response1.json();
    setEleven(data1);
    const response2 = await fetch(`http://localhost:5000/thirtythree/eleven/${thirtythrees}`);
    const data2 = await response2.json();
    setDt(data2);
};

console.log("33kv",selectedthirtythree)




// when a Substation is selected to get the eleven dropdown values

    const handleSubstationChange = async (event,value) => {
        let substations;
        let Labelsubstation;
        if (value.some((v) => v.value === "All")) {
            substations = substation.filter((v) => v.nin_id !== "All").map((v) => v.sequence_id).join(",");
            setSelectedSubstation(substations);

        Labelsubstation = substation.filter((v) => v.nin_id !== "All").map((v) => v.nin_id).join(",");
        setOptionname({
            ...optionname,
            optionsubstation : Labelsubstation
        });
          }
          else {

        substations = value.map((v) => v.value); // get an array of selected values
        setSelectedSubstation(substations)

        Labelsubstation = value.map((v) => v.label);
        setOptionname({
            ...optionname,
            optionsubstation : Labelsubstation.join(",")
        });
          }

        setShowtable(false);
        const responsegss = await fetch(`http://localhost:5000/substation/gss/${substations}` );
        const datagss = await responsegss.json();
        setGss(datagss);
        const responsethree =await fetch(`http://localhost:5000/substation/thirtythree/${substations}`);
        const datathree = await responsethree.json();
        setThirtythree(datathree)

        const response =await fetch(`http://localhost:5000/substation/substation/${substations}`);
        const data = await response.json();
        setEleven(data)
        const response1 =await fetch(`http://localhost:5000/substation/eleven/${substations}`);
        const data1 = await response1.json();
        setDt(data1)
    };
    console.log("substation",selectedsubstation)
   

 // when a eleven is selected to get the subeleven dropdown values
     const handleElevenChange = async (event,value) => {
        let elevens;
        let Labeleleven;
       
        if (value.some((v) => v.value === "All")) {
            elevens = eleven.filter((v) => v.nin_id !== "All").map((v) => v.sequence_id).join(",");
            setSelectedEleven(elevens);

        Labeleleven = eleven.filter((v) => v.nin_id !== "All").map((v) => v.nin_id).join(",");
        setOptionname({
            ...optionname,
            optioneleven : Labeleleven});
          }
          else {
        elevens = value.map((v) => v.value);
        setSelectedEleven(elevens)

        Labeleleven = value.map((v) => v.label);
        setOptionname({
            ...optionname,
            optioneleven : Labeleleven.join(", ")});
          }

        setShowtable(false)

        const responsegss =await fetch(`http://localhost:5000/eleven/gss/${elevens}`);
        const datagss = await responsegss.json();
        setGss(datagss)
        const responsethree =await fetch(`http://localhost:5000/eleven/thirtythree/${elevens}`);
        const datathree = await responsethree.json();
        setThirtythree(datathree)
        const responsesub =await fetch(`http://localhost:5000/eleven/substation/${elevens}`);
        const datasub = await responsesub.json();
        setSubstation(datasub)

        const response =await fetch(`http://localhost:5000/eleven/eleven/${elevens}`);
        const data = await response.json();
        setDt(data)
           
    };
    console.log(eleven)
    console.log("11kv",selectedeleven)
   

// when a subdivision is selected to get the section dropdown values
const handleDtChange = async (event,value) => {
    let dts;
    let Labeldt
    if (value.some((v) => v.value === "All")) {
        dts = dt.filter((v) => v.nin_id !== "All").map((v) => v.sequence_id).join(",");
        setSelectedDt(dts);

        Labeldt = dt.filter((v) => v.nin_id !== "All").map((v) => v.nin_id).join(",");
        setOptionname({
            ...optionname,
            optionsdt : Labeldt});
      }
      else {
    dts = value.map((v) => v.value);
    setSelectedDt(dts)
    
    Labeldt = value.map((v) => v.label);
    setOptionname({
        ...optionname,
        optiondt : Labeldt.join(",")});
       
      }
    setShowtable(false)
    const responsegss =await fetch(`http://localhost:5000/dt/gss/${dts}`);
    const datagss = await responsegss.json();
    setGss(datagss)
    const responsethree =await fetch(`http://localhost:5000/dt/thirtythree/${dts}`);      
    const datathree = await responsethree.json();
    setThirtythree(datathree)
    const responsesub =await fetch(`http://localhost:5000/dt/substation/${dts}`);
    const datasub = await responsesub.json();
    setSubstation(datasub)
    const responseele =await fetch(`http://localhost:5000/dt/eleven/${dts}`);
    const dataele = await responseele.json();
    setEleven(dataele)

};

console.log("dt",selecteddt)
console.log("optionname",optionname)

  return (
    <> 
     
    <Accordion>
    <AccordionSummary
    //expandIcon={<ExpandMoreIcon />
    expandIcon={<ExpandMoreIcon />}
     aria-controls="panel1a-content"
     id="panel1a-header"
    >
    <Typography>Network Hierarchy Filters</Typography>
     </AccordionSummary>
     <AccordionDetails>

    <Box align="center" display="flex" marginTop="20px" marginLeft="20px">
    <div className="dropdown">

        <Autocomplete
        multiple
      id="checkboxes-tags-demo"
      onChange={handleGssChange}
      options={[
        ...(gss.length > 0 ? [{ value: "All", label: "ALL" }] : []),
        ...gss.map((option) => ({
          value: option.sequence_id,
          label: option.nin_id,
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
      renderInput={(params) => <TextField {...params} label="GSS" />}
      isOptionEqualToValue={(option, value) => option.value === value.value}
    />
    


<Autocomplete
  multiple
  id="checkboxes-tags-demo"
  onChange={handleThirtythreeChange}
  options={[
    ...(thirtythree.length > 0 ? [{ value: "All", label: "ALL" }] : []),
    ...thirtythree.map((option) => ({
      value: option.sequence_id,
      label: option.nin_id,
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
  renderInput={(params) => <TextField {...params} label="33KV Feeder" />}
  isOptionEqualToValue={(option, value) => option.value === value.value}
/>

 <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      onChange={handleSubstationChange}
      options={[
        ...(substation.length > 0 ? [{ value: "All", label: "ALL" }] : []),
        ...substation.map((option) => ({
          value: option.sequence_id,
          label: option.nin_id,
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
      renderInput={(params) => <TextField {...params} label="Substation" />}
      isOptionEqualToValue={(option, value) => option.value === value.value}
    />

<Autocomplete
      multiple
      id="checkboxes-tags-demo"
      onChange={handleElevenChange}
      options={[
        ...(eleven.length > 0 ? [{ value: "All", label: "ALL" }] : []),
        ...eleven.map((option) => ({
          value: option.sequence_id,
          label: option.nin_id,
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
      renderInput={(params) => <TextField {...params} label="11KV Feeder" />}
      isOptionEqualToValue={(option, value) => option.value === value.value}
    />


<Autocomplete
    multiple
      id="checkboxes-tags-demo"
      onChange={handleDtChange}
      options={[
        ...(dt.length > 0 ? [{ value: "All", label: "ALL" }] : []),
        ...dt.map((option) => ({
          value: option.sequence_id,
          label: option.nin_id,
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
      renderInput={(params) => <TextField {...params} label="DT" />}
      isOptionEqualToValue={(option, value) => option.value === value.value}
    />
        

        </div>
</Box>

        <br/><br/>
        <Button variant="contained"  type="submit" value="Fetch" onClick={(e) => setShowtable(true)}>FETCH</Button>
        <br/><br/>
</AccordionDetails> 

{showtable && <DisplayData optionname={optionname} /> }

</Accordion> 
        

        </>
  )
}
