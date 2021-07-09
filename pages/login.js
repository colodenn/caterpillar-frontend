import { useRouter } from "next/router";
import { Magic } from "magic-sdk";
import Cookies from "universal-cookie";
import ClipLoader from "react-spinners/ClipLoader";
import React, { useEffect, useState } from "react";

export default function Login() {
  const [spinner, setSpinner] = useState(false);

  const cookies = new Cookies();
  const router = useRouter();

  const handleSubmit = async (event) => {
    setSpinner(true);
    event.preventDefault();
    const { elements } = event.target;

    const did = await new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUB_KEY
    ).auth.loginWithMagicLink({ email: elements.email.value });

    // Once we have the did from magic, login with our own API
    await fetch(`${process.env.NEXT_PUBLIC_SERVERURL}/v1/user/login`, {
      method: "POST",
      headers: { Authorization: `Bearer ${did}` },
    }).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          // set cookie age to 1 week
          cookies.set("api_token", json.did_token, {
            path: "/",
            maxAge: 604800,
          });
          setSpinner(false);
          router.push("/dashboard");
        });
      }
    });
  };

  return (
    <>
      <div className="h-screen w-screen overflow-hidden">
        <aside className="fixed h-full w-20 border-r-1  ">
          <img src="/logo.svg" className="mx-auto mt-8" />
        </aside>
        <div className="flex ml-20 p-36 px-48 justify-between">
          <div className="m-auto mr-24 ">
            <form onSubmit={handleSubmit}>
              <h1 className="text-5xl font-bold  ">
                Sign in to Caterpillar<br></br> Analysis Dashboard
              </h1>
              <div className="mt-10 relative border-b-2 focus-within:border-gray-500">
                <input
                  type="text"
                  name="email"
                  placeholder=" "
                  className="block w-full appearance-none bg-transparent focus:outline-none "
                />
                <label
                  htmlFor="email"
                  className="absolute top-0 duration-300 origin-0"
                  style={{ zIndex: "-1" }}
                >
                  Email
                </label>
              </div>
              <br></br>
              <div className="flex align-center">
                <div>
                  <button
                    type="submit"
                    className="bg-black px-6 py-2 text-white text-xl  rounded hover:bg-gray-700"
                  >
                    Sign in
                  </button>
                </div>
                <div className="ml-4 my-auto">
                  <ClipLoader
                    className="my-auto"
                    size={20}
                    color={"#5B75D2"}
                    loading={spinner}
                    speedMultiplier={1.5}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="m-auto">
            <img src="/login.svg" />
          </div>
        </div>
      </div>
      <style jsx>{`
        .border-b-1 {
          border-bottom: 1px solid #e8e8ef;
        }
        .border-r-1 {
          border-right: 1px solid #e8e8ef;
        }
      `}</style>
    </>
  );
}
