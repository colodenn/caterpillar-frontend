import { Responsive, WidthProvider } from "react-grid-layout";
import React, { useEffect, useState } from "react";
const ResponsiveGridLayout = WidthProvider(Responsive);
import DashboardLayout from "../../components/dashboard/dashboardLayout";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { resetIdCounter } from "react-tabs";
import { tiles } from "../../utils/ui/ui";
var layout1 = [];
var layoutst = {
  lg: layout1,
  md: layout1,
  sm: layout1,
  xs: layout1,
  xxs: layout1,
};

let layouttemp = [];
export default function dashboardSlug() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  function openSidebar(index) {
    if (typeof window !== "undefined") {
      const properties = document.getElementById("properties");
      properties.style.display = "block";
      properties.value = index;
      const closeButton = document.getElementById("closeButton");
      closeButton.value = index;
      setIndex(index);
      setOpen(true);
    }
  }
  const router = useRouter();

  const fileName = router.query.pid;

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
  const [layoutState, setLayout] = useState(layout1);
  const [layoutsState, setLayouts] = useState(layoutst);
  const { pid } = router.query;
  resetIdCounter();
  const did = Cookies.get("api_token");
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("api_token", did);
    if (typeof pid !== "undefined") {
      const file = fetch(`http://localhost/api/tiles/${pid}`, {
        method: "GET",
        credentials: "include",
        headers: myHeaders,
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            router.push(`/login`);

            return { data: [] };
          }
        })

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
  }, [pid]);

  function updateText(data, i) {
    let news = layoutState.findIndex((x) => x.i == i);
    layoutState[news].data = data;

    setLayout(() => layoutState);

    const did = Cookies.get("api_token");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("api_token", did);
    const file = fetch(`http://localhost/api/tiles/add/${pid}`, {
      method: "POST",
      credentials: "include",
      headers: myHeaders,
      body: JSON.stringify({ data: layoutState }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }

  async function addAll() {
    let layoutnew = layoutState;
    const layoutItem = { x: 0, y: 0 };
    let i = 1;
    for (const element of statisticBlocks) {
      var data = element;
      data = {
        data: JSON.parse(data.data),
        description: data.description,
        title: data.title,
      };
      data = data.data;
      if (data.types === "image") {
        var response = { data: data.api };
      } else {
        const did = Cookies.get("api_token");
        var myHeaders = new Headers();
        myHeaders.append("api_token", did);
        var response = await fetch(data.api, {
          method: "GET",
          credentials: "include",
          headers: myHeaders,
        }).then((res) => res.json());
      }

      let newlayout = [];
      layoutnew.map((e) => {
        let temp = layouttemp.find((x) => x.i == e.i);
        let temp2 = e;
        temp2.w = temp.w;
        temp2.h = temp.h;
        temp2.x = temp.x;
        temp2.y = temp.y;

        newlayout = newlayout.concat(temp2);
      });

      layoutnew = layoutnew.concat([
        {
          i: String(i),
          x: layoutItem.x + (i % 13),
          y: layoutItem.y,
          w: data.w,
          h: data.h,
          name: data.name,
          data: await response.data,
          type: data.types,
        },
      ]);
      setLayout(layoutnew);

      setLayouts({
        lg: newlayout.concat([
          {
            i: String(i),
            x: layoutItem.x + (i % 13),
            y: layoutItem.y,
            w: data.w,
            h: data.h,
            name: data.name,
            data: await response.data,
            type: data.types,
          },
        ]),
        md: newlayout.concat([
          {
            i: String(i),
            x: layoutItem.x + (i % 13),
            y: layoutItem.y,
            w: data.w,
            h: data.h,
            name: data.name,
            data: await response.data,
            type: data.types,
          },
        ]),
        sm: newlayout.concat([
          {
            i: String(i),
            x: layoutItem.x + (i % 13),
            y: layoutItem.y,
            w: data.w,
            h: data.h,
            name: data.name,
            data: await response.data,
            type: data.types,
          },
        ]),
        xs: newlayout.concat([
          {
            i: String(i),
            x: layoutItem.x + (i % 13),
            y: layoutItem.y,
            w: data.w,
            h: data.h,
            name: data.name,
            data: await response.data,
            type: data.types,
          },
        ]),
        xxs: newlayout.concat([
          {
            i: String(i),
            x: layoutItem.x + (i % 13),
            y: layoutItem.y,
            w: data.w,
            h: data.h,
            name: data.name,
            data: await response.data,
            type: data.types,
          },
        ]),
      });
      i++;
    }
    var myHeaders = new Headers();
    myHeaders.append("api_token", did);
    myHeaders.append("Content-Type", "application/json");
    const file = fetch(`http://localhost/api/tiles/add/${pid}`, {
      method: "POST",
      credentials: "include",

      headers: myHeaders,
      body: JSON.stringify({ data: layoutnew }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          router.push(`/login`);
          return { files: [] };
        }
      })
      .then((res) => console.log(res));
  }

  const onDrop = async (layout, layoutItem, _event) => {
    var data = JSON.parse(_event.dataTransfer.getData("text/plain"));

    if (data.types === "image") {
      var response = { data: data.api };
    } else {
      const did = Cookies.get("api_token");
      var myHeaders = new Headers();
      myHeaders.append("api_token", did);
      var response = await fetch(data.api, {
        method: "GET",
        credentials: "include",
        headers: myHeaders,
      }).then((res) => res.json());
    }
    let newlayout = [];
    let count = 0;
    layoutState.map((e) => {
      let temp = layouttemp.find((x) => x.i == e.i);
      let temp2 = e;
      temp2.w = temp.w;
      temp2.h = temp.h;
      temp2.x = temp.x;
      temp2.y = temp.y;

      newlayout = newlayout.concat(temp2);
      if (parseInt(e.i) > count) count = parseInt(e.i);
    });
    setLayout(
      newlayout.concat([
        {
          i: String(count + 1),
          x: layoutItem.x,
          y: layoutItem.y,
          w: data.w,
          h: data.h,
          name: data.name,
          data: await response.data,
          type: data.types,
        },
      ])
    );

    setLayouts({
      lg: newlayout.concat([
        {
          i: String(count + 1),
          x: layoutItem.x,
          y: layoutItem.y,
          w: data.w,
          h: data.h,
          name: data.name,
          data: await response.data,
          type: data.types,
        },
      ]),
      md: newlayout.concat([
        {
          i: String(count + 1),
          x: layoutItem.x,
          y: layoutItem.y,
          w: data.w,
          h: data.h,
          name: data.name,
          data: await response.data,
          type: data.types,
        },
      ]),
      sm: newlayout.concat([
        {
          i: String(count + 1),
          x: layoutItem.x,
          y: layoutItem.y,
          w: data.w,
          h: data.h,
          name: data.name,
          data: await response.data,
          type: data.types,
        },
      ]),
      xs: newlayout.concat([
        {
          i: String(count + 1),
          x: layoutItem.x,
          y: layoutItem.y,
          w: data.w,
          h: data.h,
          name: data.name,
          data: await response.data,
          type: data.types,
        },
      ]),
      xxs: newlayout.concat([
        {
          i: String(count + 1),
          x: layoutItem.x,
          y: layoutItem.y,
          w: data.w,
          h: data.h,
          name: data.name,
          data: await response.data,
          type: data.types,
        },
      ]),
    });

    var myHeaders = new Headers();
    myHeaders.append("api_token", did);
    myHeaders.append("Content-Type", "application/json");
    // send layoutState and layoutsState and Store on mongodb
    const file = fetch(`http://localhost/api/tiles/add/${pid}`, {
      method: "POST",
      credentials: "include",

      headers: myHeaders,
      body: JSON.stringify({
        data: layoutState.concat([
          {
            i: String(count + 1),
            x: layoutItem.x,
            y: layoutItem.y,
            w: data.w,
            h: data.h,
            name: data.name,
            data: await response.data,
            type: data.types,
          },
        ]),
      }),
    })
      .then((res) => res.json())
      .then((res) => res);
  };

  const onLayoutChange = async (layout, layouts) => {
    // let newlayout = []
    // layoutState.map(e => {
    //   let temp = layout.find(x => x.i == e.i)
    //   let temp2 = e
    //   temp2.w = temp.w
    //   temp2.h = temp.h
    //   temp2.x = temp.x
    //   temp2.y = temp.y

    //   newlayout = newlayout.concat(temp2)

    // })
    // console.log(newlayout)

    let temp = [...layoutState];
    temp.map((e) => {
      let foo = layout.find((x) => x.i == e.i);
      let poo = e;
      // poo.w = foo.w
      // poo.h = foo.h
      // poo.x = foo.x
      // poo.y = foo.y
    });
    // var myHeaders = new Headers();
    //   myHeaders.append("api_token", did)
    //   myHeaders.append('Content-Type','application/json')
    //   // send layoutState and layoutsState and Store on mongodb
    //   const file = fetch(`http://localhost:5000/tiles/add/${pid}`, {
    //     method: 'POST',
    //     credentials: 'include',

    //     headers: myHeaders,
    //     body: JSON.stringify({"data":newlayout})
    //   }).then(res => res.json())
    //   .then(res => console.log(res))

    layouttemp = layout;
  };
  async function deleteAll() {
    setLayout([]);
    var myHeaders = new Headers();
    myHeaders.append("api_token", did);
    myHeaders.append("Content-Type", "application/json");
    // send layoutState and layoutsState and Store on mongodb
    const file = fetch(
      `${process.env.NEXT_PUBLIC_SERVERURL}/tiles/add/${pid}`,
      {
        method: "POST",
        credentials: "include",

        headers: myHeaders,
        body: JSON.stringify({ data: [] }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          router.push(`/login`);
          return { files: [] };
        }
      })
      .then((res) => console.log(res));
  }

  async function deleteT(i) {
    var newLayout = layoutState.filter((el) => el.i != i);
    setLayout([...newLayout]);
    var myHeaders = new Headers();
    myHeaders.append("api_token", did);
    myHeaders.append("Content-Type", "application/json");
    // send layoutState and layoutsState and Store on mongodb
    const file = fetch(
      `${process.env.NEXT_PUBLIC_SERVERURL}/tiles/add/${pid}`,
      {
        method: "POST",
        credentials: "include",

        headers: myHeaders,
        body: JSON.stringify({ data: newLayout }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          router.push(`/login`);
          return { files: [] };
        }
      })
      .then((res) => console.log(res));
  }
  function onDragStop(layout, oldItem, newItem, placeholder, e, element) {
    let newlayout = newItem;
    console.log(newlayout);
    let news = layoutState.findIndex((x) => x.i == newlayout.i);
    console.log(news);
    layoutState[news].x = newlayout.x;
    layoutState[news].y = newlayout.y;
    layoutState[news].w = newlayout.w;
    layoutState[news].h = newlayout.h;
    setLayout([...layoutState]);
    const did = Cookies.get("api_token");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("api_token", did);
    const file = fetch(`http://localhost/api/tiles/add/${pid}`, {
      method: "POST",
      credentials: "include",
      headers: myHeaders,
      body: JSON.stringify({ data: layoutState }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          router.push(`/login`);
          return { files: [] };
        }
      })
      .then((res) => console.log(res));
  }

  function onResizeStop(layout, oldItem, newItem, placeholder, e, element) {
    let newlayout = newItem;
    console.log(newlayout);
    let news = layoutState.findIndex((x) => x.i == newlayout.i);
    console.log(news);
    layoutState[news].x = newlayout.x;
    layoutState[news].y = newlayout.y;
    layoutState[news].w = newlayout.w;
    layoutState[news].h = newlayout.h;
    setLayout([...layoutState]);
    const did = Cookies.get("api_token");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("api_token", did);
    const file = fetch(`http://localhost/api/tiles/add/${pid}`, {
      method: "POST",
      credentials: "include",
      headers: myHeaders,
      body: JSON.stringify({ data: layoutState }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          router.push(`/login`);
          return { files: [] };
        }
      })
      .then((res) => console.log(res));
  }

  function onDrag(layout, oldItem, newItem, placeholder, e, element) {}

  function onDragStart(layout, oldItem, newItem, placeholder, e, element) {}
  return (
    <>
      <DashboardLayout
        deleteAll={() => deleteAll()}
        delete={(value) => deleteT(value)}
        type={(i) => layoutState.find((el) => el.i == i)}
        index={index}
        close={(i) => setOpen(i)}
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
          onDrag={onDrag}
          onDragStart={onDragStart}
          onDragStop={onDragStop}
          onResizeStop={onResizeStop}
          draggableHandle=".drag"
        >
          {layoutState.map((el) => {
            return (
              <div
                className={
                  el.i == index && open
                    ? "bg-white shadow-md rounded-md border-blue-400 border-2"
                    : "bg-white shadow-md rounded-md"
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
                  <div className="my-auto">
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
