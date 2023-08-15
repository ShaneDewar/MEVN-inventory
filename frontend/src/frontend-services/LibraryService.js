import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:3033",
    headers: {
        "Content-type": "application/json"
    }
});


class LibraryService {
    getAll() {
        return http.get(`/media`);
    }
    get(id) {
        return http.get(`/media/${id}`);
    }
}

export default new LibraryService();