import React from 'react'

import AppLayout from '../components/AppLayout'
import RecommendCard from '../components/RecommendCard'

import {Jumbotron, Button } from 'react-bootstrap'
import IssueCard from '../components/IssueCard'
import styled from '@emotion/styled'

const LogoBackgroungImg = styled.img`
	width: 100%; 
	opacity: 50%; 
	margin-top: -340px;
`

const LogoImageWrapper = styled.div`
	text-align: center; 
	margin-top: 100px; 
	z-index: -1; 
	position: relative;
`

const ContentWrapper = styled.div`
	margin: 60px; 
	margin-top: 100px;
`

const StyledJumbotron = styled(Jumbotron)`
	text-align: center; 
	margin-bottom: 0px; 
	height: 290px;
	padding: 30px;
`

const RecentStockWrapper = styled

const Home = () => {
	return(
		<AppLayout>
			<LogoImageWrapper>
				<img src="/Logo.png"></img>
				<LogoBackgroungImg src="/sky.jpg"></LogoBackgroungImg>
			</LogoImageWrapper>
			<ContentWrapper>
				<h3>Issues</h3>
				<IssueCard/>
			</ContentWrapper>
			<ContentWrapper>
				<h3>Recently</h3>
				<RecommendCard/>
			</ContentWrapper>
			<StyledJumbotron>
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
			</StyledJumbotron>
		</AppLayout>
	)
}

export default Home