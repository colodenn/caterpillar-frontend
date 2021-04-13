import DashboardLayoutFile from '../../components/dashboard/dashboardLayoutFiles'
import Cookies from 'js-cookie';
import React, {useState} from 'react';
import Link from 'next/link'


function  deleteFile (e) {
  const did = Cookies.get('api_token')
  var myHeaders = new Headers();
  myHeaders.append("api_token", did)
   fetch(`http://localhost:5000/file/${e}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: myHeaders
  })
}

export default function  dashboard() {

  const [files, setFiles] = useState([])

  const did = Cookies.get('api_token')
  var myHeaders = new Headers();
  myHeaders.append("api_token", did)
  const file = fetch('http://localhost:5000/files', {
          method: 'GET',
          credentials: 'include',
          headers: myHeaders
        }).then( res => res.json()).then( res => 
            setFiles(() => res['files'])).catch(err => err)
  
  const folders = [
    {"name": "Documents", "description": "24 files"},
    {"name": "Personal", "description": "24 files"}
  ]

  return (
 <DashboardLayoutFile>
<>
      <h1 className="text-gray-600 font-bold text-lg mb-8">All files</h1>
 
      <div className="flex mb-8">
      { folders.map(el => {

      return (
        <div key={el.name} className=" cursor-pointer bg-white shadow-md rounded-md p-4 w-48 mr-8">
        <div className="flex justify-between">
            <img src="/folder.svg"  />
            <img src="/3dot.svg" />

        </div>
        <div className="mt-8">
          <h1 className="text-lg font-semibold">{el.name}</h1>
          <h3 className=" font-medium text-gray-500">{el.description}</h3>
        </div>
      </div>
      )
      })}
      
      </div>

      <h1 className="text-gray-600 font-bold text-lg mb-8">All files {'>'} Documents</h1>

      <div className="block mb-8">
      { files.map(el => {

      return (
        
        <div key={el.name} className=" cursor-pointer  mb-4 rounded shadow-md rounded-md p-4 bg-white">
              <div className="flex justify-between">
                <Link href={"/dashboard/" + el.name} >
                
                  <div className="flex">
                    <img src="/file.svg" />
                      <p className="ml-4 my-auto">{el.name}</p>
                    </div>
                </Link>
                    <div className="flex">
                        <p className="my-auto">{el.date}</p>
                      </div>
                      <div className="flex">
                        <img className="rounded-full w-10  h-10 mr-4" src="/cat.png" />
                        <img className="mr-4" src="/star.svg" />
                        <button onClick={() => deleteFile(el.name)}>
                        <img className="transform rotate-90" src="/3dot.svg" />

                        </button>
                      </div>
                </div>
          </div>
      )
      })}
             <div key="default" className=" cursor-pointer mb-4 rounded shadow-md rounded-md p-4 bg-white">
              <div className="flex mx-auto">
                 <img className="mx-auto" src="/add.svg" />
                  </div>
          </div>
      </div>
      </>
  
 </DashboardLayoutFile>
  ) 
}
