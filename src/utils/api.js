import axios from "axios";

export default axios.create({
  baseURL: "https://test.lfstats.com/api/",
  responseType: "json"
});
