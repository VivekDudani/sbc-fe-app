import './App.css';
import * as React from "react";
import {useState} from "react";
import {TextField} from "@mui/material";
import AddPractices from "./AddPractices";
import {DisplayPractices} from "./DisplayPractices";
import GLogin from "./login/GLogin";

let hkc = "हरे कृष्ण हरे कृष्ण, कृष्ण कृष्ण हरे हरे। हरे राम हरे राम, राम राम हरे हरे।।";

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

function App() {
    document.title = 'SoulPeace';
    return (
        <div>
            <header className="App-header" style={{fontStyle:'bold'}}>
                <h2>SoulPeace SBC Practices</h2>
                <h4 >{hkc}</h4>
            </header>
            {/*<GLogin/>*/}
            <br/>
            <div style={{padding: 5}}>
                <AddPractices userDetails={CurrentLoggedInUserDetails().userDetails} setUserDetail={CurrentLoggedInUserDetails().setUserDetails}/>
            </div>
            <DisplayPractices/>
        </div>
    );
}

export default App;
