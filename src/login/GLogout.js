import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = '773779419187-vq3ct5ff3tlhtv9q0gv67j5mvdnd6agp.apps.googleusercontent.com';
    // '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

function GLogout() {
    const onSuccess = () => {
        console.log('Logout made successfully');
        alert('Logout made successfully ✌');
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            ></GoogleLogout>
        </div>
    );
}

export default GLogout;