import { readFile } from 'fs/promises'
import { MIMEMessage } from 'mimetext'

export default async function buildMessage(message: MIMEMessage) {
  // add an inline image to the message
  // the data for the attachment needs to be base64 encoded, as it is binary data
  const imageData = await readFile('./attachments/doggos.jpg', 'base64')

  message.addAttachment({
    // the filename is not strictly necessary for inline attachments, but it's good practice to include it
    filename: 'doggos.jpg',
    // the data is the base64 encoded string of the image file
    data: imageData,
    // the content type is important for attachments, as it tells the email client how to display the attachment
    contentType: 'image/jpeg',
    // inline attachments are not displayed as attachments in the email, but are instead displayed in the body of the email
    inline: true,
    // the content ID is used to place the image in email.example.html with
    // <img src="cid:doggos">
    headers: { 'Content-ID': 'doggos' },
  })

  // add a text attachment to the message
  // the data is base64 encoded string of "This is a test email attachment. Hopefully you can see it."
  message.addAttachment({
    // the filename is important for attachments, as it tells the email client how to display the attachment
    filename: 'test.txt',
    contentType: 'text/plain',
    data: 'VGhpcyBpcyBhIHRlc3QgZW1haWwgYXR0YWNobWVudC4gSG9wZWZ1bGx5IHlvdSBjYW4gc2VlIGl0Lg==',
  })
}
