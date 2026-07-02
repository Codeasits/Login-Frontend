import axios from "axios";

const api = axios.create({

    baseURL: "https://login-signup-backend-lilac.vercel.app/",

    headers:{

        "Content-Type":"application/json"

    }

});

export default api;