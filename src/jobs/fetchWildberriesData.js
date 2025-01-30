import { fetchTariffs } from "../services/wildberriesService.js";

setInterval(fetchTariffs, 60 * 60 * 1000);
