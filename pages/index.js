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
              <p className="mt-4">Quick and easy insights into your Eventlogs</p>
              <div className="flex mt-4">
                <button className="bg-pink-400 px-4 py-2 rounded text-white">
                  Get started
                </button>
                <p className="my-auto ml-4">
                  Only .xes and .csv
                </p>
              </div>
            </div>
            <div>
                
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
