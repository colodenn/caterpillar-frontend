import { Responsive, WidthProvider } from 'react-grid-layout';
import React, {useEffect, useState} from 'react';
const ResponsiveGridLayout = WidthProvider(Responsive);
import DashboardLayout from '../../components/dashboard/dashboardLayout'
import Piechart from '../../components/charts/piechart'
import Cookies from 'js-cookie';

import { useRouter } from 'next/router'

import { resetIdCounter } from 'react-tabs';

var layout1 = [
];
  var layoutst = {
    lg: layout1, md: layout1, sm: layout1, xs: layout1, xxs: layout1
  }

let layouttemp = []
export default function  dashboardSlug() {
  const [layoutState, setLayout] = useState(layout1)
  const [layoutsState, setLayouts] = useState(layoutst)
  const router = useRouter()
  const { pid } = router.query
  resetIdCounter();
  const did = Cookies.get('api_token')
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("api_token", did)
    if (typeof pid !== "undefined") {
      const file = fetch(`http://localhost:5000/tiles/${pid}`, {
              method: 'GET',
              credentials: 'include',
              headers: myHeaders
            }).then( res => res.json()).then( res => {
              setLayout(() => res['data']);
              setLayouts({
                lg: res['data'],
                md: res['data'],
                sm: res['data'],
                xs: res['data'],
                xxs: res['data']
              })
              console.log("received tiles")
            })

    }
    
  },[pid])

function tiles(exp,el) {
    var html = <h1>test</h1>
    switch (exp) {
      case 'image':
        html = <img  src={el.data} />
        break;
      
      case 'number':
      
        html = ( <p className="text-center font-bold text-3xl align-middle py-4">
        {el.data}
          </p>)
        break;

      case 'piechart':
        console.log(el.data)
        html = (
          <Piechart dat={el.data} />
        )
        break;
      
      default:
        html = <textarea  defaultValue="write something here..."/>

        break;
    }
    return html
}




  const onDrop = async (layout, layoutItem, _event) => {
    var data = JSON.parse(_event.dataTransfer.getData('text/plain'))
    
  //   setLayout(layoutState.concat( [{i: String(layoutState.length +1), x:layoutItem.x,y:layoutItem.y,w:data.w,h:data.h,name: data.name,data:'', type: data.types}]))
  //   setLayouts({
  //     lg: layoutState.concat([{i: String(layoutState.length +1), x:layoutItem.x,y:layoutItem.y,w:data.w,h:data.h,name: data.name,data:'',type: data.types}]),
  //     md: layoutState.concat([{i: String(layoutState.length +1), x:layoutItem.x,y:layoutItem.y,w:data.w,h:data.h,name: data.name,data:'',type: data.types}]), 
  //     sm: layoutState.concat([{i: String(layoutState.length +1), x:layoutItem.x,y:layoutItem.y,w:data.w,h:data.h,name: data.name,data:'',type: data.types}]),
  //     xs: layoutState.concat([{i: String(layoutState.length +1), x:layoutItem.x,y:layoutItem.y,w:data.w,h:data.h,name: data.name,data:'',type: data.types}]), 
  //     xxs: layoutState.concat([{i: String(layoutState.length +1), x:layoutItem.x,y:layoutItem.y,w:data.w,h:data.h,name: data.name,data:'',type: data.types}])
  // })
    


    if(data.types === 'image') {
      layout[layoutState.length].data =  data.api

    } else {
      const did = Cookies.get('api_token')
      var myHeaders = new Headers();
      myHeaders.append("api_token", did)
      var response = await fetch(data.api, {
              method: 'GET',
              credentials: 'include',
              headers: myHeaders,
            }).then(res => res.json())

      let newlayout = []
      layoutState.map(e => {
      let temp = layouttemp.find(x => x.i == e.i)
     console.log(temp)
      let temp2 = e
      temp2.w = temp.w
      temp2.h = temp.h
      temp2.x = temp.x
      temp2.y = temp.y

      newlayout = newlayout.concat(temp2)

    })
    console.log(newlayout)
    console.log(layouttemp)
      setLayout(newlayout.concat( [{i: String(newlayout.length +1), x:layoutItem.x,y:layoutItem.y,w:data.w,h:data.h,name: data.name,data:await response.data,type: data.types}]))

      setLayouts({
        lg: newlayout.concat([{i: String(newlayout.length +1), x:layoutItem.x,y:layoutItem.y,w:data.w,h:data.h,name: data.name,data:await response.data,type: data.types}]),
        md: newlayout.concat([{i: String(newlayout.length +1), x:layoutItem.x,y:layoutItem.y,w:data.w,h:data.h,name: data.name,data:await response.data,type: data.types}]), 
        sm: newlayout.concat([{i: String(newlayout.length +1), x:layoutItem.x,y:layoutItem.y,w:data.w,h:data.h,name: data.name,data:await response.data,type: data.types}]),
        xs: newlayout.concat([{i: String(newlayout.length +1), x:layoutItem.x,y:layoutItem.y,w:data.w,h:data.h,name: data.name,data:await response.data,type: data.types}]), 
        xxs: newlayout.concat([{i: String(newlayout.length +1), x:layoutItem.x,y:layoutItem.y,w:data.w,h:data.h,name: data.name,data:await response.data,type: data.types}])
    })

    var myHeaders = new Headers();
          myHeaders.append("api_token", did)
          myHeaders.append('Content-Type','application/json')
          // send layoutState and layoutsState and Store on mongodb
          const file = fetch(`http://localhost:5000/tiles/add/${pid}`, {
            method: 'POST',
            credentials: 'include',
            
            headers: myHeaders,
            body: JSON.stringify({"data":layoutState.concat( [{i: String(layoutState.length +1), x:layoutItem.x,y:layoutItem.y,w:data.w,h:data.h,name: data.name,data:await response.data,type: data.types}])})
          }).then(res => res.json())  
          .then(res => console.log(res))
  
    }
      
    

     

  }

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

    let temp = [...layoutState]
    temp.map(e => {
      let foo = layout.find(x => x.i == e.i)
      let poo = e
      console.log(e)
      // poo.w = foo.w
      // poo.h = foo.h
      // poo.x = foo.x
      // poo.y = foo.y
    })
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

     

  }

 async function  deleteT(i)  {
      var newLayout = layoutState.filter((el) => el.i != i)
      setLayout([...newLayout])
      var myHeaders = new Headers();
      myHeaders.append("api_token", did)
      myHeaders.append('Content-Type','application/json')
      // send layoutState and layoutsState and Store on mongodb
      const file = fetch(`http://localhost:5000/tiles/add/${pid}`, {
        method: 'POST',
        credentials: 'include',
        
        headers: myHeaders,
        body: JSON.stringify({"data":newLayout})
      }).then(res => res.json())  
      .then(res => console.log(res))

  }
  
  function openSidebar(index) {
    if (typeof window !== "undefined") {

      const properties = document.getElementById('properties')
      properties.style.display = 'block';
      properties.value = index
      const closeButton = document.getElementById('closeButton')
      closeButton.value = index
    }
  }
 
  
  return (
    <>

    <DashboardLayout delete={(value) => deleteT(value)}>

    <ResponsiveGridLayout className="layout" layouts={layoutsState}
      onLayoutChange={(layout, layouts) => {
        onLayoutChange(layout, layouts)
      }}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
        onDrop={onDrop}
        isDroppable={true}
        autoSize={true}
        >
          {
           layoutState.map( el => {
             return (
                <div className="bg-white shadow-md rounded-md"  key={el.i}>
                  <div   className="border-b-1 p-4 rounded-t flex justify-between">
                   <div className="flex">
                    <img src="/eye.svg"/>
                    <p className="ml-2">
                    {el.name}
                      </p>
                   </div>
                   <div className="my-auto">
                  <button onClick={ () => openSidebar(el.i)}>
                 <img className="" src="/3dot.svg"/>
                 </button>
                   </div>
                  </div>
                 <>
                  { tiles(el.type,el) }
                 </>
                  </div>
                  )
                }) 
              }
              <style jsx>{`
        
.border-b-1 {
    border-bottom: 1px solid #E8E8EF;

}

.border-r-1 {
    border-right: 1px solid #E8E8EF;

}
 
.backgroundTile {
    background-image: url('/tile.png');
    background-repeat: repeat;
    background-size: 30px 30px;
    background-color: #FBFBFB;
}
`}</style>

          
        
      </ResponsiveGridLayout>
  
    </DashboardLayout>

    </>
  )
}
