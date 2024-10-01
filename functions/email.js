export async function onRequestPost(context) {
  const req = await context.request.formData();
  const from = req.get("from");
  const phone = req.get("phone");
  const message = req.get("message");
  if(from.search('@') === -1 || phone == "555-555-1212" || ["thousands", "rich", "millionaire", "profit", "financial", "capital", "congrat", "wallet", "dollar", "money","robot","cash", "income","job", "bot", "earn", "rank", "boost", "seo", "crypto", "$"].some(x => message.toLowerCase().includes(x))){//bs spammers
    return;
  }
  await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${context.env.SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: 'colton.correll@platypusriver.com' }]
        },
      ],
      from: { email: from },
      subject: "Platypus River Contact Form","content": [{"type": "text/plain", "value": `${message} \r\nPhone: ${phone}, Email: ${from}`}]
    }),
  });
  const html = `<!DOCTYPE html>
    <body>
      <h1>Email Sent</h1>
    </body>`;

    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    });
}