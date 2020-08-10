import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { Container, Row, Col,  } from 'react-bootstrap'

const StyledContainer = styled(Container)`
	width: 95%;
`

const ChatLayout = ({ children }) => {
	return(
		<StyledContainer fluid="true">
			<Row>
				<Col></Col>
				<Col xs={10}>
					<br/>
					{children}
				</Col>
				<Col></Col>
			</Row>
		</StyledContainer>
	)
}

ChatLayout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default ChatLayout