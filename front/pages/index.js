import React from 'react'

import AppLayout from '../components/AppLayout'

import { Card, CardGroup } from 'react-bootstrap'

const Home = () => {
	return(
		<AppLayout>
			<div style={{textAlign: "center", marginTop: "100px", zIndex: "-1", position: "relative"}}>
				<img src="/Logo.png"></img>
				<img src="/sky.jpg" style={{width: "100%", opacity: "50%", marginTop: "-425px"}}></img>
			</div>
			<div style={{margin:"60px", marginTop: "200px"}}>
				<h3>Recommended</h3>
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
			</div>
		</AppLayout>
	)
}

export default Home