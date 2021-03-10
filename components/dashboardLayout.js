
const DashboardLayout = (props) => {

    return (
        <>
<div className="h-screen disableScroll " >
        <nav className="fixed w-screen h-12 border-b-2 z-50 bg-white">
        </nav>
        <div className="flex disableScroll">

        <aside className="mt-12 fixed bg-gwhite w-64 border-r-2 h-screen">
        <div className="border-b-2">
        <h2>Blocks</h2>
        <div className="flex">
        <img src="/search.svg"></img>
        <input type="text" placeholder="Search blocks"/>

        </div>

        <div className="flex">
            <div  className="mx-auto text-center">Triggers</div>
            <div  className="mx-auto text-center">Actions</div>
            <div className="mx-auto text-center">Loggers</div>
        </div>

       

        </div>
        <div   className="flex cursor-pointer droppable-element"
          draggable={true}
          unselectable="on"

          // this is a hack for firefox
          // Firefox requires some kind of initialization
          // which we can do by adding this attribute
          // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
          onDragStart={e => e.dataTransfer.setData('text/plain', '{"color":"#C71585","h":2,"w":2,"name":"Event count","api": "http://localhost:5000/api/eventcount/RequestForPayment.xes"}')}>

<img src="/grabme.svg"></img>
<div>
  <div className="p-2 bg-blue-100 rounded">

      <img src="/eye.svg"></img>
  </div>
</div>
<div>
  <p>
      This should produce a green tile
  </p>
  <p>
      size of 2x2
  </p>
</div>
</div>
       
<div   className="mt-5 flex cursor-pointer droppable-element"
          draggable={true}
          unselectable="on"

          // this is a hack for firefox
          // Firefox requires some kind of initialization
          // which we can do by adding this attribute
          // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
          onDragStart={e => e.dataTransfer.setData("text/plain", '{"color":"#C71585","h":1,"w":1,"name":"Event count"}')}>

<img src="/grabme.svg"></img>
<div>
  <div className="p-2 bg-blue-100 rounded">

      <img src="/eye.svg"></img>
  </div>
</div>
<div>
  <p>
     This should produce a red tile
  </p>
  <p>
      and be 2x2
  </p>
</div>
</div>
        </aside>
    <main className="flex-1 flex disableScroll h-screen  ml-64 mt-12">
        <div className='flex-1  backgroundTile mx-auto p-4'>{props.children}</div>
    </main>
        </div>
    </div>
    <style jsx>{`
         
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