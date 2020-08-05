  
import React, { useCallback } from 'react'
import { GoogleLoginButton } from 'react-social-login-buttons'

import { useRouter } from 'next/dist/client/router'

const GoogleLogInButton = () => {
	const router = useRouter()

	const onClickGoogleLogIn = useCallback(
		() => {
			router.push('/google/')
		},
		[],
	)

	return(
		<div>
			<GoogleLoginButton onClick={onClickGoogleLogIn} align="center" size="40px"/>
		</div>
	)
}

export default GoogleLogInButton