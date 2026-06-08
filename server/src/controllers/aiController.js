const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
});

async function getAiRecommendation(req, res) {
  if (!process.env.DEEPSEEK_API_KEY) {
    return res.status(503).json({ error: 'AI service not configured' });
  }

  const { destination, destinationType, startDate, endDate, days, travelers, budget, hotelType, transport, interests, lang } = req.body;

  const langLabel = lang === 'uz' ? "O'zbek tilida" : lang === 'ru' ? 'на русском языке' : 'in English';

  const prompt = `You are a professional travel advisor. Create a warm, personalized travel recommendation ${langLabel}.

Travel preferences:
- Destination: ${destination || 'not specified'}
- Type: ${destinationType === 'domestic' ? "Domestic (Uzbekistan)" : "International"}
- Duration: ${days} days (${startDate || '?'} → ${endDate || '?'})
- Travelers: ${travelers} people
- Budget: ${budget || 'not specified'}
- Hotel: ${hotelType || 'not specified'}
- Transport: ${transport || 'not specified'}
- Interests: ${Array.isArray(interests) && interests.length ? interests.join(', ') : 'not specified'}

Write 3 short paragraphs (total ~200 words): highlight top attractions, recommended activities, and one practical tip. Be friendly and specific.`;

  try {
    const completion = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: 'You are a helpful and enthusiastic travel advisor.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 500,
    });

    const recommendation = completion.choices[0].message.content;
    res.json({ recommendation });
  } catch (err) {
    console.error('DeepSeek AI error:', err.message);
    res.status(500).json({ error: 'Failed to generate recommendation' });
  }
}

module.exports = { getAiRecommendation };
