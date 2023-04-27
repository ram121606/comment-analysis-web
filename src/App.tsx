import { useState } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'
import axios from 'axios'


function App() {
  const [result, setResult] = useState(null)
  const { register, handleSubmit } = useForm();

  const fetchResult = handleSubmit((formData) => {
    axios.post("http://192.168.11.8:8000/predict", formData)
      .then(response => {
        console.log(response.data);
        setResult(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  });


  return (
    <>
      <h1>Enter a comment</h1>
      <form onSubmit={fetchResult}>
        <input {...register("comment")} type='text'/>
        <input type="submit"/>
      </form>
      <p>{result}</p>
    </>
  )
}

export default App
