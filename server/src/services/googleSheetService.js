import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

let doc;
let isInitialized = false;

// Initialize Google Sheets API using Service Account credentials
const initSheet = async () => {
  if (isInitialized) return true;
  
  if (!process.env.GOOGLE_SERVICE_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    console.warn("⚠️ Google Sheets credentials are not fully set in .env");
    return false;
  }

  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replace escaped newlines from .env string
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo(); 
    isInitialized = true;
    console.log(`✅ Google Sheet Connected: ${doc.title}`);
    return true;
  } catch (error) {
    console.error("❌ Failed to connect to Google Sheets:", error.message);
    return false;
  }
};

/**
 * Appends User Registration Data to a sheet named "Users"
 */
export const appendUserToSheet = async (userData) => {
  const ready = await initSheet();
  if (!ready) return;

  try {
    // Look for a specific sheet tab named 'Users'
    let sheet = doc.sheetsByTitle['Users'];
    
    // If it doesn't exist, try adding it to the first sheet tab by default
    if (!sheet) {
      if (doc.sheetCount === 0) return console.error("No sheets exist in the document");
      sheet = doc.sheetsByIndex[0]; 
    }

    await sheet.addRow({
      Date: new Date().toLocaleString(),
      Name: userData.name || '',
      Email: userData.email || '',
      Phone: userData.phone || '',
      Role: userData.role || '',
      City: userData.city || '',
      // Note: Hum deliberately Password store nahi kar rahe kyunki Data leak hona bohot bada Security Risk hai. Google Sheet par password theek nahi.
    });
    console.log(`📝 Appended User [${userData.name}] to Sheets`);
  } catch (error) {
    console.error('❌ Error appending user to sheet:', error.message);
  }
};

/**
 * Appends Booking (Rent) Data to a sheet named "Bookings"
 */
export const appendBookingToSheet = async (bookingData) => {
  const ready = await initSheet();
  if (!ready) return;

  try {
    let sheet = doc.sheetsByTitle['Bookings'];
    if (!sheet) {
      sheet = doc.sheetsByIndex[1] || doc.sheetsByIndex[0];
    }

    await sheet.addRow({
      Date: new Date().toLocaleString(),
      BookingID: bookingData._id ? bookingData._id.toString() : '',
      UserPhone: bookingData.user ? bookingData.user.phone : 'Not Provider',
      EquipmentID: bookingData.equipment ? bookingData.equipment.toString() : '',
      StartDate: bookingData.startDate || '',
      EndDate: bookingData.endDate || '',
      TotalCost: bookingData.totalPrice || bookingData.totalAmount || '',
      Status: bookingData.paymentStatus || bookingData.status || 'pending'
    });
    console.log(`🚜 Appended Booking to Sheets`);
  } catch (error) {
    console.error('❌ Error appending booking to sheet:', error.message);
  }
};
