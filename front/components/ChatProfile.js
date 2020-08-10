import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap'

const StyledDiv1 = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	&:hover {
		background-color: #F8F9FA;
	}
	&:focus {
		background-color: #E9ECEF;
	}	
	&:active {
		background-color: #E9ECEF;
	}
	
	padding: 20px;
	margin: -12px;
`
const StyledDiv2 = styled.div`
	display: flex;
	align-items: center;
`

const StyledDiv3 = styled.div`
	display: block;
	margin-bottom: 5px;
`
const StyledSpan1 = styled.span`
	display: block;
`

const ChatProfile = ({ participants, id }) => {
	var RoomList = ''
	participants.forEach(v => {
		RoomList = RoomList + v.name + ", "
	});
	const List = RoomList.substr(0,RoomList.length-2)
	return(
		<OverlayTrigger id={id}
			key={'bottom'}
			placement={'bottom'}
			overlay = {
				<Tooltip id={`tooltip'bottom`}>
					{List}
				</Tooltip>
			}
			>
			<StyledDiv1 id={id}>
					<StyledDiv2 id={id}>
						<Image id={id} src="/book.png" roundedCircle width="60px" style={{ marginRight:"10px" }} />
						<StyledDiv3 id={id}>
								<StyledSpan1 id={id}>{List}</StyledSpan1>
								<span id={id} style={{ fontSize: "14px", opacity: "0.6"}}>Bye Bye</span>
						</StyledDiv3>
					</StyledDiv2>
					<StyledDiv2 id={id}>
						<span id={id} className="chat__timestamp">March 8</span>
					</StyledDiv2>
			</StyledDiv1>
		</OverlayTrigger>
	)
}

ChatProfile.propTypes = {
	participants: PropTypes.array,
	id: PropTypes.number
}

export default ChatProfile