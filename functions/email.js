export async function onRequestPost(context) {
  const req = await context.request.formData();
  const from = req.get("from");
  const phone = req.get("phone");
  const message = req.get("message");
  if(from.search('@') === -1 || phone == "555-555-1212" || ["thousands", "rich", "millionaire", "profit", "financial", "capital", "congrat", "wallet", "dollar", "money","robot","cash", "income","job", "bot", "earn", "rank", "boost", "seo", "crypto", "$"].some(x => message.toLowerCase().includes(x))){//bs spammers
    return;
  }
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${context.env.SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: context.env.EMAIL_RECIPIENT1 },{ email: context.env.EMAIL_RECIPIENT2 }]
        },
      ],
      from: { email: context.env.EMAIL_SENDER },
      subject: "Platypus River Contact Form","content": [{"type": "text/plain", "value": `${message} \r\nPhone: ${phone}, Email: ${from}`}]
    }),
  });
  return new Response("Email Response:" + response.status)
}