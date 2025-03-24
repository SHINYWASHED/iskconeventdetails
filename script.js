document.addEventListener("DOMContentLoaded", function () {
    const sheetId = "1QFLzxYMmlhg0SV8C1cEXPxo9CaM1YKgU8zmQL0ybeEk"; // Your Google Sheets ID
    const apiKey = "AIzaSyBuVqvwSK-NK2-GXyAsbpN49a1RxajCKwc"; // Your Google Sheets API Key

    // Define different sheets and their ranges
    const sheets = [
        { range: "Sheet1!A1:Z1000", elementId: "sheetData1", title: "Registered Students" },
        { range: "Sheet2!A1:Z1000", elementId: "sheetData2", title: "Student Details" },
        { range: "Sheet3!A1:Z1000", elementId: "sheetData3", title: "Not Decided" },
        { range: "Sheet4!A1:Z1000", elementId: "sheetData4", title: "Not Decided" },
        { range: "Sheet5!A1:Z1000", elementId: "sheetData5", title: "Not Decided" }
    ];

    // Fetch data for each sheet
    sheets.forEach(sheet => fetchSheetData(sheetId, sheet.range, apiKey, sheet.elementId, sheet.title));
});

// Fetch data from Google Sheets API
function fetchSheetData(sheetId, range, apiKey, elementId, title) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    const element = document.getElementById(elementId);

    // Show a loading animation
    element.innerHTML = `<div class="loading">⏳ Loading ${title}...</div>`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error loading ${title}: ${response.status}`);
            }
            return response.json();
        })
        .then(data => displayData(data, elementId, title))
        .catch(error => {
            element.innerHTML = `<p class="error">❌ Failed to load ${title}. Please try again later.</p>`;
            console.error(`Error fetching ${title}:`, error);
        });
}

// Display fetched data in a table format
function displayData(data, elementId, title) {
    const element = document.getElementById(elementId);

    if (!data.values || data.values.length === 0) {
        element.innerHTML = `<p class="no-data">⚠️ No data available for ${title}.</p>`;
        return;
    }

    let table = `<h2 class="table-title">${title}</h2><table class="styled-table">`;

    data.values.forEach((row, index) => {
        table += `<tr class="${index === 0 ? "header-row" : "data-row"}">`;
        row.forEach(cell => {
            table += index === 0 ? `<th>${cell}</th>` : `<td>${cell}</td>`;
        });
        table += "</tr>";
    });

    table += "</table>";

    // Apply fade-in animation after data loads
    element.innerHTML = table;
    element.classList.add("fade-in");
}
