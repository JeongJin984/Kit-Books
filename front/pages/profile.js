import React from 'react'
import styled from '@emotion/styled'
import AppLayout from '../components/AppLayout'

const SytledHr = styled.hr`
	border: 0; 
	height: 1px; 
	background-image: -webkit-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
	background-image: -moz-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
	background-image: -ms-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
	background-image: -o-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0); 
`

const profile = () => {
	return(
		<AppLayout>
			<SytledHr/>
		</AppLayout>
	)
}

export default profile