import { GoogleSpreadsheet } from "google-spreadsheet";
import db from "../db/connection.js";
import "dotenv/config";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const doc = new GoogleSpreadsheet(SHEET_ID);

async function uploadToGoogleSheets() {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    await doc.loadInfo();
    const sheet = doc.sheetsByTitle["stocks_coefs"];
    await sheet.clear();

    const tariffs = await db("wb_tariffs").orderBy("coefficient", "asc");
    await sheet.addRows(tariffs);

    console.log("Данные успешно загружены в Google Sheets.");
  } catch (error) {
    console.error("Ошибка загрузки в Google Sheets:", error);
  }
}

export { uploadToGoogleSheets };
