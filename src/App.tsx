import { useState } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'
import axios from 'axios'


function App() {
  const [result, setResult] = useState("")
  const { register, handleSubmit } = useForm();


  const resultMessage = (result: string) => {
    if (result == "positive"){
      return "Positive 😊"
    } else if (result == "negative") {
      return "Negative 😕"
    } else if (result == "neutral") {
      return "Neutral 😐"
    } else {
      return "Error occured! Please try again"
    }
  }

  const fetchResult = handleSubmit((formData) => {
    axios.post("http://localhost:8000/predict", formData)
      .then(response => {
        console.log(response.data);
        setResult(resultMessage(response.data))
      })
      .catch(error => {
        console.log(error);
        setResult("Error occured! Please try again")
      });
  });


  return (
    <>
      <h1>Enter a comment</h1>
      <form onSubmit={fetchResult}>
        <div className='row'>
          <input className='textfield' {...register("comment")} type='text' placeholder='Type any comment'/>
          <input type="submit" className='button'/>
        </div>
      </form>
      <p>{result}</p>
    </>
  )
}

export default App
