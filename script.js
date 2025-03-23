const sheetId = "1QFLzxYMmlhg0SV8C1cEXPxo9CaM1YKgU8zmQL0ybeEk"; 
const apiKey = "YOUR_NEW_API_KEY"; // Replace with a new API key

async function fetchSheetData(sheetName, elementId) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A1:Z1000?key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log(`${sheetName} Data:`, data);

        if (data.values) {
            let html = `<table border='1'>`;
            data.values.forEach(row => {
                html += `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`;
            });
            html += `</table>`;

            document.getElementById(elementId).innerHTML = html;
        } else {
            document.getElementById(elementId).innerHTML = "No data found.";
        }
    } catch (error) {
        console.error(`Error fetching ${sheetName}:`, error);
        document.getElementById(elementId).innerHTML = `Error loading data from ${sheetName}`;
    }
}

// Load both sheets
fetchSheetData("Sheet1", "sheet1Data");
fetchSheetData("Sheet2", "sheet2Data");
