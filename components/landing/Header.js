const Header = (props) => {
return (
    <>
        <div className="px-16 py-12 flex justify-between">
            <div className="flex">
                <h1 className="text-4xl font-medium">caterpillar</h1>
                <span className="border-r-2 border-black w-2"></span>
                <div className="flex">
                    <ul className="flex">
                        <li>
                            Features
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
            <div className="flex">
                <button className="bg-black rounded text-white px-4 py-2 ">
                    Login
                </button>
            </div>
        </div>

        <style jsx>{`
        li{
            margin-left: 10px;
            margin-right: 10px;
            font-size: 1.5rem;
        },

`}</style>
    </>
)
}

export default Header;