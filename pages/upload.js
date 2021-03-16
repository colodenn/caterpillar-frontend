import Layout from '../components/layout'
import Steps from '../components/steps'
import {motion} from 'framer-motion'
import Link from 'next/link'
import Upload from '../components/upload'
export default function Home() {
  return (
    <>
    <Layout>
      <div className="container flex justify-center">
        <div>
        <Steps  eins='true' />
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
        Now upload or drag&drop
      </h1>

      <h3 className="text-2xl font-medium text-center mb-10">
        eventlog data
      </h3>

      
        <Upload/>

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
