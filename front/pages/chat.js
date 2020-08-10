import React, { useCallback, useState, useEffect } from 'react'
import AppLayout from '../components/AppLayout'
import ChatLayout from '../components/ChatLayout'
import styled from '@emotion/styled'
import axios from 'axios'
import io from 'socket.io-client'

import { Row, Col, ListGroup, Navbar, Image, Form, Button, Container, Modal } from 'react-bootstrap'
import ChatProfile from '../components/ChatProfile'
import { useSelector, useDispatch } from 'react-redux'

import ReceivedChat from '../components/chat/ReceivedChat'
import SendedChat from '../components/chat/SendedChat'
import wrapper from '../store/configureStore'
import { END } from 'redux-saga'
import { LOAD_MY_GOOGLE_INFO_REQUERST, LOAD_MY_INFO_REQUEST } from '../reducers/user'
import { LOAD_CHATS_REQUEST, POST_CHATS_REQUEST, USER_ENTER } from '../reducers/chat'
import CreateRoom from '../components/CreateRoom'
import { backURL } from '../config/config'

const StyledListItem = styled(ListGroup.Item)`
	border: 0px;
	&:focus {
		outline-width: 0px;
	}
`
const TitleList = styled(ListGroup.Item)`
	text-align: center;
	padding: 15px;
	border: 0px;
	border-bottom: 1px solid #DFDFDF;
	padding-top: 22px;
`

const ChattingList = styled(Col)`
	border: 1px solid gray;
	border-right: 0px;
	padding:0px;
	height: 800px;
	postition: relative;
	overflow: auto;
`

const ChattingBox = styled(Col)`
	position: relative;
	border: 1px solid gray;
	padding: 0px;
	height: 800px;
	overflow: auto;
`

const ChatTitleBox = styled(ListGroup.Item)`
	border: 0px;
	border-bottom: 1px solid #DFDFDF;
`

let socket

const Chat = () => {
	const { myRoom, curRoomId } = useSelector(state => state.chat)
	const { ChatRooms, name } = useSelector(state => state.user.me)

	const [show, setShow] = useState(false);

	useEffect(() => {
		socket = io(backURL)
		socket.on('message', ({ sender, message}) => {
			console.log('socket On!!!')
			dispatch({
				type:USER_ENTER,
				data: {
					sender: sender,
					message: message
				}
			})
		})
		return () => {
			socket.emit('disconnect')
			socket.off()
		}
	}, [backURL])

	const handleClose = async () => {
		await setShow(false);
	}
	const handleShow = () => setShow(true);

	const dispatch = useDispatch()
	var chatData = {};

	const onSubmitChat = useCallback(
		(e) => {
			e.preventDefault();
			if(e.target.message.value) {
				chatData = {
					sender: name,
					receiver: 'a',
					message: e.target.message.value,
					chatRoomId: curRoomId
				}
				dispatch({
					type: POST_CHATS_REQUEST,
					data: chatData
				})
	
				socket.emit('sendMessage', { name: name, room: curRoomId, text: e.target.message.value }, ()=> {})
			}
		},
		[curRoomId, chatData],
	)

	const onClickChatRoom = useCallback(
		async (e) => {
			const id = e.target.id
			await dispatch({
				type: LOAD_CHATS_REQUEST,
				data: id
			})
			
			socket.emit('join', {name: name, room: id}, ()=>{

			})
		},
		[name],
	)

	return(
		<AppLayout>
			<ChatLayout>
			<Row>
				<ChattingList xs={4}>
					<ListGroup defaultActiveKey="#link1" style={{ margin: "0px", marginBottom: "60px"}}>
						<TitleList as="li" disabled>
							<h6>Direct</h6>
						</TitleList>
						{ChatRooms.map((v) => {
							return(
								<StyledListItem action key={v.id} onClick={onClickChatRoom} id={v.id}>
									<ChatProfile participants={v.Participants} id={v.id}/>
								</StyledListItem>
							)
						})}
					</ListGroup>
					<div style={{position: "absolute", bottom: `${ChatRooms.length > 7 ? -90*(ChatRooms.length - 7) : 0}`+`px`, width: "100%", padding: "10px"}}>
						<Button variant="outline-primary" size="lg" block onClick={handleShow}>
							New Room
						</Button>
						<Modal show={show} onHide={handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>Creating ChattingRoom</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<CreateRoom handleClose={handleClose}/>
							</Modal.Body>
						</Modal>
					</div>
				</ChattingList>
				<ChattingBox xs={8}>
					<ListGroup defaultActiveKey="#link1" style={{ margin: "0px"}}>
						{curRoomId < 0 ? 
							<ChatTitleBox as="li" disabled >
								<Navbar style={{padding: "0px", marginLeft: "10px"}}>
									<Navbar.Brand>
										{'Hi ' + name}
									</Navbar.Brand>
								</Navbar>
							</ChatTitleBox> :
							<ChatTitleBox as="li" disabled >
								<Navbar style={{padding: "0px", marginLeft: "10px"}}>
									<Navbar.Brand>
										<Image
											alt=""
											src="/book.png"
											width="30"
											height="30"
											className="d-inline-block align-top"
											roundedCircle 
										/>{' '}
										{name}
									</Navbar.Brand>
								</Navbar>
							</ChatTitleBox>
						}
						{myRoom.map((v, i) => {
							return (
								v.sender === name?
								<SendedChat key={i} message={v.message}/> :
								<ReceivedChat key={i} message={v.message}/>
							)
						})}
					</ListGroup>
					{curRoomId > 0 && 
						<Container style={{position: "absolute", bottom: "10px"}}>
							<Form onSubmit={onSubmitChat}>
								<Form.Row className="align-items-center">
									<Col xl={1}></Col>
									<Col xl={8}>
										<Form.Control
											className="mb-2"
											id="message"
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
					}
				</ChattingBox>
			</Row>
			</ChatLayout>
		</AppLayout>
	)
}

export const getServerSideProps = wrapper.getServerSideProps( async (context) => {
	const cookie = context.req ? context.req.headers.cookie : ''
	axios.defaults.headers.Cookie = ''

	if(context.req && cookie) {
		axios.defaults.headers.Cookie = cookie
	}

	context.store.dispatch({
		type: LOAD_MY_INFO_REQUEST
	})

	context.store.dispatch({
		type:	LOAD_MY_GOOGLE_INFO_REQUERST
	})

	context.store.dispatch(END)
	await context.store.sagaTask.toPromise()
})

export default Chat