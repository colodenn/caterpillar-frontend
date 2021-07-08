import { Responsive, WidthProvider } from "react-grid-layout";
import React, { useEffect, useState } from "react";
const ResponsiveGridLayout = WidthProvider(Responsive);
import DashboardLayout from "../../components/dashboard/dashboardLayout";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { resetIdCounter } from "react-tabs";
import { tiles, openSidebar } from "../../utils/ui/ui";
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
  }, [pid]);

  async function addAll() {
    let layoutnew = layoutState;
    console.log("add all");
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

      console.log(layoutnew);
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
      console.log(layoutnew);
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
      .then((res) => res.json())
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

    console.log(
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
          i: String(newlayout.length + 1),
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
          i: String(newlayout.length + 1),
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
          i: String(newlayout.length + 1),
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
          i: String(newlayout.length + 1),
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
            i: String(layoutState.length + 1),
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
      .then((res) => console.log(res));
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
      .then((res) => res.json())
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
      .then((res) => res.json())
      .then((res) => console.log(res));
  }

  return (
    <>
      <DashboardLayout
        deleteAll={() => deleteAll()}
        delete={(value) => deleteT(value)}
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
                    <button onClick={() => openSidebar(el.i)}>
                      <img className="" src="/3dot.svg" />
                    </button>
                  </div>
                </div>
                <>{tiles(el.type, el, addAll)}</>
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
