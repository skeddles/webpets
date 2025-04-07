import dotenv from 'dotenv';
dotenv.config({ override: true });
console.log('setup', process.env.JWT_SECRET, process.env.TESTY)