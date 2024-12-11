const fs = require("fs");
const path = require("path");
require("dotenv").config(); // Load environment variables from .env file

// Print the path to the credentials file
console.log(
  "Path to Google Application Credentials:",
  process.env.GOOGLE_APPLICATION_CREDENTIALS
);

// Check if the credentials file exists and handle errors
const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (credPath && fs.existsSync(credPath)) {
  const credentials = fs.readFileSync(credPath, "utf8");
} else {
  console.error(
    "Could not find credentials file. Please ensure the GOOGLE_APPLICATION_CREDENTIALS path is correct."
  );
}

// Continue with your Dialogflow setup
const dialogflow = require("dialogflow");

// Define the correct project ID and session ID
const projectId = "promptopia-427420"; // replace with your actual Dialogflow project ID
const sessionId = "12345"; // unique session for each user

// Instantiates a session client
const sessionClient = new dialogflow.SessionsClient();

// Define the session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

async function runSample() {
  // Define the query
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: "I want to set appointment", // The user's query
        languageCode: "en-US",
      },
    },
  };

  // Send the request and log the response
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log("  No intent matched.");
  }
}

runSample();
