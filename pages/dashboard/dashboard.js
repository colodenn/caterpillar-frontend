import { Responsive, WidthProvider } from 'react-grid-layout';
import React, {useState} from 'react';
const ResponsiveGridLayout = WidthProvider(Responsive);
import DashboardLayout from '../../components/dashboardLayout'

import Barchart from '../../components/barchart'
import { map, set } from 'lodash';


export default function dashboard() {
  
  const activitiesCount = [
    {
      "count": 7504,
      "name": "Request For Payment SUBMITTED by EMPLOYEE"
    },
    {
      "count": 6343,
      "name": "Request For Payment FINAL_APPROVED by SUPERVISOR"
    },
    {
      "count": 6307,
      "name": "Payment Handled"
    },
    {
      "count": 6303,
      "name": "Request Payment"
    },
    {
      "count": 5489,
      "name": "Request For Payment APPROVED by ADMINISTRATION"
    },
    {
      "count": 2014,
      "name": "Request For Payment APPROVED by BUDGET OWNER"
    },
    {
      "count": 1085,
      "name": "Request For Payment REJECTED by EMPLOYEE"
    },
    {
      "count": 836,
      "name": "Request For Payment REJECTED by ADMINISTRATION"
    },
    {
      "count": 413,
      "name": "Request For Payment APPROVED by PRE_APPROVER"
    },
    {
      "count": 179,
      "name": "Request For Payment REJECTED by SUPERVISOR"
    },
    {
      "count": 74,
      "name": "Request For Payment SAVED by EMPLOYEE"
    },
    {
      "count": 66,
      "name": "Request For Payment REJECTED by MISSING"
    },
    {
      "count": 51,
      "name": "Request For Payment REJECTED by PRE_APPROVER"
    },
    {
      "count": 47,
      "name": "Request For Payment REJECTED by BUDGET OWNER"
    },
    {
      "count": 41,
      "name": "Request For Payment APPROVED by SUPERVISOR"
    },
    {
      "count": 41,
      "name": "Request For Payment FINAL_APPROVED by DIRECTOR"
    },
    {
      "count": 1,
      "name": "Request For Payment FOR_APPROVAL by SUPERVISOR"
    },
    {
      "count": 1,
      "name": "Request For Payment FOR_APPROVAL by ADMINISTRATION"
    },
    {
      "count": 1,
      "name": "Request For Payment FINAL_APPROVED by BUDGET OWNER"
    }
  ]

  const layout1 = [
    {i: '1', x: 0, y: 0, w: 10, h: 2},
    {i: '2', x: 1, y: 0, w: 3, h: 2},
    {i: '3', x: 4, y: 0, w: 1, h: 2}
  ];
  var layoutst = {
    lg: layout1, md: layout1, sm: layout1, xs: layout1, xxs: layout1
  }
  const [layoutState, setLayout] = useState(layout1)
  const [layoutsState, setLayouts] = useState(layoutst)


  const onDrop = (layout, layoutItem, _event) => {

    // setLayout([...layoutState].push({i: String(layoutState.length + 1), x:layoutItem.x,y:layoutItem.y,w:layoutItem.w,h:layoutItem.h}))
      // console.log(layoutState)
      
      // setLayout(() => layout.concat({i: String(layoutState.length + 1), x:layoutItem.x,y:layoutItem.y,w:layoutItem.w,h:layoutItem.h}))
      // console.log(layout.concat({i: String(layoutState.length + 1), x:layoutItem.x,y:layoutItem.y,w:layoutItem.w,h:layoutItem.h}))
      
      layout[layoutState.length] = {i: String(layoutState.length + 1), x:layoutItem.x,y:layoutItem.y,w:layoutItem.w,h:layoutItem.h}
      
      setLayout([...layout])
      setLayouts({
          lg: [...layout],
          md: [...layout], 
          sm: [...layout],
          xs: [...layout], 
          xxs: [...layout]
      })
        

      };

  const onLayoutChange = (layout, layouts) => {
    console.log(layout)
    // setLayouts(layoutsState)
 
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
           layoutState.map(el => {
             return (
                <div className="bg-green-400" key={el.i}>
                    {el.i}
                </div>
             )
           }) 
          }

          
        
      </ResponsiveGridLayout>
    </DashboardLayout>

    </>
  )
}
