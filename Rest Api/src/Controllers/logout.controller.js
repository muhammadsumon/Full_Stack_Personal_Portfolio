const logout = (req, res) => {
    res.clearCookie('biscuit')
    res.send('logged out')
}

export default logout;