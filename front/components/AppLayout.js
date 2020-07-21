import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'react-bootstrap'

const AppLayout = ({ children }) => {
	return(
		<Container fluid="true">
			<Row>
				<Col></Col>
				<Col xs={10}>{children}</Col>
				<Col></Col>
			</Row>
		</Container>
	)
}

AppLayout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default AppLayout