const renderRoot = (req, res, next) => {
    const { role = 'unsigned' } = req._auth || {};
    console.log (`Vsiting with [${role}] role`);
    return res.render('index', { role });
}

const renderUserPosts = (req, res) => {
    const { role = 'unsigned' } = req._auth || {};
    console.log (`Vsiting with [${role}] role`);
    res.render('user_posts', { role });
}

const renderAdmin = (req, res) => {
    const { role = 'unsigned' } = req._auth || {};
    console.log (`Vsiting with [${role}] role`);
    res.render('admin', { role });
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