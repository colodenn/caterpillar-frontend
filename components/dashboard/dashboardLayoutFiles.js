import Upload from "./upload";
import { useState } from "react";
import dynamic from "next/dynamic";
import Cookies, { set, get } from "js-cookie";
import { useRouter } from "next/router";

const Avatar = dynamic(() => import("../avatar/avatar"), { ssr: false });

const DashboardLayoutFile = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    props.change(event.target.value);
  };
  const router = useRouter();

  function logout() {
    Cookies.remove("api_token");
    router.push("/");
  }
  return (
    <>
      <div className="h-screen disableScroll overflow-hidden ">
        <nav className=" w-screen py-2 px-8 border-b-1 z-50 bg-white">
          <div className="flex my-auto mt-2 justify-between">
            <div className="">
              <img src="/logo.svg" className="rotate-90 transform" />
            </div>
            <div className="flex w-96">
              <img src="/search.svg" className="absolute ml-2 mt-5"></img>
              <input
                onChange={handleChange}
                value={searchTerm}
                type="text"
                className=" h-10 w-full mt-2  rounded align-middle focus:outline-none"
                style={{
                  textIndent: "28px",
                  border: "1px solid #E8E8EF",
                  boxShadow: "0px 2px 8px rgb(34 34 87 / 5%)",
                }}
                placeholder="Search files"
              />
            </div>
            <div className="flex">
              <div className="rounded-full w-12 h-12 mr-8 flex items-center my-auto">
                <Avatar />
              </div>
              <div className="my-auto items-center flex">
                {/* <img src="/bell.svg" className="my-auto items-center" />
                 */}
                <div onClick={() => logout()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 transform hover:scale-125"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="flex disableScroll">
          <aside className="mt-0 fixed bg-white w-96 border-r-1 h-screen">
            <div className="flex mt-8">
              <div className="mx-auto ">
                <Upload />
              </div>
            </div>
          </aside>
          <main className="flex-1 flex height disableScroll backgroundTile overflow-y-scroll   ml-96 mt-0 p-12 ">
            <div className="flex-1   mx-auto p-4">{props.children}</div>
          </main>
        </div>
      </div>
      <style jsx>{`
        .react-tabs__tab--selected {
          border-bottom: 4px solid #60a5fa;
          padding-bottom: 0.5rem;
        }

        .height {
          height: calc(100vh - 5.5rem);
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

        .backgroundTile {
          background-image: url("/tile.png");
          background-repeat: repeat;
          background-size: 30px 30px;
          background-color: #fbfbfb;
        }
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
      `}</style>
    </>
  );
};

export default DashboardLayoutFile;
