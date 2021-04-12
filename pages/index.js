import Header from '../components/landing/Header'


export default function Home() {
  return (
    <>
      <div className="background h-screen overflow-hidden" >
          <Header />
          <main className="flex">
            <div className="ml-72 mt-48">
                <h1 className="text-6xl font-bold">
                Get the most <br/>
                out of your <br/>
                Eventlogs
              </h1>
              <p>Quick and easy insights into your Eventlogs</p>
              <div className="flex">
                <button className="bg-pink-400 px-4 py-2 rounded text-white">
                  Get started
                </button>
                <p>
                  Only .xes and .csv
                </p>
              </div>
            </div>
            <div className="absolute right-0 mt-72 ">
              <h1 id="huge" className="text-center font-bold  w-full h-full">
                0 1 0 1 <br />
                0 1 0 1 <br />
                0 1 0 1
              </h1>
            </div>
          </main>
          
      </div>

    <style jsx>{`
        .background {
          background: radial-gradient(66.35% 213.61% at 77.27% 52.1%, rgba(160, 158, 252, 0.52) 0%, rgba(254, 199, 255, 0.74) 100%);
        }
        #huge {
          font-size: 500px;
          transform: rotate(45deg);
          letter-spacing: -0.105em;
          line-height: 66.5%;

        }
`}</style>

  </>
  )
}
