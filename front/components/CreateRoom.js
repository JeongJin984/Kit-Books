import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Badge, Button } from 'react-bootstrap'
import { CREATE_CHATROOM_REQUEST } from '../reducers/user'
import { useRouter } from 'next/router'

const CreateRoom = () => {
	const dispatch = useDispatch()
	const router = useRouter()

	const [invited, setInvited] = useState([])
	const { Followers, id } =  useSelector(state => state.user.me)

	const onClickBadge = useCallback(
		(e) => {
			var array = [...invited]
			var index = invited.findIndex(obj => obj.id === e.target.id)
			if(index !== -1) {
				array.splice(index, 1)
				setInvited(array)
			} 
		},
		[invited],
	) 

	const onClickInvite = useCallback(
		(e) => {
			var array2 = [...invited]
			array2.push({
				id: e.target.id,
				name: e.target.name
			})
			setInvited(array2)
		},
		[invited],
	)
	
	const onClickConfirm = useCallback(
		async () => {
			var invitedId = []
			invited.map(v => invitedId.push(v.id))
			console.log(invitedId)
			await dispatch({
				type: CREATE_CHATROOM_REQUEST,
				data: {
					id: id,
					list: invitedId
				}
			})
			router.push('/chat')
		},
		[invited],
	)

	return(
		<div>
			<div>
				{invited.map((v, i) => <Badge id={v.id} name={v.name} key={i} pill variant="light" onClick={onClickBadge}>{v.name}</Badge>)}
			</div>
			<br/>
			<span>
				{Followers.map((v, i) => <Button id={v.id} name={v.name} key={i} variant="light" onClick={onClickInvite}>{v.name}</Button>)}
			</span>
			<div style={{textAlign: "center"}}><Button variant="outline-success" onClick={onClickConfirm}>Confirm</Button></div>
		</div>
	)
}

export default CreateRoom