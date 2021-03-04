import React,{ useEffect, useState } from 'react';

import Link from 'next/link'
import axios from 'axios'

import { Router, useRouter } from 'next/router'
const Upload = (props) => { 
const router = useRouter()
let data;
    // Create a reference to the hidden file input element
	const [selectedFile, setSelectedFile] = useState();

  const hiddenFileInput = React.useRef(null);
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
    // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file 
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    setSelectedFile(fileUploaded)
   // props.handleFile(fileUploaded);
  };

  const uploadClick = event => {
    var formData = new FormData();
    formData.append('file',selectedFile)
    axios.post('http://localhost:5000/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
  }).then(res => {
    
    if (typeof window !== 'undefined') {
      console.log(JSON.stringify(res.data))
      localStorage.setItem('data', JSON.stringify(res.data))
      router.push('/analysis')
    }
  })
  }
  React.useEffect(() => {
    
  })

    return (
    <>
<div onClick={handleClick} className="border-2 p-2 border-dashed rounded cursor-pointer">
    <div className="text-center">
        <div>
        <svg className="mx-auto" width="121" height="121" viewBox="0 0 121 121" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.25 95.7917C26.9396 95.7917 23.6616 95.1396 20.6031 93.8728C17.5447 92.606 14.7658 90.7491 12.425 88.4083C7.6975 83.6808 5.04163 77.269 5.04163 70.5833C5.04163 63.8977 7.6975 57.4858 12.425 52.7584C17.1525 48.0309 23.5643 45.375 30.25 45.375C35.2916 33.5271 46.8875 25.2083 60.5 25.2083C77.7929 25.2083 91.9599 38.6192 93.2708 55.6096L95.7916 55.4583C101.14 55.4583 106.27 57.583 110.052 61.365C113.834 65.147 115.958 70.2765 115.958 75.625C115.958 80.9735 113.834 86.103 110.052 89.885C106.27 93.667 101.14 95.7917 95.7916 95.7917H30.25ZM95.7916 65.5417H85.7083V60.5C85.7083 53.8143 83.0524 47.4025 78.3249 42.675C73.5975 37.9475 67.1856 35.2917 60.5 35.2917C47.8958 35.2917 37.5604 44.4675 35.5941 56.4163C33.9304 55.8113 32.1154 55.4583 30.25 55.4583C26.2386 55.4583 22.3915 57.0519 19.555 59.8883C16.7185 62.7248 15.125 66.5719 15.125 70.5833C15.125 74.5947 16.7185 78.4418 19.555 81.2783C22.3915 84.1148 26.2386 85.7083 30.25 85.7083H95.7916C98.4659 85.7083 101.031 84.646 102.922 82.755C104.813 80.864 105.875 78.2993 105.875 75.625C105.875 72.9507 104.813 70.386 102.922 68.495C101.031 66.604 98.4659 65.5417 95.7916 65.5417Z" fill="#5B75D2"/>
</svg>
        </div>
       
    
        <h4 className="mb-4">
            CSV or XES, smaller than 300MB
        </h4>
        <h4 className="mb-4">
            Drag and drop you file here
        </h4>

        <button  className=" mb-4 z-50 ml-2 bg-blue-200 hover:bg-blue-300 text-blue-600 font-semibold py-2 px-4 rounded">
          choose file
        </button>
        <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{display:"none"}}
        className="absolute"
      />
        { selectedFile ? (
          <div>
   <p>{selectedFile.name}</p>
    <p>{selectedFile.size} bytes</p>
          </div>
 


      ) : (<></>)}
          
    </div>

</div>
<div className="mx-auto font-sans text-center mt-10">
          <Link href="/">
        <button className="mr-2 bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-gray py-2 px-4 border border-gray-500 hover:border-transparent rounded">
          Back
        </button>
        </Link>
      <button onClick={uploadClick} className="ml-2 bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
          CONTINUE
        </button>
        

      </div>
    </>
    )

};



export default Upload;
