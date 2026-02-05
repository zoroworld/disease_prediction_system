import base from "./base"

// GET users 
export const getUsers = () => {
    return base.get("/users/")
}

// POST users 
export const createUsers = (data) => {
    return base.post("/users/", {
        message: message,
    })
}


// GET users 
export const getUser = () => {
    return base.get("/users/")
}

// POST users 
export const createUser = (data) => {
    return base.post("/users/", {
        message: message,
    })
}

