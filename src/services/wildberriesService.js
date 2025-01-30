import axios from "axios";
import db from "../db/connection.js";

export async function fetchTariffs() {
  try {
    const response = await axios.get(process.env.WB_API_KEY, {
      headers: {
        Authorization: `Bearer ${process.env.WB_API_KEY}`,
      },
    });

    const data = response.data;
    const today = new Date().toISOString().split("T")[0];

    for (const item of data) {
      await db("wb_tariffs")
        .insert({
          sku: item.sku,
          coefficient: item.coefficient,
          date: today,
        })
        .onConflict(["sku", "date"])
        .merge();
    }

    console.log("Данные успешно обновлены.");
  } catch (error) {
    console.error("Ошибка получения данных WB:", error);
  }
}
