import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3033",
  headers: {
    "Content-type": "application/json",
  },
});

class LibraryService {
  getAll() {
    return http.get(`/media`);
  }

  getAllOfFormat(format) {
    return http.get(`/${format}`);
  }

  get(id) {
    return http.get(`/media/${id}`);
  }

  search(search_value) {
    return http.get(`/search/${search_value}`);
  }

  create(data) {
    return http.post("/create", data);
  }

  delete(id) {
    return http.delete(`/media/${id}`);
  }
}

export default new LibraryService();
