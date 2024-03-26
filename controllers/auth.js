const renderRegister = (req, res) => {
    res.render('register');
}

const handleRegister = (req, res) => {
}

const renderLogin = (_req, res) => {
        res.render('login');
    }

const handleLogin = (req, res) => {
}

    module.exports = {
        renderRegister,
        handleRegister,
        renderLogin,
        handleLogin,

    }
