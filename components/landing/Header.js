import Link from 'next/link'

const Header = (props) => {
return (
    <>
        <div className="px-24 flex justify-between">
            <div className="flex">
                <h1 className="text-4xl font-medium mr-12 mt-12">caterpillar</h1>
                <span className="border-r-2 border-gray-500 w-2  mr-12 "></span>
                <div className="flex mt-12">
                    <ul className="flex">
                        <li >
                            <a>
                                Features
                            </a>
                        </li>
                        <li>
                            Why Caterpillar
                        </li>
                        <li>
                            Pricing
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex mt-12">
                
                <Link href="/login">
                <button className="bg-black rounded-md text-white px-8 py-2 ">

                Login
                </button>

                </Link>
            </div>
        </div>

        <style jsx>{`
        li{
            margin-left: 20px;
            margin-right: 20px;
            font-size: 1.125rem;
            vertical-align: bottom;
            padding: 0;
            display:inline-block; 
            margin-top: 12px;
        },
        ul {
            vertical-align: bottom;
        },
 
       

`}</style>
    </>
)
}

export default Header;