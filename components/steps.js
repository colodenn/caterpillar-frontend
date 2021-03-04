
function Steps({ eins, zwei, drei}) {
    console.log(eins)
    return ( 
    <>
        <div className="flex justify-center">
            <div className="px-8">
                <span className={`border-b-4 px-24  ${eins ? "border-green-400" : "border-gray-400"}`}></span>
                <p className="font-bold text-green-400 mt-2">STEP 1</p>
                <p className="font-semibold">Details</p>
            </div>
            <div className="px-8">
            <span className={`border-b-4 px-24 border-gray-400 ${zwei ? "border-green-400" : "border-gray-400"} `}></span>

                <p className="font-bold text-green-400 mt-2">STEP 2</p>
                <p className="font-semibold">Upload</p>
            </div>
            <div className="px-8">
            <span className={`border-b-4 px-24 ${drei ? "border-green-400" : "border-gray-400"}`}></span>

                <p className="font-bold text-green-400 mt-2">STEP 3</p>
                <p className="font-semibold">Review</p>
            </div>
           
        </div>
    </>
)};

export default Steps;
