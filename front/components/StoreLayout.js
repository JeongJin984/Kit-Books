import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col, Nav } from 'react-bootstrap'

const StoreLayout = ({ children }) => {
	return(

		<Container fluid="true" style={{marginTop: "3%"}}>
			<Row>
				<Col></Col>
				<Col xs={10}>
					<Nav
						onSelect={(selectedKey) => console.log(selectedKey)}
						fill
						variant="tabs"
					>
						<Nav.Item>
							<Nav.Link eventKey="1">컴퓨터공학과</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="2">전자공학과</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="3">건축공학과</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="4">토목공학과</Nav.Link>
						</Nav.Item>
					</Nav>
					<br/>
					{children}
				</Col>
				<Col></Col>
			</Row>
		</Container>
	)
}

StoreLayout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default StoreLayout