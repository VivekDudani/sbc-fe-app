import './App.css';
import {useState, useEffect} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import GLogin from "./login/GLogin";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import GLogout from "./login/GLogout";

function App() {
    document.title = 'SoulPeace';
    // return (
    //     <div>
    //         <header className="App-header" style={{fontStyle:'bold'}}>
    //             <h2>SoulPeace SBC Practices</h2>
    //             <h4 >{hkc}</h4>
    //         </header>
    //         <GLogin/>
    //         <br/>
    //         <div style={{padding: 5}}>
    //             <AddPractices userDetails={CurrentLoggedInUserDetails().userDetails} setUserDetail={CurrentLoggedInUserDetails().setUserDetails}/>
    //         </div>
    //         <DisplayPractices/>
    //     </div>
    // );
    const [user, setUser] = useState({});

    useEffect(() => {
        const currentUser = localStorage.getItem("user");

        if (currentUser && !currentUser.includes("undefined")) {
            setUser(JSON.parse(currentUser));
        }
    }, []);
    console.log(user);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"
                       element={user?.email ? <Navigate to="/home" /> : <Landing/>}
                />
                <Route path="/login"
                       element={user?.email ? <Navigate to="/home" /> : <GLogin />}
                />
                <Route path="/logout"
                       element={ <GLogout /> }
                />
                <Route path="/home"
                       element={user?.email ? <Home user={user} /> : <Navigate to="/" />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
