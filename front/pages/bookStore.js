import React, { useCallback } from 'react'

import { Card, CardDeck } from 'react-bootstrap'
import StoreLayout from '../components/StoreLayout'
import FiveBooks from '../components/FiveBooks'

import styled from '@emotion/styled'

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
	)
}

export default bookStore