function validateEmail(email) {
	let re = new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$');
	return re.test(email);
}

module.exports = validateEmail;
