import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Col, Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, Row, Image, Modal} from 'react-bootstrap'

import styled from '@emotion/styled'

import { useSelector, useDispatch } from 'react-redux'
import { LOGOUT_REQUEST } from '../reducers/user'
import AddFriends from './AddFriends'

const SignButtonWrapper = styled.div`
	margin-top: 18px;
`

const SimpleProfileWrapper = styled.div`
	margin-top: 5px;
	margin-right: -60px;
	float: right;
`

const StyledContainer = styled(Container)`
	width: 95%;
`
const AppLayout = ({ children }) => {
	const router = useRouter()
	const dispatch = useDispatch()

	const { isLoggedIn, me } = useSelector(state => state.user)
	console.log(isLoggedIn)

	const onClickLogOut = useCallback(
		async () => {
			await router.push("/")
			dispatch({
				type: LOGOUT_REQUEST
			})
		},
		[],
	)

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return(
		<div>
			<StyledContainer fluid="true">
				<Row>
					<Col lg={2}></Col>
					<Col xs={10} lg={7}>
						<Navbar bg="#f1f2f6" expand="lg">
							<Navbar.Brand href="/">
								{router.pathname === '/' ? 
									<img
										src="/book.png"
										width="50"
										height="50"
										className="d-inline-block align-top"
										alt="the book"	
									/> : 
									<img
										src="/whiteBook.png"
										width="50"
										height="50"
										className="d-inline-block align-top"
										alt="the book"
									/>}
								
							</Navbar.Brand>
							<Navbar.Toggle aria-controls="basic-navbar-nav"/>
							<Navbar.Collapse id="basic-navbar-nav">
								<Nav className="mr-auto">
									<Link href="/"><Nav.Link href="/">Home</Nav.Link></Link>
									<Link href="/bookStore"><Nav.Link href="/chat">Store</Nav.Link></Link>
									<Link href="/chat"><Nav.Link href="/chat">Chat</Nav.Link></Link>
								</Nav>
								<Form inline>
									<FormControl type="text" placeholder="Search" className="mr-sm-2" />
									<Button variant="outline-success">Search</Button>
								</Form>
							</Navbar.Collapse>
						</Navbar>
					</Col>
					<Col>
						{isLoggedIn ?
							<SimpleProfileWrapper>
								<Navbar collapseOnSelect expand="lg" bg="#f1f2f6" variant="#f1f2f6">
									<Navbar.Brand style={{marginRight: "0px"}}><Image src="/gitProfileImage.png" width="30" height="30" roundedCircle ></Image></Navbar.Brand>
									<Navbar.Collapse id="responsive-navbar-nav">
										<Nav className="mr-auto">
											<NavDropdown title="" id="collasible-nav-dropdown" alignRight={true}>
												<a style={{marginLeft: "20px"}}>Signed In as</a>
												<h5 style={{marginLeft: "20px"}}>{`${me.name}`}</h5>
												<NavDropdown.Divider />
												<Link href="/profile"><NavDropdown.Item href="/profile">Profile</NavDropdown.Item></Link>
												<Link href="/shoppingList"><NavDropdown.Item href="/shoppingList">Shopping-Basket</NavDropdown.Item></Link>
												<NavDropdown.Item onClick={handleShow}>Add-Friend</NavDropdown.Item>
												<Modal show={show} onHide={handleClose}>
													<Modal.Header closeButton>
														<Modal.Title>Add Friend</Modal.Title>
													</Modal.Header>
													<Modal.Body>
														<AddFriends/>
													</Modal.Body>
												</Modal>
												<NavDropdown.Divider />
												<Link href="/"><NavDropdown.Item href="/" onClick={onClickLogOut}>Log-Out</NavDropdown.Item></Link>
											</NavDropdown>
										</Nav>
									</Navbar.Collapse>
								</Navbar>
							</SimpleProfileWrapper> :
							<SignButtonWrapper>
								<Link href="/logIn">
									<Button variant="outline-info">
										Sign-Up</Button>
									</Link>
									<span> </span>
									<Link href="/signIn">
										<Button variant="outline-info">Sign-In</Button>
									</Link>
							</SignButtonWrapper>
						}
					</Col>
				</Row>
			</StyledContainer>
			<div>
				{children}
			</div>
		</div>
		

	)
}

AppLayout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default AppLayout