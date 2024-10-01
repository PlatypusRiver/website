export async function onRequestPost(req) {
  const { from = 'nobody@fake.com', message = 'Empty', phone = 'test' } = req.params
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
  return new Response(null, {
    status: 200,
  });
}