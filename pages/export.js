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
<Steps zwei="true" eins="true" drei="true" />

<div className="mx-auto font-sans text-center mt-10">
    <Link href="/analysis">
    <button className="mr-2 bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-gray py-2 px-4 border border-gray-500 hover:border-transparent rounded">
          Back
        </button>
    </Link>
        
        <Link href="/#">
        <button className="ml-2 bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
          EXPORT
        </button>
        </Link>

      </div>
</Layout>
  </>
  )
}
