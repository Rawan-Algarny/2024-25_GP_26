// Function to fetch streetlight data and populate the table
async function loadStreetlightData() {
  try {
    const response = await fetch("http://localhost:3000/streetlights"); // Fetch data from the backend
    console.log("has been fetched");
    const streetlights = await response.json(); // Parse JSON response
    console.log("has been parsed");
    const tableBody = document.querySelector("#streetlightTable tbody");
    tableBody.innerHTML = "";
    streetlights.forEach((streetlight) => {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${streetlight._id}</td>
            <td>${streetlight.status}</td>
            <td>${streetlight.location.coordinates.join(", ")}</td>
            <td>${streetlight.location.address}</td>
            <td>${streetlight.ApplyZoneSetting}</td>
            <td>${streetlight.ApplyProfileSetting}</td>
            <td><img src="img/delete_icon.png">
                <img src="img/edit_icon.png">
                <img src="img/power_switch_icon.png" alt="Toggle Power" onclick="fetchPowerToggle(${
                  streetlight._id
                })"style="cursor: pointer;">
            </td>
            `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching streetlight data:", error);
  }
}
// Call the function to load table data when the page loads
window.onload = loadStreetlightData;

// JavaScript function to toggle power status using the control node ID
async function fetchPowerToggle(streetlightID) {
  try {
    const response = await fetch(
      `http://localhost:3000/streetlights/${streetlightID}`,
      {
        method: "PATCH", // Assuming PATCH method is used
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Streetlight power status updated:", data);
    alert("Streetlight power status successfully toggled!");
  } catch (error) {
    console.error("Error updating power status:", error.message);
    alert("Error updating streetlight power status.");
  }
}
