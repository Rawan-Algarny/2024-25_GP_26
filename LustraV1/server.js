//everything that connects with the servers
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const app = require("./app");
const path = require("path");
const axios = require("axios");

dotenv.config({ path: "./config.env" });
//database
const DB = process.env.DATABASE.replace(
  //connection string
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    //connecting to the database
    serverSelectionTimeoutMS: 50000,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.error("DB connection error:", err.message));

//start a server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//functions for 3rd party API
//functions relatd to OAuth 2.0 token
async function requestOAuthToken() {
  const url = "https://passport.tvilight.io/oauth/token";
  const params = new URLSearchParams();
  params.append("client_id", process.env.TVLIGHT_API_KEY);
  params.append("client_secret", process.env.secretKey);
  params.append("grant_type", "password");
  params.append("username", "443203036@student.ksu.edu.sa"); //optional
  params.append("password", process.env.userPassword); //optional

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(), // Pass form data as a URL-encoded string
    });

    if (!response.ok) {
      throw new Error(
        `Failed to obtain token: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json(); // Parse the JSON response
    console.log("OAuth 2.0 Token:", data);
    return data.access_token; // Extract and return the access token
  } catch (error) {
    console.error("Error:", error.message);
  }
}
//requestOAuthToken();
//refreshToken();
async function refreshToken() {
  const url = "https://passport.tvilight.io/oauth/token";
  const refreshToken = process.env.refreshToken;

  const params = new URLSearchParams();
  params.append("client_id", process.env.TVLIGHT_API_KEY);
  params.append("client_secret", process.env.secretKey);
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(), // Send the data as form-encoded
    });

    if (!response.ok) {
      throw new Error(
        `Failed to refresh token: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json(); // The new access token
    console.log("New access token:", data.access_token);

    // You would store the new access token and refresh token (if provided) for future use
    return data.access_token;
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
}
//fetchOrganizationsData();
async function fetchOrganizationsData() {
  try {
    const tvlightAPI = process.env.TVLIGHT_API_KEY;
    const key = process.env.secretKey;

    const response = await fetch("https://ctl.tvilight.io/api/organisations", {
      method: "GET",
      headers: {
        "x-api-key": tvlightAPI, // The API Key for identifying the request
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.accessToken}`, // Use the Bearer token
        Accept: "application/vnd.tvilight.v1.0+json", // Specify the API version
      },
    });
    //console.log("Response status:", response.status);
    //console.log("Response headers:", response.headers.raw());
    if (!response.ok)
      throw new Error(
        `Could not fetch resource: ${response.status} - ${response.statusText}`
      );

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

async function changePowerData(gatewayId) {
  try {
    const response = await fetch(
      `https://ctl.tvilight.io/api/gateways/:${gatewayId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.accessToken}`, // Bearer token for authentication
          Accept: "application/vnd.tvilight.v1.0+json", // API versioning
          "Content-Type": "application/json",
          "x-api-key": process.env.TVLIGHT_API_KEY, // The API Key for identifying the request
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch control node: ${response.status} - ${response.statusText}`
      );
    }
    //parses node's data
    const controlNode = await response.json();
    // Toggle the "alwaysPowered" attribute
    const newAlwaysPowered = !controlNode.alwaysPowered;
    //update node's data
    const updatedResponse = await fetch(
      `https://ctl.tvilight.io/api/gateways/:${gatewayId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.accessToken}`, // Bearer token for authentication
          Accept: "application/vnd.tvilight.v1.0+json", // API versioning
          "Content-Type": "application/json",
          "x-api-key": process.env.TVLIGHT_API_KEY, // The API Key for identifying the request
        },
        body: JSON.stringify({
          id: controlNode.id,
          name: controlNode.name,
          alwaysPowered: newAlwaysPowered,
          serial_number: controlNode.serial_number,
          group_id: controlNode.group_id,
        }),
      }
    );

    if (!updatedResponse.ok) {
      throw new Error("Could not fetch resource");
    }
  } catch (error) {
    console.error(error);
  }
}
