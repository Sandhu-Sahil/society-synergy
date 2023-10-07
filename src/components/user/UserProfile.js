import { useEffect } from "react"

export default function UserProfile({ data }){
    useEffect(() => {
        console.log(data)
    }, [])
    return(
        <>
            
        </>
    )
}

export async function getServerSideProps() { 
    let dataFromSomeAPI = await axios.get(`http://localhost:3003/api/v1/test/ping`)
  
    return {props: {data: dataFromSomeAPI.data}}
}