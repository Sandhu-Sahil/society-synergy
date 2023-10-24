import { useEffect } from "react"
import { toast } from "react-toastify"

toast.configure();
export default function UserProfile({ data }){
    useEffect(() => {
        console.log(data)
    }, [])
    return(
        <>
            <h2 style={{color:"white"}}>will be implemented soon</h2>
        </>
    )
}

export async function getServerSideProps() { 
    let dataFromSomeAPI = await axios.get(`http://localhost:3003/api/v1/test/ping`)
  
    return {props: {data: dataFromSomeAPI.data}}
}