import { Responsive, WidthProvider } from 'react-grid-layout';
import React, {useState} from 'react';
const ResponsiveGridLayout = WidthProvider(Responsive);
import DashboardLayout from '../../components/dashboardLayout'
import EventCount from '../../components/eventcount'

import Barchart from '../../components/barchart'
import { map, set } from 'lodash';
import axios from 'axios';


export default function  dashboard() {
  
 
  const layout1 = [
    {i: '1', x: 0, y: 0, w: 1, h: 1,name: "Start adding tiles"},

  ];
  var layoutst = {
    lg: layout1, md: layout1, sm: layout1, xs: layout1, xxs: layout1
  }
  const [layoutState, setLayout] = useState(layout1)
  const [layoutsState, setLayouts] = useState(layoutst)


  const onDrop = async (layout, layoutItem, _event) => {
    console.log(layout)
    console.log(layoutState)
    console.log(layoutState.length)
    // setLayout([...layoutState].push({i: String(layoutState.length + 1), x:layoutItem.x,y:layoutItem.y,w:layoutItem.w,h:layoutItem.h}))
      // console.log(layoutState)
      
      // setLayout(() => layout.concat({i: String(layoutState.length + 1), x:layoutItem.x,y:layoutItem.y,w:layoutItem.w,h:layoutItem.h}))
      // console.log(layout.concat({i: String(layoutState.length + 1), x:layoutItem.x,y:layoutItem.y,w:layoutItem.w,h:layoutItem.h}))
      var data = JSON.parse(_event.dataTransfer.getData('text/plain'))

      layout[layoutState.length] =  {i: String(layoutState.length + 1), x:layoutItem.x,y:layoutItem.y,w:data.w,h:data.h,name: data.name,data:''}
      setLayout([...layout])
      setLayouts({
        lg: [...layout],
        md: [...layout], 
        sm: [...layout],
        xs: [...layout], 
        xxs: [...layout]
    })
    var response =  await axios.get('http://localhost:5000/api/eventcount/RequestForPayment.xes')

      layout[layoutState.length].data =  response.data.eventcount


      setLayout([...layout])
      setLayouts({
          lg: [...layout],
          md: [...layout], 
          sm: [...layout],
          xs: [...layout], 
          xxs: [...layout]
      })
    console.log(layoutState)
        

      };

  const onLayoutChange = (layout, layouts) => {
    setLayouts(layoutsState)
 
  }

  // async function getData() {
  //   var temp = [];
  //   temp = await axios.get('http://localhost:5000/api/eventcount/RequestForPayment.xes')
  
  //   return temp
    

  // }
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
                <div className="bg-white shadow-md rounded-md" key={el.i}>
                  <div className="border-b-2 p-4 rounded-t">
                    {el.name}

                  </div>
                    {el.data}
                  </div>
             )
           }) 
          }

          
        
      </ResponsiveGridLayout>
    </DashboardLayout>

    </>
  )
}
