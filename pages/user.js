import useAuth from "../hooks/useAuth";
import { useRouter } from 'next/router'

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter()

  console.log(user)


  if(user === undefined) {
    router.push('/login')
  }
  return (
    <>
      <h1>Dashboard</h1>
      {loading ? "Loading..." : user?.email}
    </>
  );
}