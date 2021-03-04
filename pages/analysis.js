import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import Steps from '../components/steps'
import {motion} from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { PureComponent } from 'react';
import { ResponsiveBar } from '@nivo/bar'
import BarChart from '../components/barchart'
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import html2canvas from 'html2canvas';
let jsPDF = null;

if (typeof window !== "undefined") {
  import("jspdf").then(module => {
    jsPDF = module.default;
  });
}

var te,data,resourceCount;

export default function Home()  {

  if (typeof window !== "undefined") {
    te = JSON.parse(localStorage.getItem('data'))
     
    data = JSON.parse(localStorage.getItem('data')).activitiesCount
    resourceCount = JSON.parse(localStorage.getItem('data')).resourceCount
    
    }
  const print = () => {
 
    html2canvas(document.getElementById('test'),{scale: 1}).then(function (canvas) {

      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();
    doc.text('BPI CHALLENGE BLA BLA BLA 2020',10,10);

      doc.addImage(img, 'JPEG', 0, -100);
      doc.save("pdf.pdf")     
  });

  }
  
  return (
    <>
    <Layout>
      <div className="container flex justify-center">
        <div>
        <Steps zwei="true" eins="true" />
<motion.div initial="hidden" animate="visible" variants={{
  hidden: {
    scale: 0.8,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.2
    }
  }
}}>
      
 {data ? ( <div id="test">
  <div id="wrapper" className="max-w-xl px-4 py-4 mx-auto mb-24 mt-12">
            <div className="sm:grid sm:h-32 sm:grid-flow-row sm:gap-4 sm:grid-cols-3">
                <div id="jh-stats-positive" className="flex flex-col justify-center px-4 py-4 bg-white border border-gray-300 rounded">
                    <div>
                        <p className="text-3xl font-semibold text-center text-gray-800">{te.eventCount}</p>
                        <p className="text-lg text-center text-gray-500">Event count</p>
                    </div>
                </div>
    
                <div id="jh-stats-negative" className="flex flex-col justify-center px-4 py-4 mt-4 bg-white border border-gray-300 rounded sm:mt-0">
                    <div>
                        <p className="text-3xl font-semibold text-center text-gray-800">{te.meanDurchlaufzeit}</p>
                        <p className="text-lg text-center text-gray-500">mean durchlaufzeit</p>
                    </div>
                </div>
                <div id="jh-stats-neutral" className="flex flex-col justify-center px-4 py-4 mt-4 bg-white border border-gray-300 rounded sm:mt-0">
                    <div>
                        <p className="text-3xl font-semibold text-center text-gray-800">{Math.min(...te.durchlaufzeit)}</p>
                        <p className="text-lg text-center text-gray-500">min durchlaufzeit</p>
                    </div>
                </div>
                <div id="jh-stats-negative" className="flex flex-col justify-center px-4 py-4 mt-4 bg-white border border-gray-300 rounded sm:mt-0">
                    <div>
                        <p className="text-3xl font-semibold text-center text-gray-800">{Math.max(...te.durchlaufzeit)}</p>
                        <p className="text-lg text-center text-gray-500">max durchlaufzeit</p>
                    </div>
                </div>
                <div id="jh-stats-negative" className="flex flex-col justify-center px-4 py-4 mt-4 bg-white border border-gray-300 rounded sm:mt-0">
                    <div>
                        <p className="text-3xl font-semibold text-center text-gray-800">{te.durchlaufzeit.reduce((a,b) => a + b,0) / te.durchlaufzeit.length}</p>
                        <p className="text-lg text-center text-gray-500">average durchlaufzeit</p>
                    </div>
                </div>
            </div>
        </div>


    <BarChart id="svg"  dat={resourceCount} />
    <BarChart id="svg"  dat={data} />

    </div>
    ): (<p>empty</p>)}
<div>

</div>

      </motion.div>
      </div>
      </div>
      <div className="mx-auto font-sans text-center mt-10">
    <Link href="/upload">
    <button className="mr-2 bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-gray py-2 px-4 border border-gray-500 hover:border-transparent rounded">
          Back
        </button>
    </Link>
        
        <Link href="/export">
        <button onClick={print} className="ml-2 bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
          CONTINUE
        </button>
        </Link>

      </div>
    </Layout>

    <style jsx>{`
        li {
          margin-bottom: 40px;
          
        }
`}</style>

  </>
  )




}
