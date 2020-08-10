import React from 'react'
import Head from 'next/head'

import PropTypes from 'prop-types'

import 'bootstrap/dist/css/bootstrap.min.css'

import wrapper from '../store/configureStore'

const App = ({ Component }) => {

	return(
		<div>
			<Head>
				<meta charSet="utf-8" />
				<title>KitBooks</title>
			</Head>    
			<Component/>
		</div>
	)
}

App.propTypes = {
	Component: PropTypes.elementType.isRequired
}

export default wrapper.withRedux(App)