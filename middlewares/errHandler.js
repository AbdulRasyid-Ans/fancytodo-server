const errJoin = require('../helpers/errjoin');

module.exports = (err, req, res, nex) => {
    console.log(err);
    const errName = err.name
    const errErrors = err.errors

    let message = 'Internal Server Error'
    let status = 500

    // * Default Sequelize Error Message
    const uniqueErr = `SequelizeUniqueConstraintError`
    const validationErr = `SequelizeValidationError`

    // * Custom Error Message
    const loginErr = `Invalid email or password`

    //Custom Auth Error Message
    const authErr = 'You dont have access'

    //Not Found
    const notFound = "Data Not Found"

    switch(errName) {
        case uniqueErr:
            message = errJoin(errErrors)
            status = 400
            break
        case validationErr:
            message = errJoin(errErrors)
            status = 400
            break
        case loginErr:
            message = loginErr
            status = 401
            break
        case authErr:
            message = authErr
            status = 403
            break
        case notFound:
            message = notFound
            status = 404
            break
    }

    res.status(status).json({ msg: message })
}