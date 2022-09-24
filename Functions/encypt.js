const bcrypt = require("bcrypt")

hashes = (password) => {
    const hashed = bcrypt.hash(password, 10, (err, hash) => {
        const hashed = hash
            //console.log(hash)

    })
    return hashed





}


console.log(hashes('kamau'))