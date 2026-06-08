const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
});

function langLabel(lang) {
  return lang === 'uz' ? "O'zbek tilida" : lang === 'ru' ? 'на русском языке' : 'in English';
}

async function getAiRecommendation(req, res) {
  if (!process.env.DEEPSEEK_API_KEY) return res.status(503).json({ error: 'AI service not configured' });

  const { destination, destinationType, startDate, endDate, days, travelers, budget, hotelType, transport, interests, lang } = req.body;

  const prompt = `You are a professional travel advisor. Create a warm, personalized travel recommendation ${langLabel(lang)}.

Travel preferences:
- Destination: ${destination || 'not specified'}
- Type: ${destinationType === 'domestic' ? 'Domestic (Uzbekistan)' : 'International'}
- Duration: ${days} days (${startDate || '?'} → ${endDate || '?'})
- Travelers: ${travelers} people
- Budget: ${budget || 'not specified'}
- Hotel: ${hotelType || 'not specified'}
- Transport: ${transport || 'not specified'}
- Interests: ${Array.isArray(interests) && interests.length ? interests.join(', ') : 'not specified'}

Write 3 short paragraphs (~200 words): highlight top attractions, recommended activities, and one practical tip. Be friendly and specific.`;

  try {
    const completion = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: 'You are a helpful and enthusiastic travel advisor.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 500,
    });
    res.json({ recommendation: completion.choices[0].message.content });
  } catch (err) {
    console.error('DeepSeek recommendation error:', err.message);
    res.status(500).json({ error: 'Failed to generate recommendation' });
  }
}

async function chatWithAi(req, res) {
  if (!process.env.DEEPSEEK_API_KEY) return res.status(503).json({ error: 'AI service not configured' });

  const { messages, lang } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages required' });
  }

  const system = `You are TravelCraft AI — a friendly, knowledgeable travel assistant specializing in Uzbekistan and international travel.
Help users with: destination info, travel tips, best seasons to visit, visa requirements, estimated prices (USD), cultural advice, packing tips, and itinerary suggestions.
Always respond ${langLabel(lang)}. Be concise and helpful (max 3 short paragraphs). Include specific price estimates when asked about costs.`;

  try {
    const completion = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: [{ role: 'system', content: system }, ...messages.slice(-10)],
      max_tokens: 600,
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error('DeepSeek chat error:', err.message);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
}

async function getDestinationInfo(req, res) {
  if (!process.env.DEEPSEEK_API_KEY) return res.status(503).json({ error: 'AI service not configured' });

  const { destination, country, lang } = req.body;
  if (!destination) return res.status(400).json({ error: 'destination required' });

  const prompt = `Give a brief travel overview of ${destination}${country ? ', ' + country : ''} ${langLabel(lang)}.
Return ONLY a valid JSON object with this exact shape:
{
  "highlights": ["3-4 key attractions, each max 8 words"],
  "bestTime": "best months to visit (1 short sentence)",
  "prices": {
    "budget": "e.g. $30-50/day",
    "midRange": "e.g. $80-120/day",
    "luxury": "e.g. $200+/day"
  },
  "tip": "one practical tip for visitors (1 sentence)"
}`;

  try {
    const completion = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 400,
      response_format: { type: 'json_object' },
    });
    const info = JSON.parse(completion.choices[0].message.content);
    res.json(info);
  } catch (err) {
    console.error('DeepSeek destination info error:', err.message);
    res.status(500).json({ error: 'Failed to get destination info' });
  }
}

module.exports = { getAiRecommendation, chatWithAi, getDestinationInfo };
