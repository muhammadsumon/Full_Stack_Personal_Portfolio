const logout = (req, res) => {
    res.clearCookie('biscuit')
    res.send('logged out')
}

module.exports = logout;