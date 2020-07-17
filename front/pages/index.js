import React from 'react'

import AppLayout from '../components/AppLayout'
import RecommendCard from '../components/RecommendCard'

import {Jumbotron, Button } from 'react-bootstrap'
import IssueCard from '../components/IssueCard'

const Home = () => {
	return(
		<AppLayout>
			<div style={{textAlign: "center", marginTop: "100px", zIndex: "-1", position: "relative"}}>
				<img src="/Logo.png"></img>
				<img src="/sky.jpg" style={{width: "100%", opacity: "50%", marginTop: "-340px"}}></img>
			</div>
			<div style={{margin:"60px", marginTop: "100px"}}>
				<h3>Issues</h3>
				<IssueCard/>
			</div>
			<div style={{margin:"60px", marginTop: "100px"}}>
				<h3>Recently</h3>
				<RecommendCard/>
			</div>
			<Jumbotron style={{textAlign:"center", marginBottom: "0px", height: "290px", padding: "30px"}}>
				<h1>Hello, User!</h1>
				<p>
					This is a simple book store, you can buy some of your books cheaper!!
				</p>
				<p>
					Developer: Jiny(github: JeongJin984)
				</p>
				<p>
					Ha Ha Ha
				</p>
				<p>
					<Button variant="primary">Git-Hub</Button>
				</p>
			</Jumbotron>
		</AppLayout>
	)
}

export default Home