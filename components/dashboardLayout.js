import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const DashboardLayout = (props) => {

    return (
        <>
<div className="h-screen disableScroll overflow-hidden " >
        <nav className=" w-screen py-2 px-8 border-b-1 z-50 bg-white">
            <div className="flex my-auto mt-2 justify-between">
            <div className="">
                <div className="inline-block mr-4">

                <img className=" my-auto bg-gray-200 rounded-full mt-0 p-3 " style={{ "width": "40px", "height": "40px"}} src="/arrow.svg" />

                </div>

                  
                   <div className="inline-block">
                   <h1 className="font-semibold">Dashboard</h1>
                    <p className="font-medium text-gray-400">Back</p>

                   </div>

                 

                </div>
                <div className="flex">
                    <p className="m-auto font-medium ">RequestForPayment.xes</p>
                </div>
                
                <div>

                <button className="border  rounded px-2 py-2 text-gray-400 font-medium ">Discard</button>
                    <span className="mr-2 ml-2"></span>
                    <button className="bg-blue-400 rounded px-2 py-2 text-white font-medium ">Publish & export</button>
                </div>


            </div>
        </nav>
        <div className="flex disableScroll">

        <aside className="mt-0 fixed bg-white w-96 border-r-1 h-screen">
        <div className="">
        <div className="block">
            <div className="px-4 py-2">
        <h2 className="font-medium text-2xl mb-2">Blocks</h2>

        <img src="/search.svg" className="absolute ml-2 mt-5"></img>
        <input type="text" className=" h-10 w-full mt-2  rounded align-middle" style={{ 'text-indent': '28px',     'border': '1px solid #E8E8EF',    'box-shadow': '0px 2px 8px rgb(34 34 87 / 5%)' }} placeholder="Search blocks"/>
            </div>

        </div>

</div>
       

<Tabs>
    <div className=" border-b-1">

        <TabList className="flex mt-4 mb-2 py-2">
            <Tab  className="mx-auto text-center font-medium ">Statistics</Tab>
            <Tab  className="mx-auto text-center font-medium ">Discovery</Tab>
            <Tab className="mx-auto text-center font-medium ">Algorithmen</Tab>
        </TabList>
    </div>
    
    <TabPanel>   

<div className="py-4 px-6">

        <div   className="flex cursor-pointer droppable-element mb-8"
          draggable={true}
          unselectable="on"

          // this is a hack for firefox
          // Firefox requires some kind of initialization
          // which we can do by adding this attribute
          // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
          onDragStart={e => e.dataTransfer.setData('text/plain', '{"color":"#C71585","h":1,"w":1,"name":"Event count","api": "http://localhost:5000/api/eventcount/RequestForPayment.xes","types":"number"}')}>

<img src="/grabme.svg"></img>
<div className="flex">
  <div className="p-2 bg-gray-100 rounded my-auto ml-4">

      <img src="/eye.svg"></img>
  </div>
</div>
<div className="ml-4">
  <p className="font-medium text-md">
      Create Eventcount Tile
  </p>
  <p className="font-regular text-md">
      size of 1x1
  </p>
</div>
</div>
       
<div   className="mt-5 flex cursor-pointer droppable-element mb-8"
          draggable={true}
          unselectable="on"

          // this is a hack for firefox
          // Firefox requires some kind of initialization
          // which we can do by adding this attribute
          // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
          onDragStart={e => e.dataTransfer.setData("text/plain", '{"color":"#C71585","h":1,"w":1,"name":"Event count","types":"number"}')}>

<img src="/grabme.svg"></img>
<div className="flex">
  <div className="p-2 bg-gray-100 my-auto rounded ml-4">

      <img src="/eye.svg"></img>
  </div>
</div>
<div className="ml-4">
  <p>
     This should produce a red tile
  </p>
  <p>
      and be 2x2
  </p>
</div>
</div>
<div   className="mt-5 flex cursor-pointer droppable-element mb-8"
          draggable={true}
          unselectable="on"

          // this is a hack for firefox
          // Firefox requires some kind of initialization
          // which we can do by adding this attribute
          // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
          onDragStart={e => e.dataTransfer.setData("text/plain", '{"color":"#C71585","h":3,"w":3,"name":"Event count","types":"pie","api": "http://localhost:5000/api/activitesArray/RequestForPayment.xes"}')}>

<img src="/grabme.svg"></img>
<div className="flex">
  <div className="p-2 my-auto bg-gray-100 rounded ml-4">

      <img  src="/eye.svg"></img>
  </div>
</div>
<div className="ml-4">
  <p>
    Activities
  </p>
  <p>
      and be 2x2
  </p>
</div>

</div>

     </div>  
     </TabPanel>
     <TabPanel>
         test
     </TabPanel>
</Tabs>
       
       
        </aside>
    <main className="flex-1 flex disableScroll backgroundTile overflow-y-scroll h-screen  ml-96 mt-0">
        <div className='flex-1   mx-auto p-4'>{props.children}</div>
    </main>
        </div>
    </div>
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
    </>
    )
}

export default DashboardLayout;