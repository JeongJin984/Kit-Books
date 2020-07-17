import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import { Form, Button, Col, Row, Container } from 'react-bootstrap'
import { LOGIN_REQUEST } from '../reducers/user'


const LogInForm = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	
	const { isLoggedIn } = useSelector(state => state.user)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const onChangeEmail = useCallback(
		(e) => {
			setEmail(e.target.value)
		},
		[],
	)
	const onChangePassword = useCallback(
		(e) => {
			setPassword(e.target.value)
		},
		[],
	)

	const onClickLogInButton = useCallback(
		(e) => {
			e.preventDefault();
			console.log(e)
			dispatch({
				type: LOGIN_REQUEST,
				data: {
					email: email,
					password: password
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
					<Form style={{marginTop: "40%"}} onSubmit={onClickLogInButton}>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="Enter email" value={email} onChange={onChangeEmail}/>
							<Form.Text className="text-muted">
								We will never share your email with anyone else.
							</Form.Text>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" value={password} onChange={onChangePassword}/>
						</Form.Group>
						<Form.Group controlId="formBasicCheckbox">
							<Form.Check type="checkbox" label="Check me out" />
						</Form.Group>
						<Button variant="light" type="submit">Sign-Up</Button>
					</Form>
				</Col>
				<Col></Col>
			</Row>
		</Container>

	)
}

export default LogInForm