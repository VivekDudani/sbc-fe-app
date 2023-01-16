import AddPractices from "../AddPractices";
import {DisplayPractices} from "../DisplayPractices";
import * as React from "react";
import {useState} from "react";
import Footer from "./Footer";
import Header from "./Header";

function CurrentLoggedInUserDetails() {

    const [loggedInUser, setLoggedInUser] = useState({
        userID: 'VivekD',
        fullName: 'Vivek Dudani'
    });

    return {
        userDetails: loggedInUser,
        setUserDetails: setLoggedInUser
    };
}


export default function Home(props) {
    let hkc = "हरे कृष्ण हरे कृष्ण, कृष्ण कृष्ण हरे हरे। हरे राम हरे राम, राम राम हरे हरे।।";

    return <>
        <Header/>

        {/*<div>*/}
        {/*<main>*/}

                <div style={{paddingTop: '6rem'}}>
                    <AddPractices userDetails={props.user} setUserDetail={CurrentLoggedInUserDetails().setUserDetails}/>
                    <DisplayPractices/>
                </div>
        {/*</main>*/}
        {/*</div>*/}
        {/*<Footer/>*/}
    </>
        ;
}