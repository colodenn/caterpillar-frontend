import DashboardLayoutFile from "../../components/dashboard/dashboardLayoutFiles";
import Cookies from "js-cookie";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Avatar from "../../components/avatar/avatar";
function deleteFile(e) {
  const did = Cookies.get("api_token");
  var myHeaders = new Headers();
  myHeaders.append("api_token", did);
  fetch(`${process.env.NEXT_PUBLIC_SERVERURL}/file/${e}`, {
    method: "DELETE",
    credentials: "include",
    headers: myHeaders,
  });
}

export default function dashboard() {
  const router = useRouter();

  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const did = Cookies.get("api_token");
  var myHeaders = new Headers();
  myHeaders.append("api_token", did);
  const file = fetch(`http://localhost/api/files`, {
    method: "GET",
    credentials: "include",
    headers: myHeaders,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        router.push(`/login`);
        return { files: [] };
      }
    })
    .then((res) => setFiles(() => res["files"]))
    .catch((res) => console.log(res));

  const folders = [
    { name: "Documents", description: "24 files" },
    { name: "Personal", description: "24 files" },
  ];

  return (
    <DashboardLayoutFile change={setSearchTerm}>
      <>
        <h1 className="text-gray-600 font-bold text-lg mb-8">All files</h1>

        <div className="flex mb-8">
          {folders.map((el) => {
            return (
              <div
                key={el.name}
                className=" cursor-pointer bg-white shadow-md rounded-md p-4 w-48 mr-8"
              >
                <div className="flex justify-between">
                  <img src="/folder.svg" />
                  <img src="/3dot.svg" />
                </div>
                <div className="mt-8">
                  <h1 className="text-lg font-semibold">{el.name}</h1>
                  <h3 className=" font-medium text-gray-500">
                    {el.description}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        <h1 className="text-gray-600 font-bold text-lg mb-8">
          All files {">"} Documents
        </h1>

        <div className="block mb-8 pb-8">
          {files.map((el) => {
            return el.name.toLowerCase().includes(searchTerm.toLowerCase()) ? (
              <div
                key={el.name}
                className=" cursor-pointer  mb-4 rounded shadow-md rounded-md p-4 bg-white"
              >
                <div className="flex justify-between w-full">
                  <Link href={"/dashboard/" + el.name}>
                    <div className="flex w-full">
                      <img src="/file.svg" />
                      <p className="ml-4 my-auto w-full">{el.name}</p>
                    </div>
                  </Link>
                  <div className="flex items-center">
                    <p className="my-auto">{el.date}</p>
                  </div>
                  <div className="flex items-center">
                    <div className=" w-10  h-10 mr-4  my-auto flex items-center">
                      <Avatar />
                    </div>
                    <img className="mr-4" src="/star.svg" />
                    <div className="w-6 h-6 items-center my-auto">
                      <button
                        className=" flex align-middle items-center my-auto focus:outline-none"
                        onClick={() => deleteFile(el.name)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 items-center my-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <> </>
            );
          })}
          <div
            key="default"
            className=" cursor-pointer mb-4  shadow-md rounded-md p-4 bg-white"
            onClick={() => console.log("test")}
          >
            <div className="flex mx-auto">
              <img className="mx-auto" src="/add.svg" />
            </div>
          </div>
        </div>
      </>
    </DashboardLayoutFile>
  );
}
