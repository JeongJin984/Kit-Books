const backURL = process.env.NODE_ENV === 'production' ? "https://api.webworks.kr" : "http://localhost:3090"
const frontURL = process.env.NODE_ENV === 'production' ? "https://webworks.kr" : "http://localhost:3000"
const callbackURL = process.env.NODE_ENV === 'production' ? "https://webworks.kr/google/callback" : "http://localhost:3000/google/callback"

module.exports = { backURL, callbackURL, frontURL}