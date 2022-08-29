const logout = (req, res) => {
    res.clearCookie('biscuit', {
        domain: '.muhammadsumon.me',
        path: '/',
    })
    res.send('logged out')
}

module.exports = logout;