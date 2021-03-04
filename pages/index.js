import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import Steps from '../components/steps'
import {motion} from 'framer-motion'
import Link from 'next/link'
export default function Home() {
  return (
    <>
    <Layout>
      <div className="container flex justify-center">
        <div>
        <Steps />
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
<div className="container-sm px-20 font-sans-roboto mt-20" >
      <h1 className="text-4xl font-light text-center ">
        At the beginning we want you to
      </h1>

      <h3 className="text-2xl font-medium text-center mb-10">
        upload your eventlog
      </h3>

      <ul className="text-left px-20 font-normal">
        <li className="font-bold">
          
Look how the uploading log should look like:
        </li>
        <li>
          Eventlog should contain Case ID and Activity column
          </li>
          <li>
          Accepted file types: csv, xes
          </li>
      </ul>
      </div>

      <div className="mx-auto font-sans text-center mt-10">
        <button className="mr-2 bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-gray py-2 px-4 border border-gray-500 hover:border-transparent rounded">
          Back
        </button>
        <Link href="/upload">
        <button className="ml-2 bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
          CONTINUE
        </button>
        </Link>

      </div>
      </motion.div>
      </div>
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
