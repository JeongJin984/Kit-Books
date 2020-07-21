import React from 'react'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import PropTypes from 'prop-types'

import 'bootstrap/dist/css/bootstrap.min.css'

import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap'
import wrapper from '../store/configureStore'
import withReduxSaga from 'next-redux-saga'
import { useSelector } from 'react-redux'

import styled from '@emotion/styled'

const SignButtonWrapper = styled.div`
	margin-top: 18px;
`

const StyledContainer = styled(Container)`
	width: 95%;
	fluid: ${props => props.fluid ? 'true' : 'false'};
`

const App = ({ Component }) => {
	const router = useRouter()

	const { isLoggedIn } = useSelector(state => state.user)
	return(
		<div>
			<Head>
				<title>KitBooks</title>
				<meta charSet="utf-8"></meta>
			</Head>
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
									<Nav.Link href="/">Home</Nav.Link>
									<Nav.Link href="/profile">Profile</Nav.Link>
									<Nav.Link href="/bookStore">Store</Nav.Link>
									<NavDropdown title="Books" id="basic-nav-dropdown">
										<NavDropdown.Item href="/basket">Basket</NavDropdown.Item>
										<NavDropdown.Item href="/shoppingList">Shopping List</NavDropdown.Item>
										<NavDropdown.Divider />
										<NavDropdown.Item href="/">Recommended</NavDropdown.Item>
									</NavDropdown>
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
							<div></div> :
							<SignButtonWrapper>
								<Link href="/logIn">
									<Button variant="outline-info">
										Sign-Up</Button>
									</Link>
									<span> </span>
									<Link href="/logIn">
										<Button variant="outline-info">Sign-In</Button>
									</Link>
							</SignButtonWrapper>
						}
					</Col>
				</Row>
			</StyledContainer>
			<Component/>
		</div>
	)
}

App.propTypes = {
	Component: PropTypes.elementType.isRequired
}

export default wrapper.withRedux(withReduxSaga(App))