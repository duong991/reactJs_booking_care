import axios from "../axios";

const userService = {
    handleLoginAPI(email, password) {
        return axios.post("/api/login", { email, password });
    },

    getAllUser(id) {
        return axios.get(`/api/get-all-user?id=${id}`);
    },

    deleteUser(id) {
        // return axios.delete("/api/delete-user", { id });
        return axios.delete("/api/delete-user", {
            data: {
                id,
            },
        });
    },
};

export default userService;
