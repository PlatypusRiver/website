

export function onRequest(req) {
  const sgMail = require('@sendgrid/mail');
  const { from = 'nobody@fake.com', message = 'Empty', phone = 'test' } = req.params

  sgMail.setApiKey(process.env.SENDGRIDKEY);
  const msg = {
    to: ['colton.correll@platypusriver.com','david.bates@platypusriver.com'],
    from: 'contact@platypusriver.com',
    subject: 'Platypus River Contact Form',
    text: `${message} \r\nPhone: ${phone}, Email: ${from}`
  };
  if(from.search('@') === -1 || phone == "555-555-1212" || ["thousands", "rich", "millionaire", "profit", "financial", "capital", "congrat", "wallet", "dollar", "money","robot","cash", "income","job", "bot", "earn", "rank", "boost", "seo", "crypto", "$"].some(x => message.toLowerCase().includes(x))){//bs spammers
    return;
  }
  sgMail.send(msg).then(() => {
    res.status(200).send('true')
  })
  .catch(error => {
    res.status(200).send(error)
  });
}