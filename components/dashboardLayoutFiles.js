const DashboardLayoutFile = (props) => {

    return (
        <>
<div className="h-screen disableScroll overflow-hidden " >
        <nav className=" w-screen py-2 px-8 border-b-1 z-50 bg-white">
            <div className="flex my-auto mt-2 justify-between">
            <div className="">
                    <img src="/logo.svg" className="rotate-90 transform" />
                </div>
                <div className="flex w-96">
                <img src="/search.svg" className="absolute ml-2 mt-5"></img>
        <input type="text" className=" h-10 w-full mt-2  rounded align-middle" style={{ 'text-indent': '28px',     'border': '1px solid #E8E8EF',    'box-shadow': '0px 2px 8px rgb(34 34 87 / 5%)' }} placeholder="Search files"/>
                </div>
                <div className="flex">
                    <div className="rounded-full w-12 h-12 mr-8">
                            <img src="/cat.png" className="rounded-full" />
                    </div>
                    <div className="my-auto">
                        <img src="/bell.svg" style={{ 'transform':'translate(-50%,-50%)'}} />
                                            </div>
                </div>
            </div>
        </nav>
        <div className="flex disableScroll">
        <aside className="mt-0 fixed bg-white w-96 border-r-1 h-screen">
            <div className="flex mt-8">
            <button className="hover:bg-blue-400 mx-auto bg-blue-500 px-4 py-2 text-white font-medium rounded">
                Upload file
            </button>
            </div>
         
        </aside>
    <main className="flex-1 flex disableScroll backgroundTile overflow-y-scroll h-screen  ml-96 mt-0 p-12">
        <div className='flex-1   mx-auto p-4'>{props.children}</div>
    </main>
        </div>
    </div>
    <style jsx>{`
    .react-tabs__tab--selected {
        border-bottom: 4px solid #60A5FA;
        padding-bottom: 0.5rem;

    }

    .react-tabs__tab-list {
        border-bottom: 4px solid #60A5FA;
    }
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

export default DashboardLayoutFile;