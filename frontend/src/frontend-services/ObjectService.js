import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:3033",
    headers: {
        "Content-type": "application/json"
    }
});


class ObjectService {
    getAll() {
        return http.get(`/server/ax`);
    }
}

export default new ObjectService();