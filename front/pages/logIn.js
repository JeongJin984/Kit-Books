import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import { Form, Button, Col, Row, Container } from 'react-bootstrap'
import { LOGIN_REQUEST } from '../reducers/user'

import styled from '@emotion/styled'

const StyledForm = styled(Form)`
	margin-top: 40%;
`

const LogInForm = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	
	const { isLoggedIn } = useSelector(state => state.user)

	const onClickLogInButton = useCallback(
		(e) => {
			e.preventDefault();
			console.log(e.target.formBasicEmail.value,e.target.formBasicPassword.value)
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
						<Button variant="light" type="submit">Sign-Up</Button>
					</StyledForm>
				</Col>
				<Col></Col>
			</Row>
		</Container>

	)
}

export default LogInForm