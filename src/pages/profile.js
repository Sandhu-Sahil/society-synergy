import { Footer, Header } from "@/components";
import Background from "@/components/Background";
import Head from "next/head";
import ProfileShow from "@/components/ProfileShow";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import GetUser from "@/services/userService/GetUser";
import GetHome from "@/services/home/Home";

export default function Profile( {data}) {
    return (
        <>
            <Head>
                <title>Society Synergy: Profile</title>
                <meta name="description" content="Society Synergy is an application that connects all the societies and clubs at JITT-128, Noida" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Header selected={'Profile'} departments={data.clubs}/>
            <Background />
            <ProfileShow/>
            <Footer />
        </>
    )
}

export async function getServerSideProps() { 
    const res = await GetHome();
  
    return {props: {data: res.data}}
}