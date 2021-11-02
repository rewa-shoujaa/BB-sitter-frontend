import React, { useState,useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Paper, makeStyles } from '@material-ui/core';
import PageHeader from './components/FormComponents/PageHeader';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import Map from './components/MapDragable/Map';
import Button from '@mui/material/Button';
import {useHistory} from'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';



const useStyles =makeStyles(theme =>({
    root:{
        '& .MuiFormControl-root':{
            width: '80%',
            margin:theme.spacing(1)
        }
    },
    pageContent:{
        margin:theme.spacing(5),
        padding:theme.spacing(3),
  },
}))



export default function Register() {

    //history.go(-1);
    //history.push("/");

    let history = useHistory();
    axios.defaults.baseURL="";

    const[firstName, setFirstName]=useState("");
    const[lastName, setlastName]=useState("");
    const[email, setemail]=useState("");
    const[password, setpassword]=useState("");
    const[userType, setUserType]=useState("2");
    const[mobile, setmobile]=useState("");
    const[gender, setgender]=useState(0);
    const[city, setcity]=useState("");
    const[countryList, setcountryList]=useState([]);
    const[citylist, setcitylist]=useState([]);
    const[country, setcountrychosen]=useState("");
    const[longitude, setLogitude]=useState(0);
    const[latitude, setLatitude]=useState(0);
    const[dob, setDob]=useState(new Date());
    const[rate, setRate]=useState(null);
    const[qualification, setqualifications]=useState("");

    const [countrylong, setcountrylong]=useState(35.495480);
    const [countrylat, setcountrylat]=useState(33.888630);
    const [aboutme, setAboutme] = useState("");



    const[baseImage, setbaseImage]=useState("");
    
    const classes =useStyles();
    const render =useRef(false);

    //const [values,setValues] = useState(initialValues);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (userType==="2"){
        axios.post(process.env.REACT_APP_API_URL+'/register/parent', {
          "user_type": userType,
          "first_name": firstName,
          "last_name": lastName,
          "email": email,
          "password": password,
          "city": city,
          "country": country,
          "gender": gender,
          "phone_number": mobile,
          "picture": baseImage,
          "DoB": dob,
          "latitude": latitude,
          "longitude":longitude,

          })
        .then(function (response) {
            console.log(response.data)
            history.push("/");
        })
            .catch(function (error) {
              console.log(error)
              alert("Please Try again later")
        
            })
          }
          else{
            axios.post(process.env.REACT_APP_API_URL+'/babysitter/register', {
          "user_type": userType,
          "first_name": firstName,
          "last_name": lastName,
          "email": email,
          "password": password,
          "city": city,
          "country": country,
          "gender": gender,
          "phone_number": mobile,
          "picture": baseImage,
          "DoB": dob,
          "latitude": latitude,
          "longitude":longitude,
          "cv": qualification,
          "rate": rate,
          "aboutme": aboutme,

          })
        .then(function (response) {
            console.log(response.data)
            history.push("/");
        })
            .catch(function (error) {
              console.log(error)
              alert("Please Try again later")
        
            })

          }
      }

      //const pickImage= async() => {
      //  let result = 
      //}

      const uploadImage = async(e) => {
        console.log(e.target.files);
        const file = e.target.files[0];
        const base64 =await convertBase64(file);
        console.log(base64);
        setbaseImage(base64);
      };

      const uploadCV = async(e) => {
        console.log(e.target.files);
        const file = e.target.files[0];
        const base64 =await convertBase64(file);
        console.log(base64);
        setqualifications(base64);
      };

      const convertBase64 = (file) =>{
        return new Promise ((resolve, reject)=>{
          const fileReader =new FileReader();
          fileReader.readAsDataURL(file);
          
          fileReader.onload = (file)=>{
            resolve(fileReader.result);
          }
          fileReader.onerror= (error)=>{
            reject(error);
          }

        })
      }

      const GetCountries= () =>{
        let array=[]
        setcountryList([])
        axios.get(process.env.REACT_APP_API_URL+`/getCountries`)
              .then((response)=>{   
                //console.log(response.data);   
              response.data.forEach((item) => {
                array.push({
              countryname:item.country,
            })
           // return array;
          })
         // console.log("this the array")
           // console.log(array)
            setcountryList(array)
              })
            };

            const getCities= () =>{
                console.log("this is the country"+country);
                let array=[]
                setcitylist([])
                axios.get(process.env.REACT_APP_API_URL+`/getCities/`+country)
                      .then((response)=>{   
                        //console.log(response.data);   
                      response.data.forEach((item) => {
                        array.push({
                      cityname:item.dest,
                      cityid:item.dest_id,
                      long:item.lng,
                      lat:item.lat,
                    })
                   // return array;
                  })
                  console.log("this the array")
                    console.log(array)
                    setcitylist(array)
                      })
        
              };

      const handleCountryChange = (e)=>{
        console.log(e.target.value)
        setcountrychosen(e.target.value)
       
     };

     
     const handleCheckboxChange = (event)=>{
        setUserType(event.target.value)

    };
     
     const handleCityChange = (event)=>{
       console.log(event.target.value)
        setcity(event.target.value)
        setcountrylong(event.target.long);
        setcountrylat(event.target.lat);
        console.log(countrylong);
        console.log(countrylat);

    };



    useEffect(() => {
        GetCountries()
      },[]);

     

      const useDidMountEffect = (func, deps) => {
        const didMount = useRef(false);
      
        useEffect(() => {
          if (didMount.current) {
            func();
          } else {
            didMount.current = true;
          }
        }, deps);
      };


      useDidMountEffect(() => {
        getCities()
      },[country]);


      useEffect(() => {
        console.log("longitude: "+longitude +" latitude: "+latitude)
      },[longitude, latitude]);
      
     
    
      return (
          <div styling={{backgroundColor:'#f5f5f5', width:'100%', height:'100%'}}>
          <PageHeader title="Registration" subTitle="Be part of our family" icon={<AccountBoxIcon></AccountBoxIcon>}/>
          <Paper className={classes.pageContent}>
            <form className={classes.root} Validate onSubmit={handleSubmit}>
             <Grid container>
                 <Grid item md={6} xs={12} >
                     <TextField 
                     variant="outlined"
                     label="First Name"
                     required
                     name="firstName"
                     value={firstName}
                     autoFocus
                     autoComplete="off"
                     onChange={(e)=>{setFirstName(e.target.value)}}
                     />
                      <TextField 
                     variant="outlined"
                     label="Last Name"
                     required
                     value={lastName}
                     autoComplete="off"
                     onChange={(e)=>{setlastName(e.target.value)}}
                     />
                     <TextField 
                     variant="outlined"
                     label="Email"
                     type="email"
                     required
                     value={email}
                     autoComplete="off"
                     onChange={(e)=>{setemail(e.target.value)}}
                     />
                     <TextField 
                     variant="outlined"
                     label="Password"
                     type="password"
                     required
                     value={password}
                     autoComplete="off"
                     onChange={(e)=>{setpassword(e.target.value)}}
                     />
                     <TextField 
                     variant="outlined"
                     label="Phone Number"
                     type="tel"
                     required                     
                     value={mobile}
                     autoComplete="off"
                     onChange={(e)=>{setmobile(e.target.value)}}
                     />
                     <FormControl>
                     <FormLabel component="legend">Gender</FormLabel>
                     <RadioGroup row aria-label="Gender" name="row-radio-buttons-group" 
                     value={gender}
                     onChange={(e)=>{setgender(e.target.value)}}>
                        <FormControlLabel value="0" control={<Radio />} label="Female" />
                        <FormControlLabel value="1" control={<Radio />} label="Male" />
                    </RadioGroup>
                    </FormControl>

                 </Grid>
                 <Grid item md={6} xs={12}>

                 <TextField
                    id="date"
                    required
                    fullWidth
                    label="Date of Birth"
                    type="date"
                    Value={dob}
                    onChange={(e)=>{setDob(e.target.value)}}
                    InputLabelProps={{
                        shrink: true,}}
                        />

                 <FormControl>
                     <FormLabel component="legend">User Type</FormLabel>
                     <RadioGroup row aria-label="usertype" name="row-radio-buttons-group" 
                     value={userType}
                     onChange={handleCheckboxChange}>
                        <FormControlLabel value="2" control={<Radio />} label="Parent" />
                        <FormControlLabel value="3" control={<Radio />} label="Babsitter" />
                    </RadioGroup>
                    </FormControl>

                    {userType==="3"?<> 
                    <TextField 
                     variant="outlined"
                     label="Rate per hour $"
                     type="number"
                     value={rate}
                     autoComplete="off"
                     onChange={(e)=>{setRate(e.target.value);console.log(e.target.value)}}
                     /></> :null}

                    {userType==="3"?<> 
                    <TextField 
                     variant="outlined"
                     label="About me"
                     inputProps={{ maxLength: 250 }}
                     multiline
                     rows ={2}
                     value={aboutme}
                     autoComplete="off"
                     onChange={(e)=>{setAboutme(e.target.value);}}
                     /></> :null}

                    {userType==="3"?<> 
                   </> :null}


                    {userType==="3"?<> 
                    <input
                    accept=".pdf"         
                    style={{ display: 'none' }}
                    id="CV"
                    type="file"
                    onChange={(e)=>{
                      uploadCV(e)}}
                    />
                    <label htmlFor="CV">
                        <Button variant="outlined" component="span"  style={{width:"80%", color: '#2E3B55', marginBottom:'15px'}}>
                            CV
                            </Button>
                    </label> </> :null}

                    <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="profilePicture"
                    type="file"
                    onChange={(e)=>{
                      uploadImage(e);
                    }}
                    />
                    <label htmlFor="profilePicture">
                        <Button variant="outlined" component="span"  style={{width:"80%", color: '#2E3B55', marginBottom:'15px'}}>
                            Choose a profile picture
                        </Button>
                    </label> 



                    
                 </Grid>
                 <Grid item xs={12}>
                 
                     <FormControl fullWidth>
                     <InputLabel id="country-label">Country</InputLabel>
                     <Select 
                     required
                     labelID="country-label"
                     id="country-select"
                     value={country}
                     label="Country"
                     onChange={handleCountryChange}>
                         {countryList.map( (Country) => 
                         <MenuItem key={Country.countryname} value={Country.countryname}>{Country.countryname}</MenuItem> )
                          }


                     </Select>
                     </FormControl>

                     <FormControl fullWidth>
                     <InputLabel id="city-label">City</InputLabel>
                     <Select 
                     required
                     labelID="city-label"
                     id="city-select"
                     value={city}
                     label="Country"
                     onChange={handleCityChange}>
                         {citylist.map( (city) => 
                         <MenuItem key={city.cityid} value={city.cityid} long={city.long} lat={city.lat} >{city.cityname}</MenuItem> )
                          }

                     </Select>
                     </FormControl>
                     <Map setLng={setLogitude} setLat={setLatitude} countrylat={countrylat} countrylong={countrylong}/>

                     <Button
                     type="submit"
                     fullWidth
                     style={{backgroundColor: '#2E3B55', color: '#FFFFFF'}}
                     variant="contained"
                     sx={{ mt: 3, mb: 2 }}>
                         Register
                    </Button>
                 
                 

                 </Grid>




             </Grid>

         </form>
         </Paper>
         </div>
       
      );
      }
      