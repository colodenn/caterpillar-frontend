import React, { useEffect, useState } from "react";
import PieDropdown from "../tiles/PieDropdown";

const Sidebar = (props) => {
  const [index, setIndex] = useState(0);
  const [type, setType] = useState("");
  useEffect(() => {
    try {
      setType(props.type(props.index).type);
    } catch (e) {}
    setIndex(props.index);
  });
  return (
    <aside
      id="properties"
      className="mt-0 right-0 fixed bg-white w-96 border-r-1 h-screen hidden"
      value="test"
    >
      <div className="px-8 py-2 h-full">
        <div className="flex justify-between">
          <div>
            <h1 className="font-medium text-2xl mb-4 mt-2">Properties</h1>
          </div>
          <div className="my-auto">
            <button onClick={() => props.close()}>
              <img className="transform " src="/close.svg" />
            </button>
          </div>
        </div>
        <div className="mx-auto  align-bottom ">
          <button
            onClick={(e) => props.deleteButton(e.target.value)}
            id="closeButton"
            value="test"
            className="mx-auto w-full border rounded py-3 px-8 text-xl hover:bg-gray-100 "
          >
            Delete Block
          </button>
          <div className="mx-auto ">
            {type === "custompiechart" ? <PieDropdown /> : <></>}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
