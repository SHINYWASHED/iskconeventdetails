document.addEventListener("DOMContentLoaded", function () {
    const sheetId = "1QFLzxYMmlhg0SV8C1cEXPxo9CaM1YKgU8zmQL0ybeEk"; // Your Google Sheets ID
    const apiKey = "AIzaSyBuVqvwSK-NK2-GXyAsbpN49a1RxajCKwc"; // Your Google Sheets API Key

    // Define different sheets and their ranges
    const sheets = [
        { range: "Sheet1!A1:Z1000", elementId: "sheetData1", title: "Registered Students" },
        { range: "Sheet2!A1:Z1000", elementId: "sheetData2", title: "ISKCON Group Members" }
    ];

    sheets.forEach(sheet => {
        fetchSheetData(sheetId, sheet.range, apiKey, sheet.elementId, sheet.title);
    });
});

function fetchSheetData(sheetId, range, apiKey, elementId, title) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayData(data, elementId, title);
        })
        .catch(error => {
            document.getElementById(elementId).innerHTML = "Error loading data.";
            console.error("Error fetching data:", error);
        });
}

function displayData(data, elementId, title) {
    if (!data.values || data.values.length === 0) {
        document.getElementById(elementId).innerHTML = "No data available.";
        return;
    }

    let table = `<h2>${title}</h2><table border='1'>`;
    data.values.forEach((row, index) => {
        table += "<tr>";
        row.forEach(cell => {
            table += index === 0 ? `<th>${cell}</th>` : `<td>${cell}</td>`;
        });
        table += "</tr>";
    });
    table += "</table>";

    document.getElementById(elementId).innerHTML = table;
}
