import base, { setAccessToken } from "./base"

// GET users 
export const getUsers = () => {
    return base.get("/users/")
}

export const getUserById = async (id) => {
    const res = await base.get(`/user/${id}/`);
    return res.data;
};


export async function signup({ username, email, password }) {

    try {
        // Call backend signup API
        const res = await base.post("/signup/", { username, email, password });

        // Registration success
        const user = res.data.data; // { username, email }

        // Optional: auto-login after signup
        const loginRes = await base.post("/login/", { username, password });
        setAccessToken(loginRes.data.access); // save access token in memory
        localStorage.setItem("refresh", loginRes.data.refresh); // save refresh token

        return { success: true, user };

    } catch (error) {
        // Handle backend validation errors
        if (error.response && error.response.data) {
            return { success: false, errors: error.response.data.error || error.response.data };
        }
        return { success: false, errors: "Network error" };
    }
}



export async function login(userData) {
    const res = await base.post("/login/", userData);
    // Set tokens
    setAccessToken(res.data.access);              // in-memory
    const user = await getUserById(res.data.user_id)
    localStorage.setItem("user-data", JSON.stringify(user.data))
    localStorage.setItem("refresh", res.data.refresh); // long-lived
    const data = res.data
    return { success: true, data };
}


