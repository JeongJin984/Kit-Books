import React, { useCallback } from 'react'

import AppLayout from '../components/AppLayout'

import { Form, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { SIGN_IN_REQUEST } from '../reducers/user'
import { useRouter } from 'next/router'

export const Colleges = [ '', '컴퓨터공학과', '전자공학과', '산업공학과' ]

const SignIn = () => {
	const dispatch = useDispatch()
	const { isLoggedIn } = useSelector(state => state.user)
	const router = useRouter()

	let collegeNum = 0;

	const onSubmitSignInFrom = useCallback(
		(e) => {
			e.preventDefault()

			collegeNum = Colleges.findIndex( (v) => v === e.target.userClass.value ) 

			dispatch({
				type: SIGN_IN_REQUEST,
				data: {
					email: e.target.userEmail.value,
					nickname: e.target.userNickName.value,
					password: e.target.userPassword.value,
					jender: e.target.userJender.value,
					phoneNum: e.target.userNumber.value,
					college: collegeNum,
					grade: e.target.userGrade.value,
					birth: e.target.userBirthYear.value + '-' + e.target.userBirthMonth.value + '-' + e.target.userBirthDay.value
				}
			})
		},
		[]
	)

	if(isLoggedIn) {
		router.push('/')
	}

	return(
		<AppLayout>
			<Form onSubmit={onSubmitSignInFrom}>				
				<Form.Row>
					<Form.Group as={Col} controlId="userEmail">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
					</Form.Group>
					<Form.Group as={Col} controlId="userNickName">
						<Form.Label>UserName</Form.Label>
						<Form.Control type="text" placeholder="Enter UserName" />
					</Form.Group>
				</Form.Row>

				<Form.Row>
					<Form.Group as={Col} controlId="userPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Password-check</Form.Label>
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>
				</Form.Row>

				<Form.Group controlId="userJender">
					<Form.Label>Jender</Form.Label>
					<Form.Control as="select" defaultValue="Choose...">
						<option>Man</option>
						<option>Woman</option>
					</Form.Control>
				</Form.Group>

				<Form.Row>
					<Form.Group as={Col} controlId="userNumber">
						<Form.Label>학번</Form.Label>
						<Form.Control />
					</Form.Group>

					<Form.Group as={Col} controlId="userClass">
						<Form.Label>학과</Form.Label>
						<Form.Control as="select" defaultValue="컴퓨터공학과">
							<option>컴퓨터공학과</option>
							<option>전자공학과</option>
							<option>산업공학과</option>
						</Form.Control>
					</Form.Group>

					<Form.Group as={Col} controlId="userGrade">
						<Form.Label>학년</Form.Label>
						<Form.Control as="select" defaultValue="1">
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
						</Form.Control>
					</Form.Group>
				</Form.Row>

				<Form.Row>
					<Form.Group as={Col} controlId="userBirthYear">
						<Form.Label>생년</Form.Label>
						<Form.Control />
					</Form.Group>

					<Form.Group as={Col} controlId="userBirthMonth">
						<Form.Label>월</Form.Label>
						<Form.Control as="select" defaultValue="Choose...">
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
							<option>6</option>
							<option>7</option>
							<option>8</option>
							<option>9</option>
							<option>10</option>
							<option>11</option>
							<option>12</option>
						</Form.Control>
					</Form.Group>

					<Form.Group as={Col} controlId="userBirthDay">
						<Form.Label>일</Form.Label>
						<Form.Control />
					</Form.Group>
				</Form.Row>

				<Form.Group id="formGridCheckbox">
					<Form.Check type="checkbox" label="Check me out" />
				</Form.Group>

				<Button variant="outline-success" size="lg" block type="submit">
					Submit
				</Button>
				<Button variant="outline-secondary" size="lg" block>
					Cancel
				</Button>
			</Form>
		</AppLayout>
	)
}

export default SignIn