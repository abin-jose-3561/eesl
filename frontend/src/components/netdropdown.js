import React, { useEffect,useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import DisplayData from './table'
import { Box, Button } from '@mui/material';

const NetDropdown = ()=> {
    const [gss,setGss] = useState([])
    const [thirtythree,setThirtythree] = useState([])
    const [substation,setSubstation] = useState([])
    const [eleven,setEleven] = useState([])
    const [dt,setDt] = useState([])
 
    const [selectedgss,setSelectedGss] = useState(null)
    const [selectedthirtythree,setSelectedThirtythree] = useState(null)
    const [selectedsubstation,setSelectedSubstation] = useState(null)
    const [selectedeleven,setSelectedEleven] = useState(null)
    const [selecteddt,setSelectedDt] = useState(null)


  const [optionname, setOptionname] = useState({
    optiongss : '',
    optionthirtythree : '',
    optionsubstation : '',
    optioneleven : '',
    optiondt : ''
  })

  const[showtable,setShowtable] = useState(false)
 


//to get the values of discom
    useEffect(()=>{
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
        fetchStates();
    },[]);

  
// when a discom is selected to get the zone dropdown values
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

    console.log(selectedgss)
  

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

    const response = await fetch(
      `http://localhost:5000/thirtythree/thirtythree/${thirtythrees}` );
    const data = await response.json();
    setSubstation(data);
    const response1 = await fetch(
      `http://localhost:5000/thirtythree/Substation/${thirtythrees}`);
    const data1 = await response1.json();
    setEleven(data1);

    const response2 = await fetch(
      `http://localhost:5000/thirtythree/eleven/${thirtythrees}`);
    const data2 = await response2.json();
    setDt(data2);
};

console.log(selectedthirtythree)




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
        const response =await fetch(`http://localhost:5000/substation/substation/${substations}`);
        const data = await response.json();
        setEleven(data)
        const response1 =await fetch(`http://localhost:5000/substation/eleven/${substations}`);
        const data1 = await response1.json();
        setDt(data1)
    };
    console.log(selectedsubstation)
   

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
        const response =await fetch(`http://localhost:5000/eleven/eleven/${elevens}`);
            const data = await response.json();
           setDt(data)
           
    };
    console.log(eleven)
    console.log(selectedeleven)
   

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

};

console.log(selecteddt)
console.log(optionname)

  return (

<Box>
    <Box align="center" display="flex" marginTop="20px" marginLeft="20px">
        <Autocomplete
        multiple
      disablePortal
      id="combo-box-demo"
      onChange={handleGssChange}
      options={[
        ...(gss.length > 0 ? [{ value: "All", label: "ALL" }] : []),
        ...gss.map((option) => ({
          value: option.sequence_id,
          label: option.nin_id,
        })),
      ]}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="GSS" />}
    />
    

&nbsp;&nbsp;&nbsp;&nbsp;

<Autocomplete
  multiple
  disablePortal
  id="combo-box-demo"
  onChange={handleThirtythreeChange}
  options={[
    ...(thirtythree.length > 0 ? [{ value: "All", label: "ALL" }] : []),
    ...thirtythree.map((option) => ({
      value: option.sequence_id,
      label: option.nin_id,
    })),
  ]}
  sx={{ width: 200 }}
  renderInput={(params) => <TextField {...params} label="33KV Feeder" />}
/>


 &nbsp;&nbsp;&nbsp;&nbsp;

 <Autocomplete
      multiple
      disablePortal
      id="combo-box-demo"
      onChange={handleSubstationChange}
      options={[
        ...(substation.length > 0 ? [{ value: "All", label: "ALL" }] : []),
        ...substation.map((option) => ({
          value: option.sequence_id,
          label: option.nin_id,
        })),
      ]}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Substation" />}
     
    />
&nbsp;&nbsp;&nbsp;&nbsp;

<Autocomplete
      multiple
      disablePortal
      id="combo-box-demo"
      onChange={handleElevenChange}
      options={[
        ...(eleven.length > 0 ? [{ value: "All", label: "ALL" }] : []),
        ...eleven.map((option) => ({
          value: option.sequence_id,
          label: option.nin_id,
        })),
      ]}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="11KV Feeder" />}
 
    />

&nbsp;&nbsp;&nbsp;&nbsp;

<Autocomplete
    multiple
      disablePortal
      id="combo-box-demo"
      onChange={handleDtChange}
      options={[
        ...(dt.length > 0 ? [{ value: "All", label: "ALL" }] : []),
        ...dt.map((option) => ({
          value: option.sequence_id,
          label: option.nin_id,
        })),
      ]}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="DT" />}

    />
        
&nbsp;&nbsp;&nbsp;&nbsp;


</Box>

        <br/><br/>
        <Button variant="contained"  type="submit" value="Fetch" onClick={(e) => setShowtable(true)}>FETCH</Button>
        <br/><br/>
       
        {showtable && <DisplayData optionname={optionname} /> }

        </Box>
  )
}

export default NetDropdown;