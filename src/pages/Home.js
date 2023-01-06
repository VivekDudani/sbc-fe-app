import AddPractices from "../AddPractices";
import {DisplayPractices} from "../DisplayPractices";
import * as React from "react";
import {useState} from "react";
import {withStyles} from "@mui/styles";
import Footer from "./Footer";
import Header from "./Header";
import Paper from "@mui/material/Paper";
import {Toolbar} from "@mui/material";

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
    const styles = (theme) => ({
        toolbar: theme.mixins.toolbar,
    });

    const tb = withStyles(styles);
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