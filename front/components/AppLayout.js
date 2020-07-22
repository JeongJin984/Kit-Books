import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'react-bootstrap'

const AppLayout = ({ children }) => {
	return(
		<Container fluid="true" style={{marginTop: "6%"}}>
			<Row>
				<Col></Col>
				<Col xs={6}>{children}</Col>
				<Col></Col>
			</Row>
		</Container>
	)
}

AppLayout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default AppLayout