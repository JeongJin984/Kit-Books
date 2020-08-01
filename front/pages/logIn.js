import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import { Form, Button, Col, Row, Container } from 'react-bootstrap'
import { LOGIN_REQUEST } from '../reducers/user'

import styled from '@emotion/styled'
import GoogleLogInButton from '../components/GoogleButton'

const StyledForm = styled(Form)`
	margin-top: 40%;
`
const StyledHr = styled.hr`
	border: 0; 
	height: 1px; 
	background-image: -webkit-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
	background-image: -moz-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
	background-image: -ms-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
	background-image: -o-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0); 
	color: black;
`

const LogInForm = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	
	const { isLoggedIn } = useSelector(state => state.user)

	const onClickLogInButton = useCallback(
		(e) => {
			e.preventDefault();
			dispatch({
				type: LOGIN_REQUEST,
				data: {
					email: e.target.formBasicEmail.value,
					password: e.target.formBasicPassword.value
				}
			})
		},
		[],
	)

	if(isLoggedIn) {
		router.push('/')
	}

	return(
		<Container>
			<Row>
				<Col></Col>
				<Col xs={6}>
					<StyledForm onSubmit={onClickLogInButton}>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="Enter email"/>
							<Form.Text className="text-muted">
								We will never share your email with anyone else.
							</Form.Text>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password"/>
						</Form.Group>
						<Form.Group controlId="formBasicCheckbox">
							<Form.Check type="checkbox" label="Check me out" />
						</Form.Group>					
						<Button variant="light" type="submit" block>Log-In</Button>
					</StyledForm>
					<br/>
					<StyledHr/>
					<br/>
					<GoogleLogInButton/>
				</Col>
				<Col></Col>
			</Row>
		</Container>

	)
}

export default LogInForm