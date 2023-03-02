import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import preview from "../assets/preview.png";

import { ForemField, Loader } from "../components";

import { getRandomPrompt } from "../utils/index";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loding, setloding] = useState(false);

 
  
     
  
  {/* generate Image from backend */}
  const generateImage =async () => {
  //   if(form.prompt){ 
  //     try {
  //    setGeneratingImg(false)
  //    const response=await fetch('http://localhost:8090/api/v1/dalle',
  //   { method:'post',
  //   headers:{'Content-type': 'appilication/json'},
  //   body:JSON.stringify({prompt:form.prompt}),
  // })

  if (form.prompt) {
    try {
      setGeneratingImg(true);
      const response = await fetch('http://localhost:8090/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: form.prompt,
        }),
      });
  const data=await response.json()
  setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
    } catch (error) {
      alert(error)
    }finally{
      setGeneratingImg(false)
    }
  }else{
    alert('Please Enter Prompt')
  }
  };


  {/*share with World */}

  const handleSumbit =async (e) => {
e.preventDefault()

if(form.prompt && form.photo){
  setloding(true)
  try {
    const response = await fetch('http://localhost:8090/api/v1/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    await response.json()
    navigate('/')
  } catch (error) {
    alert(err)
  }finally{
    setloding(false)
  }
}else{
  alert('please enter a Prompt & Generate an image')
}


  };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSurpriseMe = () => {
    const ramdomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: ramdomPrompt });
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="">
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] max-w-500 text-[16px]">
          Create visually Stunning images Through Images Ai
        </p>
      </div>

      {/* Form Field Components Props */}

      <form className="mt-16 max-w-3xl" onSubmit={handleSumbit}>
        <div className="flex flex-col gap-5">
          <ForemField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
          />
          <ForemField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
        </div>

        {/* Image Uploader Container */}

        <div className="relative bg-gray-50 border border-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex justify-center items-center h-64 w-64 p-3">
          {form.photo ? (
            <img
              src={form.photo}
              alt={form.prompt}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={preview}
              alt="preview"
              className="w-9/12 h-9/12 object-cover opacity-40"
            />
          )}

          {/* Image Loader Animation */}
          {generatingImg && (
            <div className="absolute inset-0 z-0  flex justify-center items-center rounded-lg bg-[rgba(0,0,0,0.5)]">
              <Loader />
            </div>
          )}
        </div>
        {/* Image Loader Text */}

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white font-medium text-sm w-full bg-green-700 sm:w-auto px-5 py-2.5 text-center rounded-md"
          >
            {generatingImg ? "generating..." : "generate"}
          </button>
        </div>

        <div>
          <p className="text-[14px] mt-2 text-[#666e75]">
            Once You Have Craeted The Image You can Share With Community
          </p>
          <button
            className="mt-3 text-white bg-[#6469ff] rounded-md w-full sm:w-auto  text-center py-2.5 px-5 font-medium"
            type="sumbit"
          >
            {loding ? "sharing..." : "Share With Community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
