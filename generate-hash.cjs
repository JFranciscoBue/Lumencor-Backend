const bcrypt = require('bcrypt');
const readline = require('node:readline/promises');

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const password = await rl.question('Nueva contraseña: ');
  rl.close();

  const hash = await bcrypt.hash(password, 12);

  console.log('\nHash generado:\n');
  console.log(hash);
}

main().catch(console.error);
