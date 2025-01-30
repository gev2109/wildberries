const { google } = require("googleapis");
const { JWT } = require("google-auth-library");

/**
 * @param {string} spreadsheetId
 * @param {string} range
 * @param {Array} values
 */
async function updateSheet(spreadsheetId, range, values) {
  const auth = new JWT({
    email: process.env.GOOGLE_SHEET_CLIENT_EMAIL,
    key: process.env.GOOGLE_SHEET_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    });
  } catch (error) {
    console.error("Error updating Google Sheet: ", error);
  }
}

module.exports = { updateSheet };
