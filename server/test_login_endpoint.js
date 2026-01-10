const axios = require("axios");

async function testLogin() {
  try {
    console.log("Attempting login...");
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email: "admin@methsara.lk",
      password: "password123",
    });
    console.log("Response status:", response.status);
    console.log("Response data:", response.data);
  } catch (error) {
    if (error.response) {
      console.log("Error status:", error.response.status);
      console.log("Error data:", error.response.data);
    } else {
      console.log("Error message:", error.message);
    }
  }
}

testLogin();
