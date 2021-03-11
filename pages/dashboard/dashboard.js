import { Responsive, WidthProvider } from 'react-grid-layout';
import React, {useState} from 'react';
const ResponsiveGridLayout = WidthProvider(Responsive);
import DashboardLayout from '../../components/dashboardLayout'
import EventCount from '../../components/eventcount'
import Piechart from '../../components/piechart'
import Dante from 'Dante2'

import Barchart from '../../components/barchart'
import { map, set } from 'lodash';
import axios from 'axios';


export default function  dashboard() {
  
 
  const layout1 = [
    {i: '1', x: 0, y: 0, w: 4, h: 3,name: "Start adding tiles", data: {data: []}},

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
      console.log(changeLayout)
      console.log(layoutState)

      console.log(layoutsState)
      console.log(layout)
      
      layout.splice(0,layoutState.length,...layoutState) 
 
      layout[layoutState.length] =  {i: String(layoutState.length + 1), x:layoutItem.x,y:layoutItem.y,w:data.w,h:data.h,name: data.name,data:'',type: data.types}
      setLayout([...layout])
      setLayouts({
        lg: [...layout],
        md: [...layout], 
        sm: [...layout],
        xs: [...layout], 
        xxs: [...layout]
    })
    var response =  await axios.get(data.api)

      layout[layoutState.length].data =  response.data
      setLayout([...layout])
      setLayouts({
          lg: [...layout],
          md: [...layout], 
          sm: [...layout],
          xs: [...layout], 
          xxs: [...layout]
      })

    
  }
    
  function click() {
    console.log(layoutState)
    console.log(layoutsState)
    console.log(changeLayout)

  }

  const onLayoutChange = (layout, layouts) => {
     changeLayout = layouts
    
  }

  function deleteT(i){
    console.log(layoutState)
      var newLayout = layoutState.filter((el) => el.i != i)
      setLayout([...newLayout])
      console.log(i)
  
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
                  <div onClick={click}  className="border-b-1 p-4 rounded-t flex justify-between">
                   
                   <div className="flex">

                    <img src="/eye.svg"/>
                    <p className="ml-2">
                    {el.name}
                      </p>


                   </div>

                   <div>
                     <button onClick={() => deleteT(el.i)}  >delete</button>
                   </div>
                  </div>
                  {el.type == "number" ? (
                    <p className="text-center font-bold text-3xl align-middle py-4">
                    {el.data.data}
                      </p>
                  ):
                  (
                    // <Barchart dat={el.data} />
                      <>

                      <Piechart dat={el.data.data} />


                      
                    
                        </>
                    )

                  
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
                  </div>
                  
             )
           }) 

          }

          
        
      </ResponsiveGridLayout>
    </DashboardLayout>

    </>
  )
}
