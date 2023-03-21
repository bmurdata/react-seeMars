import { useState } from 'react'
import {format} from 'date-fns';
import reactLogo from './assets/react.svg'
import './App.css'
import APIForm from './Components/APIform';
import Gallery from './Components/gallery';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


function App() {
  const [count, setCount] = useState(0)
  const [inputs, setInputs] = useState({
    page: "",
    camera:"",
    earth_date:""
  });
  

  const submitForm = () => {
    let defaultValues = {
      page: "",
      camera:"",
      earth_date:""
    };
 
    {
      for (const [key, value] of Object.entries(inputs)) {
        if (value == ""){
          inputs[key] = defaultValues[key]
        }
      }
    }
    makeQuery()
  }

  const [currentImage, setCurrentImage] = useState(null);

  const callAPI = async (query) => {
    
    const response = await fetch(query);
    const json = await response.json();
    const randomImg=json.photos[0].img_src

    if (randomImg == null){
      alert("Oops! Something went wrong with that query, let's try again!")
        }
    else {
      setCurrentImage(randomImg);
      setPrevImages((images) => [...images, randomImg]);

      //reset();
    }
    
  }

  const makeQuery = () => {
    let cameras=["CHEMCAM", "FHAZ", "MARDI", "RHAZ",'NAVCAM']
    let pages=["1", "2", "3"]
    let earth_date  = format(randomDate(new Date(2012, 0, 1), new Date(2023, 2, 1)), 'yyyy-MM-d');
    let camera = cameras[Math.floor(Math.random()*cameras.length)];
    let page=cameras[Math.floor(Math.random()*cameras.length)];
    let query = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${ACCESS_KEY}&camera=${camera}&earth_date=${earth_date}&page=${page}`;
    callAPI(query).catch(console.error);
    setInputs({
      page: page,
      camera:camera,
      earth_date:earth_date
      
    })
    console.log(query)

  }

  const reset = () => {
    setInputs({
      page: "",
      camera:"",
      earth_date:""
      
    });
    
  }
  const [prevImages, setPrevImages] = useState([]);

  return (
    <div className="whole-page">
      <h1>See mars from a rover! 📸</h1>
      <p>
  https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=DEMO_KEY&camera=FHAZ  
    <br></br>
    &page=<button>{inputs.page}</button> <br></br>
    &camera=<button>{inputs.camera}</button> <br></br>
    &earth_date=<button>{inputs.earth_date}</button>
    <br></br>
    <br></br>
  </p>
      <APIForm
        inputs={inputs}
        handleChange={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.trim(),
          }))
        }
        onSubmit={submitForm}

      />
      {currentImage ? (
      <img
        className="screenshot"
        src={currentImage}
        alt="Screenshot returned"
      />
    ) : (
      <div> </div>
    )}
    <div className="container">
  <h3> Current Query Status: </h3>
  <div className="container">
  <Gallery images={prevImages} />
</div>
  
</div>

<br></br>
      <br></br>

    </div>
  )
}

export default App
