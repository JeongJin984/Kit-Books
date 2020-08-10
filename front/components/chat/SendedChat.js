import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { Card } from 'react-bootstrap'

const ReceiveChatWrapper = styled(Card)`
	border: 0px;
`
const ReceivedChat = ({ message }) => {
	return(
		<ReceiveChatWrapper body>{message}</ReceiveChatWrapper>
	)
}

ReceivedChat.propTypes= {
	message: PropTypes.string
}

export default ReceivedChat
