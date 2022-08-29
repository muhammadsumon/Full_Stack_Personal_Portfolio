const logout = (req, res) => {
    res.clearCookie('biscuit', {
        domain: ".muhammadsumon.me"
    })
    res.send('logged out')
}

module.exports = logout;