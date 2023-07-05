const cookieToken = (user, res) => {
    const token = user.createJwtToken();

    res.cookie('token', token);

    // sending response
    res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
    })
};

module.exports = cookieToken