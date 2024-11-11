const bcrypt = require('bcrypt');

async function generateHash() {
  const password = 'admin2024!';
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Hashed Password:', hashedPassword);
}

generateHash();
