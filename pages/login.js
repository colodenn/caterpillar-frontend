import { useRouter } from 'next/router'
import { Magic } from 'magic-sdk'
// const checkAuth = dynamic(() => import('../lib/checkLogin'))
import useAuth from "../hooks/useAuth";
import Cookies from 'universal-cookie';

export default function Login() {
  const { user, loading } = useAuth();
  const cookies = new Cookies();

  // checkAuth('/dashboard/dashboard')
  
  const router = useRouter()
  
  if(user){
    router.push('/dashboard/dashboard')
  }
  


  const handleSubmit = async (event) => {
    event.preventDefault()

    const { elements } = event.target

    // the Magic code
    const did = await new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY)
      .auth
      .loginWithMagicLink({ email: elements.email.value })

    // Once we have the did from magic, login with our own API
    const authRequest = await fetch('http://localhost:5000/v1/user/login', {
      method: 'POST',
      headers: { Authorization: `Bearer ${did}` },
     
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
         cookies.set('api_token', json.did_token, { path: '/' });
      // We successfully logged in, our API
      // set authorization cookies and now we
      // can redirect to the dashboard!
      router.push('/dashboard/test')
        });
      }
    });

    if (authRequest) {
    
    } else { /* handle errors */ }
  }
  return (
    <>
    <div className="h-screen w-screen overflow-hidden">
      <aside className="fixed h-full w-20 border-r-1  ">
        <img src="/logo.svg" className="mx-auto mt-8" />
      </aside>
      <div className="flex ml-20 p-36 px-48 justify-between">

          <div className="m-auto mr-8 ">
          <form onSubmit={handleSubmit}>
          <h1 className="text-5xl font-bold  ">
                Sign in to Caterpillar <br></br> Analysis Dashboard
              </h1>
                      <div className="mt-10 relative border-b-2 focus-within:border-gray-500">
                  <input type="text" name="email" placeholder=" " className="block w-full appearance-none bg-transparent focus:outline-none " />
                  <label htmlFor="email" className="absolute top-0 duration-300 origin-0" style={{ 'zIndex': '-1'}}>Email</label>
          </div>
              <br></br>
              <button type="submit" className="bg-gray-800 px-6 py-2 text-white text-xl mt-8 rounded hover:bg-gray-700">
                Sign in
              </button>
          </form>
          </div>
        <div className="m-auto">
            <img  src="/login.svg" />
        </div>
      </div>
    </div>
    <style jsx>{`
   
        
        .border-b-1 {
            border-bottom: 1px solid #E8E8EF;
        
        }
        
        .border-r-1 {
            border-right: 1px solid #E8E8EF;
        
        }
         
      
        `}</style>
    </>
  )
}