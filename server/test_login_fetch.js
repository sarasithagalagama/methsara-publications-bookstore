async function testLogin() {
  try {
    console.log("Attempting login...");
    const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "admin@methsara.lk",
        password: "password123",
      }),
    });

    const data = await response.json();
    console.log("Response status:", response.status);
    console.log("Response data:", data);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

testLogin();
