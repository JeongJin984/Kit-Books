import React from 'react'
import axios from 'axios'

import RecommendCard from '../components/RecommendCard'

import { Jumbotron, Button, Image } from 'react-bootstrap'
import IssueCard from '../components/IssueCard'
import styled from '@emotion/styled'
import AppLayout from '../components/AppLayout'
import { LOAD_MY_INFO_REQUEST } from '../reducers/user'

import wrapper from '../store/configureStore'
import { END } from 'redux-saga'

const LogoBackgroungImg = styled.img`
	width: 100%; 
	opacity: 50%; 
	margin-top: -500px;
	height: 600px;
`

const LogoImageWrapper = styled.div`
	text-align: center; 
	margin-top: 10px; 
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

const Home = () => {
	return(
		<AppLayout>
			<LogoImageWrapper>
				<Image src="/Logo7.png" width="500px"></Image>
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

export default Home