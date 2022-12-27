import React from 'react';

import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from './refreshToken'

const clientId = '773779419187-vq3ct5ff3tlhtv9q0gv67j5mvdnd6agp.apps.googleusercontent.com'
    // '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

function GLogin() {
    const onSuccess = (res) => {
        console.log('GLogin Success: currentUser:', res.profileObj);
        alert(
            `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
        );
        refreshTokenSetup(res);
    };

    const onFailure = (res) => {
        console.log('GLogin failed: res:', res);
        alert(
            `Failed to login. 😢 Please retry later.`
        );
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="GLogin"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={true}
            />
        </div>
    );
}

export default GLogin;