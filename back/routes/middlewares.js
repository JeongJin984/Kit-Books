exports.isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()) {
		next()
	} else {
		res.status(401).send("need LogIn")
	}
}

exports.isNotLoggedIn = (req, res, next) => {
	if(!req.isAuthenticated()) {
		next()
	} else {
		res.status(401).send('Please Log-out')
	}
}