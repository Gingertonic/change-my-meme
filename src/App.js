import React, { useState } from 'react';
import './App.css';

function App() {
  const [ currentMeme, setCurrentMeme ] = useState('https://imgflip.com/s/meme/Change-My-Mind.jpg')
  const [ memeFormText, setMemeFormText ] = useState('')

  const handleInputChange = e => setMemeFormText(e.target.value)

  const submitMeme = e => {
      e.preventDefault();
      const params = {
          template_id: 129242436,
          text0: memeFormText,
          text1: '',
          username: process.env.REACT_APP_IMGFLIP_USERNAME,
          password: process.env.REACT_APP_IMGFLIP_PASSWORD
      }

      const formData = createFormData(params)

      const config = {
          body: formData,
          method: "POST"
      }

      fetch('https://api.imgflip.com/caption_image', config)
          .then(res => res.json())
          .then(updateMeme)
  }

  const updateMeme = image => {
    setCurrentMeme(image.data.url)
    setMemeFormText("")
  }

  const createFormData = object => {
      const formData = new FormData();
      Object.keys(object).forEach(key => formData.append(key, object[key]));
      return formData;
  }

  return (
    <div className="App">
        <div id="header">
            <h1>Change My Mind, Netlify!</h1>
        </div>
        <div id="main">   
            <div id="content" className="meme-generator">
                <form onSubmit={submitMeme} id="meme-text-form"><input type="text" onChange={handleInputChange} placeholder="Meme Text!"/></form>
                <img id="meme" src={currentMeme} alt="Change My Mind"/>
            </div>
        </div>
    </div>
  );
}

export default App;
