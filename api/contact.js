const recipient = 'andreivreblora@gmail.com'
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function readText(value, maximumLength) {
  return typeof value === 'string' ? value.trim().slice(0, maximumLength) : ''
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ message: 'Method not allowed.' })
  }

  const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body || {}
  const firstName = readText(body.firstName, 60)
  const lastName = readText(body.lastName, 60)
  const email = readText(body.email, 120)
  const topic = readText(body.topic, 120)
  const message = readText(body.message, 3000)
  const website = readText(body.website, 200)

  // Hidden from visitors; bots that fill it out are treated as successful but ignored.
  if (website) {
    return response.status(200).json({ message: 'Message sent.' })
  }

  if (!firstName || !lastName || !topic || !message || !emailPattern.test(email)) {
    return response.status(400).json({ message: 'Please complete every field with a valid email address.' })
  }

  if (!process.env.RESEND_API_KEY) {
    return response.status(500).json({ message: 'The contact form is not configured yet.' })
  }

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [recipient],
      reply_to: email,
      subject: `Portfolio inquiry: ${topic}`,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${message}`,
    }),
  })

  if (!resendResponse.ok) {
    console.error('Resend contact request failed:', await resendResponse.text())
    return response.status(502).json({ message: 'Unable to send your message. Please try again later.' })
  }

  return response.status(200).json({ message: 'Message sent.' })
}
