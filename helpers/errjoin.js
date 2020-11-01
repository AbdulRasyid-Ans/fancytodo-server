const errJoin = errors => {
    let errMsg = []
    errors.forEach( errorMessage => {
        errMsg.push(errorMessage.message)
    })
    return errMsg.join(', ')
}

module.exports = errJoin