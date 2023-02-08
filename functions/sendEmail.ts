import { Handler } from "@netlify/functions";
import { sendEmail } from "@netlify/emails";

const handler: Handler = async function (event) {
  if (event.body === null) {
    return {
      statusCode: 400,
      body: JSON.stringify("Payload required"),
    };
  }

  console.log("location 1");

  const requestBody = JSON.parse(event.body) as {
    from: string;
    to: string;
    subject: string;
    parameters: {
      name: string;
      email: string;
      message: string;
    };
  };

  //automatically generated snippet from the email preview
  //sends a request to an email handler for a subscribed email
  const repsonse = await sendEmail({
    from: "Example@outlook.com",
    to: "Example@outlook.com",
    subject: `You have a new email from ${requestBody.parameters.name} on your portfolio`,
    template: "contact-email",
    parameters: {
      name: requestBody.parameters.name,
      email: requestBody.parameters.email,
      message: requestBody.parameters.message,
    },
  });

  console.log("SENT (In theory)", requestBody);

  const repsonseBody = await repsonse.json();

  // axios.post

  return {
    statusCode: repsonse.status,
    body: JSON.stringify(repsonseBody),
  };
};

export { handler };
