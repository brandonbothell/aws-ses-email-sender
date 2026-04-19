import { SendRawEmailCommand, type SendRawEmailCommandInput, SESClient } from '@aws-sdk/client-ses'
import { createMimeMessage } from 'mimetext'
import { readFile } from 'fs/promises'
import 'dotenv/config'
import buildMessage from './message-builder'

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_REGION) {
  console.error('AWS credentials or region not set in environment variables.')
  process.exit(1)
}

const emailClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

run().catch(console.error)

async function run() {
  if (!process.env.EMAIL_SENDER || !process.env.EMAIL_RECIPIENT) {
    console.error('Email sender or recipient not set in environment variables.')
    process.exit(1)
  }

  const emailContent = await readFile('./attachments/email.example.html', 'utf8')

  const message = createMimeMessage()
  message.setSender(process.env.EMAIL_SENDER)
  message.setRecipient(process.env.EMAIL_RECIPIENT)
  message.setSubject('My New Email Address!')
  message.addMessage({
    contentType: 'text/html',
    data: emailContent,
  })

  await buildMessage(message)

  let recipients = message.getRecipients({ type: 'To' })!

  if (!Array.isArray(recipients)) recipients = [recipients]

  const params: SendRawEmailCommandInput = {
    Destinations: recipients.map(mailbox => mailbox.name ? `"${mailbox.name}" <${mailbox.addr}>` : mailbox.addr),
    RawMessage: {
      // the raw message data needs to be sent as uint8array
      Data: Buffer.from(message.asRaw(), 'utf8'),
    },
    Source: message.getSender()!.name ? `"${message.getSender()!.name}" <${message.getSender()!.addr}>` : message.getSender()!.addr,
  }

  console.log('Hello, TypeScript 6.0.3 with NodeNext module system and ESNext target!')
  console.log(params)

  const result = await emailClient.send(new SendRawEmailCommand(params)).catch((error) => {
    console.error('Error sending email:', error)
    throw error
  })
  console.log(`Message ID: ${result.MessageId}`)

  // console.log(message.asRaw())
}
