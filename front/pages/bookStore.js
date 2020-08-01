import React, { useCallback } from 'react'
import axios from 'axios'

import { Card } from 'react-bootstrap'
import StoreLayout from '../components/StoreLayout'

import styled from '@emotion/styled'
import AppLayout from '../components/AppLayout'
import { LOAD_MY_INFO_REQUEST } from '../reducers/user'

import wrapper from '../store/configureStore'
import { END } from 'redux-saga'

const CardsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	flex-wrap: wrap;
	
`
const StyledCard = styled(Card)`
	width: 13.5rem;
	height: 23rem;
	margin: 8px;
	cursor: pointer;
`
const StyledCardBody = styled(Card.Body)`
	margin-top: -15px;
	text-align: center;
`

const bookStore = () => {
	const onClickCard = useCallback(
		(e) => {
			console.log(e.target.id)
		},
		[]
	)

	return(
		<AppLayout>
			<StoreLayout>
				<CardsWrapper>
					<StyledCard onClick={onClickCard} id={`${"OS"}`}>
							<Card.Img variant="top" src="mybook.jpg" height="280px" id={`${"OS"}`}/>
							<StyledCardBody id={`${"OS"}`}>
								<Card.Title id={`${"OS"}`}>OS</Card.Title>
								<Card.Text id={`${"OS"}`}>
									재고:3
								</Card.Text>
							</StyledCardBody>
					</StyledCard>
				</CardsWrapper>
			</StoreLayout>
		</AppLayout>
	)
}

export const getServerSideProps = wrapper.getServerSideProps( async (context) => {
	const cookie = context.req ? context.req.headers.cookie : ''
	axios.defaults.headers.Cookie = ''

	if(context.req && cookie) {
		axios.defaults.headers.Cookie = cookie
	}
	
	context.store.dispatch({
		type: LOAD_MY_INFO_REQUEST
	})
	context.store.dispatch(END)
	await context.store.sagaTask.toPromise()

})


export default bookStore