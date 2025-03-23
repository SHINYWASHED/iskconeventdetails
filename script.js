const sheetName = "Iskcon Event Details";  // Change if your sheet name is different

const url = `https://sheets.googleapis.com/v4/spreadsheets/1QFLzxYMmlhg0SV8C1cEXPxo9CaM1YKgU8zmQL0ybeEk/values/Sheet1?key=AIzaSyBuVqvwSK-NK2-GXyAsbpN49a1RxajCKwc`;

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if (!data.values || data.values.length === 0) {
      throw new Error("No data found in the spreadsheet.");
    }

    console.log("Google Sheet Data:", data.values);

    let table = "<table border='1' cellspacing='0' cellpadding='5' style='border-collapse: collapse; width: 100%; text-align: left;'>";
    
    // Create table headers
    table += "<tr style='background-color: #f2f2f2;'>";
    data.values[0].forEach(header => {
        table += `<th style='padding: 8px;'>${header}</th>`;
    });
    table += "</tr>";

    // Create table rows
    for (let i = 1; i < data.values.length; i++) {
        table += "<tr>";
        data.values[i].forEach(cell => {
            table += `<td style='padding: 8px;'>${cell}</td>`;
        });
        table += "</tr>";
    }

    table += "</table>";
    
    document.getElementById("sheetData").innerHTML = table;
  })
  .catch(error => {
    console.error("Error fetching data:", error);
    document.getElementById("sheetData").innerHTML = `<p>Error loading data: ${error.message}</p>`;
  });
