import React from 'react'

import { Card, CardGroup } from 'react-bootstrap'

const RecommendCard = () => {
	return(
		<div>
			<CardGroup>
				<Card>
					<Card.Img variant="top" src="/mybook.jpg" height="350px"/>
					<Card.Body>
						<Card.Title>Jiny</Card.Title>
					</Card.Body>
					<Card.Footer>
						<small className="text-muted">Last updated 3 mins ago</small>
					</Card.Footer>
				</Card>
				<Card>
					<Card.Img variant="top" src="/mybook.jpg" height="350px"/>
					<Card.Body>
						<Card.Title>Jiny</Card.Title>
					</Card.Body>
					<Card.Footer>
						<small className="text-muted">Last updated 3 mins ago</small>
					</Card.Footer>
				</Card>
				<Card>
					<Card.Img variant="top" src="/mybook.jpg" height="350px"/>
					<Card.Body>
						<Card.Title>Jiny</Card.Title>
					</Card.Body>
					<Card.Footer>
						<small className="text-muted">Last updated 3 mins ago</small>
					</Card.Footer>
				</Card>
				<Card>
					<Card.Img variant="top" src="/mybook.jpg" height="350px"/>
					<Card.Body>
						<Card.Title>Jiny</Card.Title>
					</Card.Body>
					<Card.Footer>
						<small className="text-muted">Last updated 3 mins ago</small>
					</Card.Footer>
				</Card>
			</CardGroup>
		</div>
	)	
}

export default RecommendCard