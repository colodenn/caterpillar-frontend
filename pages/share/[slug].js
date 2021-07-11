import { Responsive, WidthProvider } from "react-grid-layout";
import React, { useEffect, useState } from "react";
const ResponsiveGridLayout = WidthProvider(Responsive);
import DashboardLayout from "../../components/dashboard/dashboardLayout";
import Piechart from "../../components/charts/piechart";
import Cookies from "js-cookie";

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

  function tiles(exp, el) {
    var html = <h1>test</h1>;
    switch (exp) {
      case "image":
        {
          console.log(el);
        }
        html = <img src={el.data} />;
        break;
      case "number":
        html = (
          <p className="text-center font-bold text-3xl align-middle py-4">
            {el.data}
          </p>
        );
        break;
      case "piechart":
        console.log(el.data);
        html = <Piechart dat={el.data} />;
        break;
      case "timestamps":
        console.log(el.data);
        html = (
          <div>
            <p>Start: {el.data[0]}</p>
            <p>End: {el.data[1]}</p>
          </div>
        );
        break;
      case "table":
        console.log(el.data);
        html = (
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                {Object.keys(el.data[0]).map((e) => {
                  return (
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {e}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {el.data.map((e) => {
                return (
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{e.caseid}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {e["concept:name"]}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{e.id}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {e["org:resource"]}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{e["org:role"]}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {e["time:timestamp"]}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
        break;
      default:
        html = <textarea defaultValue="write something here..." />;
        break;
    }
    return html;
  }

  const onDrop = async (layout, layoutItem, _event) => {};

  const onLayoutChange = async (layout, layouts) => {
    let temp = [...layoutState];
    temp.map((e) => {
      let foo = layout.find((x) => x.i == e.i);
      let poo = e;
    });
    layouttemp = layout;
  };
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
              <div className="bg-white shadow-md rounded-md" key={el.i}>
                <div className="border-b-1 p-4 rounded-t flex justify-between">
                  <div className="flex">
                    <img src="/eye.svg" />
                    <p className="ml-2">{el.name}</p>
                  </div>
                  <div className="my-auto">
                    <button>
                      <img className="" src="/3dot.svg" />
                    </button>
                  </div>
                </div>
                <>{tiles(el.type, el)}</>
              </div>
            );
          })}
          <style jsx>{`
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
