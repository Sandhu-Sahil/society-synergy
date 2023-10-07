import { Footer, Header } from "@/components";
import Background from "@/components/Background";
import Head from "next/head";
import ProfileShow from "@/components/ProfileShow";

export default function Profile() {

    return (
        <>
            <Head>
                <title>Society Synergy: Profile</title>
                <meta name="description" content="Society Synergy is an application that connects all the societies and clubs at JITT-128, Noida" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Header selected={'Profile'}/>
            <Background />
            <ProfileShow />
            <Footer />
        </>
    )
}
