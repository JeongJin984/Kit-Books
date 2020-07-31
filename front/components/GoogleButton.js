  
import React, { useCallback } from 'react'
import { GoogleLoginButton } from 'react-social-login-buttons'

import { useDispatch } from 'react-redux'

import { GOOGLE_LOGIN_REQUEST } from '../reducers/user'

const GoogleLogInButton = () => {
	const dispatch = useDispatch()

	const onClickGoogleLogIn = useCallback(
		() => {
			dispatch({
				type: GOOGLE_LOGIN_REQUEST
			})
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