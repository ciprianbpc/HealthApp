
const { currentUser } = require('./currentUser');
const { registerUser } = require('./registerUser');
const { loginUser } = require('./loginUser');
const { logoutUser } = require('./logoutUser');
const { restorePassword } = require('./restorePassword');
const { updateAvatar } = require('./updateAvatar');
const { checkingRegistered } = require('./checkingRegistered');
const { userSettings } = require('./userSettings');

module.exports = {
    currentUser,
    registerUser,
    loginUser,
    logoutUser,
    restorePassword,
    updateAvatar,
    checkingRegistered,
    userSettings,
};
