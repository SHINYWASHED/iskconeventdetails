const sheetId = "1QFLzxYMmlhg0SV8C1cEXPxo9CaM1YKgU8zmQL0ybeEk"; 
const apiKey = "AIzaSyBuVqvwSK-NK2-GXyAsbpN49a1RxajCKwc";  

const corsProxy = "https://corsproxy.io/?";  // ✅ Bypass CORS for GitHub Pages

async function fetchSheetData(sheetName, elementId) {
    const url = `${corsProxy}https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetName)}!A1:Z1000?key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log(`${sheetName} Data:`, data);

        if (data.values) {
            let html = `<table border='1' style="width:100%; border-collapse: collapse;">`;
            data.values.forEach(row => {
                html += `<tr>${row.map(cell => `<td style="border: 1px solid black; padding: 8px;">${cell}</td>`).join("")}</tr>`;
            });
            html += `</table>`;

            document.getElementById(elementId).innerHTML = html;
        } else {
            document.getElementById(elementId).innerHTML = "No data found.";
        }
    } catch (error) {
        console.error(`Error fetching ${sheetName}:`, error);
        document.getElementById(elementId).innerHTML = `Error loading data from ${sheetName}: ${error.message}`;
    }
}

// ✅ Update the sheet name here
fetchSheetData("Iskcon_Event_Details", "sheetData");
