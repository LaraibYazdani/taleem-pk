const bcrypt = require('bcryptjs');

async function hashPassword() {
  const password = 'admin123'; // choose your admin password
  const hashed = await bcrypt.hash(password, 10);
  console.log('Hashed Password:', hashed);
  
}

hashPassword();
