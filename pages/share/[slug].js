import { Responsive, WidthProvider } from "react-grid-layout";
import React, { useEffect, useState } from "react";
const ResponsiveGridLayout = WidthProvider(Responsive);
import DashboardLayout from "../../components/dashboard/dashboardLayout";
import Piechart from "../../components/charts/piechart";
import Cookies from "js-cookie";
import { tiles } from "../../utils/ui/ui";

import { useRouter } from "next/router";

import { resetIdCounter } from "react-tabs";
const ref = React.createRef();
var layout1 = [];
var layoutst = {
  lg: layout1,
  md: layout1,
  sm: layout1,
  xs: layout1,
  xxs: layout1,
};


let layouttemp = [];
export default function shareSlug() {
  const [layoutState, setLayout] = useState(layout1);
  const [layoutsState, setLayouts] = useState(layoutst);
  const router = useRouter();
  const { slug } = router.query;
  console.log(layoutState);
  resetIdCounter();
  const did = Cookies.get("api_token");
  useEffect(() => {
    const interval = setInterval(() => {
      var myHeaders = new Headers();
      myHeaders.append("api_token", did);
      if (typeof slug !== "undefined") {
        const file = fetch(
          `${process.env.NEXT_PUBLIC_SERVERURL}/share/${slug}`,
          {
            method: "GET",
            credentials: "include",
            headers: myHeaders,
          }
        )
          .then((res) => res.json())
          .then((res) => {
            setLayout(() => res["data"]);
            setLayouts({
              lg: res["data"],
              md: res["data"],
              sm: res["data"],
              xs: res["data"],
              xxs: res["data"],
            });
          });
      }
    }, 1000);
    return () => clearInterval(interval);
  });



  const onDrop = async (layout, layoutItem, _event) => { };

  const onLayoutChange = async (layout, layouts) => {
    let temp = [...layoutState];
    temp.map((e) => {
      let foo = layout.find((x) => x.i == e.i);
      let poo = e;
    });
    layouttemp = layout;
  };
  function updateText(data, i) {
    console.log("updateText");
  }

  function addAll() {
    console.log("addAll");
  }
  return (
    <>
      <DashboardLayout
        deleteAll={() => console.log("test")}
        delete={(value) => console.log("test")}
      >
        <ResponsiveGridLayout
          id="grid"
          className="layout"
          layouts={layoutsState}
          onLayoutChange={(layout, layouts) => {
            onLayoutChange(layout, layouts);
          }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          onDrop={onDrop}
          isDroppable={true}
          autoSize={true}
        >
          {layoutState.map((el) => {
            return (
              <div
                className={

                  "bg-white shadow-md rounded-md"
                }
                key={el.i}
              >
                <div className="border-b-1 p-4 rounded-t flex justify-between drag cursor-move">
                  <div className="flex w-full">
                    <img src="/eye.svg" />
                    <p className="my-auto ml-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      {el.name}
                    </p>
                  </div>
                  <div className="my-auto ">
                    <button
                      className="focus:outline-none hover:bg-blue-400 hover:bg-opacity-25 px-2 py-4 rounded "
                      onClick={() => openSidebar(el.i)}
                    >
                      <img className="focus:outline-none" src="/3dot.svg" />
                    </button>
                  </div>
                </div>
                <div
                  style={{ height: "calc(100% - 3.5rem)" }}
                  className="w-full"
                >
                  {tiles(el.type, el, addAll, updateText)}
                </div>
              </div>
            );
          })}
          <style jsx>{`
            .newshadow {
              box-shadow: 0px 4px 30px rgb(22 33 74 / 5%);
              border: 1px solid #e3e9f3;
            }
            .height {
              height: 200px;
              width: 100%;
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
          `}</style>
        </ResponsiveGridLayout>
      </DashboardLayout>
    </>
  );
}
