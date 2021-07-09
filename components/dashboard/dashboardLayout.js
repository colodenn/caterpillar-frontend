import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Link from "next/link";
import "react-tabs/style/react-tabs.css";
import { useRouter } from "next/router";
import Modal from "react-modal";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import Pdf from "react-to-pdf";

import Sidebar from "../../components/dashboard/sidebar";
const options = {
  orientation: "landscape",
  unit: "in",
  format: [50, 20],
};
const ref = React.createRef();
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
};
const DashboardLayout = (props) => {
  const router = useRouter();
  const { pid } = router.query;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [shareLink, setShareLink] = useState("");
  function openModal() {
    setIsOpen(true);
  }
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setIndex(props.index);
  });

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }
  const fileName = router.query.pid;
  const [searchTerm, setSearchTerm] = useState("");
  const statisticBlocks = [
    {
      title: "Notes",
      description: "3 x 3",
      data: `{"color":"#C71585","h":3,"w":3,"name":"Notes","api": "${process.env.NEXT_PUBLIC_SERVERURL}/eventcount/${fileName}","types":"notes"}`,
    },
    {
      title: "Event count",
      description: "1 x 1",
      data: `{"color":"#C71585","h":1,"w":1,"name":"Event count","api": "${process.env.NEXT_PUBLIC_SERVERURL}/eventcount/${fileName}","types":"number"}`,
    },
    {
      title: "Unique Activites Count",
      description: "1 x 1",
      data: `{"color":"#C71585","h":1,"w":1,"name":"Unique Activites Count","types":"number","api":"${process.env.NEXT_PUBLIC_SERVERURL}/uniqueActivitiesCount/${fileName}"}`,
    },
    {
      title: "Aktivity Pie Chart",
      description: "4 x 3",
      data: `{"color":"#C71585","h":3,"w":4,"name":"Aktivity Pie Chart","types":"piechart","api": "${process.env.NEXT_PUBLIC_SERVERURL}/activitesArray/${fileName}"}`,
    },
    {
      title: "Median Throughputtime",
      description: "2 x 2",
      data: `{"color":"#C71585","h":1,"w":2,"name":"Median Throughputtime","types":"number","api": "${process.env.NEXT_PUBLIC_SERVERURL}/medianThroughputtime/${fileName}"}`,
    },

    {
      title: "Period",
      description: "2 x 1",
      data: `{"color":"#C71585","h":1,"w":2,"name":"Period","types":"timestamps","api": "${process.env.NEXT_PUBLIC_SERVERURL}/StartEnd/${fileName}"}`,
    },

    {
      title: "Cases",
      description: "2 x 2",
      data: `{"color":"#C71585","h":2,"w":2,"name":"Cases","types":"number","api": "${process.env.NEXT_PUBLIC_SERVERURL}/CaseCount/${fileName}"}`,
    },

    {
      title: "Throughputtime Pie Chart",
      description: "4 x 3",
      data: `{"color":"#C71585","h":3,"w":4,"name":"Throughputtime","types":"piechart","api": "${process.env.NEXT_PUBLIC_SERVERURL}/Throughputtime/${fileName}"}`,
    },

    // {
    //     'title': 'Unique Resources Count',
    //     'description': '2 x 2',
    //     'data': `{"color":"#C71585","h":2,"w":2,"name":"Unique Resources Count","types":"number","api": "http://localhost:5000/UniqueResource/${fileName}"}`
    // },

    {
      title: "Resource Pie Chart",
      description: "4 x 3",
      data: `{"color":"#C71585","h":3,"w":4,"name":"Resource Pie Chart" ,"types":"piechart","api": "${process.env.NEXT_PUBLIC_SERVERURL}/ResourceCount/${fileName}"}`,
    },
    {
      title: "Custom Piechart",
      description: "4 x 3",
      data: `{"color":"#C71585","h":3,"w":4,"name":"Custom Pie Chart" ,"types":"custompiechart","api": "${process.env.NEXT_PUBLIC_SERVERURL}/customPieChart/${fileName}"}`,
    },
  ];

  const discoveryBlocks = [
    {
      title: "Petrinet",
      description: "5 x 4",
      data: `{"color":"#C71585","h":2,"w":7,"name":"Petrinet","api": "${process.env.NEXT_PUBLIC_SERVERURL}/uploads/petrinet/${fileName}","types":"image"}`,
    },
    {
      title: "Table",
      description: "8 x 4",
      data: `{"color":"#C71585","h":4,"w":8,"name":"Table","api": "${process.env.NEXT_PUBLIC_SERVERURL}/getTable/${fileName}","types":"table"}`,
    },
  ];

  const algorithmBlocks = [];

  function closeSidebar() {
    if (typeof window !== "undefined") {
      const properties = document.getElementById("properties");
      properties.style.display = "none";
    }
  }
  function deleteButton(i) {
    closeSidebar();
    props.delete(i);
  }

  function getType(i) {
    return props.type(i);
  }

  function deleteAll() {
    props.deleteAll();
  }

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  function getGrid() {
    if (typeof window !== "undefined") {
      return document.getElementById("grid");
    }
  }

  async function getLink() {
    const did = Cookies.get("api_token");
    var myHeaders = new Headers();
    myHeaders.append("api_token", did);
    const file = fetch(
      `${process.env.NEXT_PUBLIC_SERVERURL}/share/create/${pid}`,
      {
        method: "GET",
        credentials: "include",
        headers: myHeaders,
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setShareLink(res.data);
      });
  }

  return (
    <>
      <div className="h-screen disableScroll overflow-hidden ">
        <nav className=" w-screen py-2 px-8 border-b-1 z-50 bg-white">
          <div className="flex my-auto mt-2 justify-between">
            <div className="">
              <div className="inline-block mr-4 cursor-pointer">
                <Link href="/dashboard">
                  <img
                    className="hover:cursor-pointer my-auto bg-gray-100 rounded-full mt-0 p-3 "
                    style={{ width: "40px", height: "40px" }}
                    src="/arrow.svg"
                  />
                </Link>
              </div>
              <div className="inline-block">
                <h1
                  className="font-medium text-base"
                  style={{ color: "#393C44" }}
                >
                  Dashboard
                </h1>
                <p
                  className="font-medium text-sm text-gray-400"
                  style={{ color: "#808292" }}
                >
                  Return to cockpit
                </p>
              </div>
            </div>
            <div className="flex">
              <p className="m-auto font-medium ">{fileName}</p>
            </div>
            <div>
              <button
                onClick={() => deleteAll()}
                className="border  rounded px-2 py-2 text-gray-400  text-sm hover:text-gray-300 hover:border-gray-100 font-medium "
              >
                Discard
              </button>
              <span className="mr-2 ml-2"></span>
              <button
                onClick={openModal}
                className="bg-blue-500 hover:bg-blue-400 rounded px-4 py-2 text-sm text-white font-medium "
              >
                Publish & export
              </button>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <div className="p-8">
                  <div className="flex">
                    <div className="mr-8">
                      <Pdf
                        targetRef={ref}
                        options={options}
                        scale={2}
                        filename="code-example.pdf"
                      >
                        {({ toPdf }) => (
                          <button
                            onClick={toPdf}
                            className="bg-blue-500 hover:bg-blue-400 rounded px-4 py-2 text-sm text-white font-medium "
                          >
                            Export
                          </button>
                        )}
                      </Pdf>
                    </div>
                    <div className="">
                      <button
                        onClick={() => getLink()}
                        className="bg-blue-500 hover:bg-blue-400 rounded px-4 py-2 text-sm text-white font-medium "
                      >
                        Share
                      </button>
                    </div>
                  </div>
                  <div>
                    <a
                      href={`${process.env.NEXT_PUBLIC_URL}/share/` + shareLink}
                    >
                      {`${process.env.NEXT_PUBLIC_URL}/share/` + shareLink}
                    </a>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </nav>
        <div className="flex disableScroll">
          <aside className="mt-0 fixed bg-white w-96 border-r-1 h-screen">
            <div className="">
              <div className="block">
                <div className="px-4 py-2">
                  <h2 className="font-medium text-2xl mb-4 mt-2">Blocks</h2>
                  <img src="/search.svg" className="absolute ml-2 mt-5"></img>
                  <input
                    onChange={handleChange}
                    value={searchTerm}
                    type="text"
                    className=" h-10 w-full mt-2  rounded align-middle"
                    style={{
                      textIndent: "28px",
                      border: "1px solid #E8E8EF",
                      boxShadow: "0px 2px 8px rgb(34 34 87 / 5%)",
                    }}
                    placeholder="Search blocks"
                  />
                </div>
              </div>
            </div>
            <Tabs>
              <div className=" border-b-1">
                <TabList className="flex mt-4  px-2">
                  <Tab
                    className="mx-auto text-center font-medium text-sm  px-4 pb-2 border-b-4 cursor-pointer"
                    style={{ color: "#393c44" }}
                  >
                    Statistics
                  </Tab>
                  <Tab
                    className="mx-auto text-center font-medium text-sm px-4 pb-2 border-b-4 cursor-pointer"
                    style={{ color: "#393c44" }}
                  >
                    Discovery
                  </Tab>
                  <Tab
                    className="mx-auto text-center font-medium text-sm px-4 pb-2 border-b-4 cursor-pointer"
                    style={{ color: "#393c44" }}
                  >
                    Algorithmen
                  </Tab>
                </TabList>
              </div>
              <TabPanel>
                <div className="py-2 px-3 overflow-y-scroll height-side h-full">
                  {statisticBlocks.map((el) => {
                    return JSON.parse(el.data)
                      .name.toLowerCase()
                      .includes(searchTerm) ? (
                      <div
                        key={el.title}
                        className="hover:shadow rounded p-5 flex cursor-pointer droppable-element "
                        draggable={true}
                        unselectable="on"
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", el.data)
                        }
                      >
                        <img src="/grabme.svg"></img>
                        <div className="flex">
                          <div className="p-2 bg-gray-100 rounded my-auto ml-4">
                            <img src="/eye.svg"></img>
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-md">{el.title}</p>
                          <p className="font-regular text-md">
                            {el.description}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <></>
                    );
                  })}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="py-2 px-3 overflow-auto h-full">
                  {discoveryBlocks.map((el) => {
                    return (
                      <div
                        key={el.title}
                        className="hover:shadow rounded p-5 flex cursor-pointer droppable-element "
                        draggable={true}
                        unselectable="on"
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", el.data)
                        }
                      >
                        <img src="/grabme.svg"></img>
                        <div className="flex">
                          <div className="p-2 bg-gray-100 rounded my-auto ml-4">
                            <img src="/eye.svg"></img>
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-md">{el.title}</p>
                          <p className="font-regular text-md">
                            {el.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="py-2 px-3 overflow-auto h-full">
                  {algorithmBlocks.map((el) => {
                    return (
                      <div
                        key={el.title}
                        className="hover:shadow rounded p-5 flex cursor-pointer droppable-element "
                        draggable={true}
                        unselectable="on"
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", el.data)
                        }
                      >
                        <img src="/grabme.svg"></img>
                        <div className="flex">
                          <div className="p-2 bg-gray-100 rounded my-auto ml-4">
                            <img src="/eye.svg"></img>
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-md">{el.title}</p>
                          <p className="font-regular text-md">
                            {el.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabPanel>
            </Tabs>
          </aside>
          <main className="flex-1 flex disableScroll backgroundTile overflow-y-scroll height ml-96 mt-0">
            <div ref={ref} className="flex-1   mx-auto p-4">
              {props.children}
            </div>
          </main>
          <Sidebar
            index={index}
            deleteButton={deleteButton}
            type={(i) => getType(i)}
          />
        </div>
      </div>
      <style jsx>{`
        /* width */
        ::-webkit-scrollbar {
          width: 10px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: #888;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .react-tabs__tab--selected {
          border-bottom: 4px solid #60a5fa;
          padding-bottom: 0.5rem;
        }
        .height {
          height: calc(100vh - 4.4rem);
        }
        .react-tabs__tab-list {
          border-bottom: 4px solid #60a5fa;
        }
        .border-b-1 {
          border-bottom: 1px solid #e8e8ef;
        }

        .border-r-1 {
          border-right: 1px solid #e8e8ef;
        }
        .height-side {
          height: calc(100vh - 15rem);
        }
        .backgroundTile {
          background-image: url("/tile.png");
          background-repeat: repeat;
          background-size: 30px 30px;
          background-color: #fbfbfb;
        }
      `}</style>
    </>
  );
};

export default DashboardLayout;
