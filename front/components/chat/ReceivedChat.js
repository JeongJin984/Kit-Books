import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import { Card } from 'react-bootstrap'

const SendChatWraper = styled(Card)`
	border: 0px;
	text-align: right;
`
const SendedChat = ({ message }) => {
	return(
			<SendChatWraper body>{message}</SendChatWraper>
	)
}

SendedChat.propTypes = {
	message: PropTypes.string
}

export default SendedChat
