// scripts/testEmail.ts
import 'dotenv/config';
import { sendEmail } from '../src/utils/sendEmail';

sendEmail('devintveasna@gmail.com', 'SMTP test', 'Hello from the bot SMTP test')
  .then(() => console.log('✅ Email sent'))
  .catch(console.error);
