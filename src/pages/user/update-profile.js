import { Footer, Header } from "@/components";
import Background from "@/components/Background";
import UpdateProfile from "@/components/user/UserProfileUpdate";
import GetHome from "@/services/home/Home";
import Head from "next/head";

export default function Profile({data}) {

    return (
        <>
            <Head>
                <title>Society Synergy: Update</title>
                <meta name="description" content="Society Synergy is an application that connects all the societies and clubs at JITT-128, Noida" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Header selected={'Profile'} departments={data.clubs}/>
            <Background />
            <UpdateProfile />
            <Footer />
        </>
    )
}

export async function getServerSideProps() { 
    const res = await GetHome();
  
    return {props: {data: res.data}}
}