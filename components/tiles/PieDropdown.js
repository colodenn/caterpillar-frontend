import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const PieDropdown = (props) => {
  const router = useRouter();

  const did = Cookies.get("api_token");
  var myHeaders = new Headers();
  myHeaders.append("api_token", did);

  const [columns, setColumns] = useState([]);
  const { pid } = router.query;

  useEffect(() => {
    const file = fetch(`http://localhost/api/columns/${pid}`, {
      method: "GET",
      credentials: "include",
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("test");
        setColumns(res["columns"]);
      });
  }, [pid]);

  return (
    <div className="">
      <select
        className=" mt-4 mx-auto w-full border rounded py-3 px-8 text-xl hover:bg-gray-100 "
        name="columns"
        id="columns"
      >
        {columns.map((item, index) => {
          return (
            <option
              className=" mt-4 mx-auto w-full border rounded py-3 px-8 text-xl hover:bg-gray-100 "
              key={index}
              value={item.id}
            >
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default PieDropdown;
