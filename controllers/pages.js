const STATUS = require("../constants/statusCodes");

const renderRoot = (req, res, next) => {
    const { role = 'unsigned', userId="" } = req._auth || {};
    console.log (`Vsiting with [${role}] role`);
    return res.render('index', { role, userId });
}

const renderUserPosts = (req, res) => {
    const { role = 'unsigned', userId="" } = req._auth || {};
    const { userId: id } = req.params;

    if (userId !== id) {
        console.log (`Vsiting with [${role}] role`);
        return res.send(STATUS.Forbidden).redirect('/');
    }

    console.log (`Vsiting with [${role}] role`);
    res.render('user_posts', { role, userId });
}

const renderAdmin = (req, res) => {
    const { role = 'unsigned' } = req._auth || {};
    console.log (`Vsiting with [${role}] role`);
    res.render('admin', { role, userId });
}

const renderError = (req, res )=> {
    res.render('error');
}

module.exports = {
    renderRoot,
    renderUserPosts,
    renderAdmin,
    renderError
}