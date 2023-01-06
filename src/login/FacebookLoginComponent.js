import React, { useState } from "react";
import "../App.css";
// import FacebookLogin from "@greatsumini/react-facebook-login";

// function FacebookLoginComponent() {
//     const [login, setLogin] = useState(false);
//     const [data, setData] = useState({});
//     const [picture, setPicture] = useState("");
//
//     const responseFacebook = (response) => {
//         console.log(response);
//         console.log(response.status);
//         console.log(response.name);
//         console.log(response.picture.data.url);
//         // Login failed
//         if (response.status === "unknown") {
//             alert("Login failed!");
//             setLogin(false);
//             return false;
//         }
//         setData(response);
//         setPicture(response.picture.data.url);
//         if (response.accessToken) {
//             setLogin(true);
//         } else {
//             setLogin(false);
//         }
//     };
//     const logout = () => {
//         setLogin(false);
//         setData({});
//         setPicture("");
//     };
//
//     return (
//         <div className="container">
//             {!login && (
//                 <FacebookLogin
//                     appId="630157915465815"
//                     autoLoad={false}
//                     fields="name,email,picture"
//                     scope="public_profile,email,user_friends,groups_access_member_info"
//                     // callback={responseFacebook}
//                     onSuccess={responseFacebook}
//                     onFail={responseFacebook}
//                     onProfileSuccess={responseFacebook}
//                     icon="fa-facebook"
//                     style={{
//                         backgroundColor: '#4267b2',
//                         color: '#fff',
//                         fontSize: '16px',
//                         padding: '12px 24px',
//                         border: 'none',
//                         borderRadius: '4px',
//                         paddingBottom: '2px'
//                     }}
//                 />
//             )}
//
//             {login && (
//                 <div className="card">
//                     <div className="card-body">
//                         <img className="rounded" src={picture} alt="Profile" />
//                         <h5 className="card-title">{data.name}</h5>
//                         <p className="card-text">Email ID: {data.email}</p>
//                         <a href="#" className="btn btn-danger btn-sm" onClick={logout}>
//                             Logout
//                         </a>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default FacebookLoginComponent;