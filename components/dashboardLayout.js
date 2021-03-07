const DashboardLayout = (props) => ( 
    <>
    <div className="flex h-screen">
  
 <div className="h-screen sticky top-0 bg-gray-500 w-64">
        // Fixed Sidebar
    </div>
        
    </div>
        <main className="flex-1 flex overflow-hidden">
            <div className='flex-1 overflow-y-scroll container mx-auto px-4'>{props.children}</div>
            
        </main>
    </>
);

export default DashboardLayout;
