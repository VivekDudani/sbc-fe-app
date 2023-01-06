import GLogin from "../login/GLogin";
import * as React from "react";
import Footer from "./Footer";
import logo from "../soulpeace_logo_small_white.png";

const Landing = () => {
    return (
        <>
            <header style={{ textAlign: "center" }} className="App-header">
                <h1>Welcome to SoulPeace SBC</h1>
            </header>
            <main style={{ justifyContent: "center", padding:100, gap: "2rem"}}
                // backgroundImage: `url(${logo})`, backgroundPosition: 'center',
                // backgroundSize: 'cover', backgroundPositionX:10,
                // backgroundRepeat: 'no-repeat' }}
            >
                {/*<div style={{ backgroundImage: `url(${logo})` }}>*/}

                    <GLogin />
                {/*</div>*/}
            </main>
            <Footer/>
        </>
    );
};

export default Landing;