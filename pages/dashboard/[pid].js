import { Responsive, WidthProvider } from 'react-grid-layout';
import React, {useState} from 'react';
const ResponsiveGridLayout = WidthProvider(Responsive);
import DashboardLayout from '../../components/dashboard/dashboardLayout'
import Piechart from '../../components/charts/piechart'
import Cookies from 'js-cookie';

import { useRouter } from 'next/router'

import { resetIdCounter } from 'react-tabs';

export default function  dashboardSlug() {
  const router = useRouter()
  const { pid } = router.query
resetIdCounter();

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

      html = (
        <Piechart dat={el.data} />
      )
      break;
    
    default:
      html = <p className="p-4">This is static tile</p>
      break;
  }
  return html

}


const did = Cookies.get('api_token')


  const layout1 = [
    {i: '1', x: 0, y: 0, w: 2, h: 2,static: true,name: "Start adding tiles", data: {data: []}},

  ];
  var layoutst = {
    lg: layout1, md: layout1, sm: layout1, xs: layout1, xxs: layout1
  }
  const [layoutState, setLayout] = useState(layout1)
  const [layoutsState, setLayouts] = useState(layoutst)
  var changeLayout;

  const onDrop = async (layout, layoutItem, _event) => {
    // setLayout([...layoutState].push({i: String(layoutState.length + 1), x:layoutItem.x,y:layoutItem.y,w:layoutItem.w,h:layoutItem.h}))
      // console.log(layoutState)
      
      // setLayout(() => layout.concat({i: String(layoutState.length + 1), x:layoutItem.x,y:layoutItem.y,w:layoutItem.w,h:layoutItem.h}))
      // console.log(layout.concat({i: String(layoutState.length + 1), x:layoutItem.x,y:layoutItem.y,w:layoutItem.w,h:layoutItem.h}))
      var data = JSON.parse(_event.dataTransfer.getData('text/plain'))
      
      layout.splice(0,layoutState.length,...layoutState) 
      console.log(changeLayout.length)
      console.log(changeLayout)
      layout[layoutState.length-1].x = changeLayout[layoutState.length-1].x
      layout[layoutState.length-1].y = changeLayout[layoutState.length-1].y
      layout[layoutState.length-1].w = changeLayout[layoutState.length-1].w
      layout[layoutState.length-1].h = changeLayout[layoutState.length-1].h
      layout.pop()

      layout[layoutState.length] =  {i: String(layoutState.length + 1), x:layoutItem.x,y:layoutItem.y,w:data.w,h:data.h,name: data.name,data:'',type: data.types}
      setLayout([...layout])
      setLayouts({
        lg: [...layout],
        md: [...layout], 
        sm: [...layout],
        xs: [...layout], 
        xxs: [...layout]
    })
    console.log(data.types)
    
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

      layout[layoutState.length].data =  await response.data
    }
      
    
      setLayout([...layout])
      setLayouts({
          lg: [...layout],
          md: [...layout], 
          sm: [...layout],
          xs: [...layout], 
          xxs: [...layout]
      })
      console.log(layoutState)
      console.log(layoutsState)
      var myHeaders = new Headers();
      myHeaders.append("api_token", did)
      myHeaders.append('Content-Type','application/json')
      // send layoutState and layoutsState and Store on mongodb
      const file = fetch(`http://localhost:5000/tiles/add/${pid}`, {
        method: 'POST',
        credentials: 'include',
        
        headers: myHeaders,
        body: JSON.stringify({"data":layout})
      }).then(res => console.log(res))  

  }
    
  function click() {
    var myHeaders = new Headers();
    myHeaders.append("api_token", did)
    const file = fetch(`http://localhost:5000/tiles/${pid}`, {
            method: 'GET',
            credentials: 'include',
            headers: myHeaders
          }).then( res => res.json()).then( res => setLayout(res['data']))
          console.log(layoutState)
          console.log(layoutsState)

  }

  const onLayoutChange = (layout, layouts) => {
     changeLayout = layout
    

    
  }

  function deleteT(i){
      var newLayout = layoutState.filter((el) => el.i != i)
      setLayout([...newLayout])
  
  }

  
  return (
    <>

    <DashboardLayout>


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
                     <button onClick={() => deleteT(el.i)} className="bg-red-400 w-12 rounded-full text-white">
                        D
                     </button>
                     <button className="bg-green-400 w-12 rounded-full text-white" onClick={click}>
                       click 
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
