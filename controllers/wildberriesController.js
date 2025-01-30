import { GoogleSpreadsheet } from "google-spreadsheet";
import dotenv from "dotenv";
import db from "../db/connection.js";

dotenv.config();

const authenticateGoogleSheets = async () => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    await doc.loadInfo();
    return doc;
  } catch (error) {
    console.error("Ошибка аутентификации Google Sheets:", error);
    throw error;
  }
};

export const uploadData = async (req, res) => {
  const doc = await authenticateGoogleSheets();
  const sheet = doc.sheetsByIndex[0];

  try {
    const data = await db("wb_tariffs").orderBy("coefficient", "asc");

    const rows = data.map((item) => ({
      sku: item.sku,
      coefficient: item.coefficient,
      date: new Date().toISOString().split("T")[0],
    }));

    await sheet.addRows(rows);
    console.log("Данные успешно выгружены в Google Sheets.");
    res.send("Данные успешно выгружены в Google Sheets.");
  } catch (error) {
    console.error("Ошибка при загрузке данных в Google Sheets:", error);
    res.status(500).send("Ошибка при загрузке данных в Google Sheets.");
  }
};
