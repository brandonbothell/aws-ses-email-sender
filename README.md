# aws-ses-email-sender
To send an email:

1. Rename [`.env.example`](.env.example) to just `.env` (removing `.example` from the end).

2. Populate the `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_REGION` variables with their proper values.
    - To retrieve these values, navigate to the [AWS console](https://console.aws.amazon.com/iam/home), click on your profile name in the top-right, and click **"Security credentials"** towards the bottom. Click the **"Create access key"** button and follow the steps to retrieve your `Access Key ID` and `Secret Access Key`.

3. Further down, edit `EMAIL_SUBJECT`, `EMAIL_SENDER`, and `EMAIL_RECIPIENT` to customize your email's header data.

4. Next, edit [`attachments/email.example.html`](attachments/email.example.html) to build your email's message.

5. Finally, edit [`source/message-builder.ts`](source/message-builder.ts) to reflect any attachments you included in `email.example.html`
    - If you are using the example email the project comes with, it is ready to go and has some useful info in there as well

6. Now you can run the [`send:email`](package.json#L5) script to send the email!
    - `npm run send:email` or
    - `yarn send:email`
