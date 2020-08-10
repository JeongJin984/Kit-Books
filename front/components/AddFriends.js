import React, { useState, useCallback } from 'react'

import { Container, Form, Col, Badge, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_FOLLOWING_REQUEST } from '../reducers/user'

const AddFriends = () => {
	const [invited, setInvited] = useState([])
	const { id } = useSelector(state => state.user.me)
	const dispatch = useDispatch()

	const onClickBadge = useCallback(
		(e) => {
			var array = [...invited]
			var index = array.indexOf(e.target.id)
			if(index !== -1) {
				array.splice(index, 1)
				setInvited(array)
			} 
		},
		[invited],
	) 

	const onClickAddFriend = useCallback(
		(e) => {
			e.preventDefault()
			var array = [...invited]
			array.push(e.target.name.value)
			setInvited(array)
		},
		[invited],
	)

	const onClickConfirm = useCallback(
		() => {
			dispatch({
				type: ADD_FOLLOWING_REQUEST,
				data: {
					id: id,
					list:invited
				}
			})
		},
		[invited],
	)

	return(
		<div>
			<div>
				{invited.map((v, i) => <Badge id={v} key={i} pill variant="light" onClick={onClickBadge}>{v}</Badge>)}
			</div>
			<br/>
			<Container>
				<Form onSubmit={onClickAddFriend}>
					<Form.Row className="align-items-center">
						<Col xl={1}></Col>
						<Col xl={8}>
							<Form.Control
								className="mb-2"
								id="name"
								placeholder="Input Message"
							/>
						</Col>
						<Col xl={3}>
							<Button type="submit" className="mb-2" variant="light">
								Send
							</Button>
						</Col>
					</Form.Row>
				</Form>
			</Container>
			<br/>
			<div style={{textAlign: "center"}}><Button variant="outline-success" onClick={onClickConfirm}>Confirm</Button></div>
		</div>
		
	)
}

export default AddFriends