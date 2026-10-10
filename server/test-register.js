async function test() {
  try {
    const res = await fetch('http://localhost:5555/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser_' + Date.now(),
        email: 'test_' + Date.now() + '@example.com',
        password: 'password123',
        role: 'learner'
      })
    });
    const text = await res.text();
    console.log(`Status: ${res.status}`);
    console.log(`Response Body: "${text}"`);
  } catch (err) {
    console.error('Network Error:', err.message);
  }
}
test();
