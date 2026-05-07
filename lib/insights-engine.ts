import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function generateInsights(tenantId: string, kpiData: KPISnapshot[]) {
  const prompt = `You are a senior business analyst for a Gujarat SME.
Analyze these KPI metrics and generate 3 specific, actionable business insights.
Focus on revenue opportunities, cost savings, and operational improvements.
Keep language simple, direct, and grounded in the data.

KPI Data: ${JSON.stringify(kpiData, null, 2)}

Respond with a JSON array of insights. Each insight must have:
- category: one of [revenue_opportunity, cost_saving, inventory_alert, anomaly_detected, growth_signal]
- priority: one of [critical, high, medium, low]  
- title: max 8 words
- body: 2-3 sentences explaining what was found and why it matters
- action_suggestion: one specific action the business owner should take
- estimated_impact_inr: estimated monthly INR impact (number only)

Return only valid JSON, no markdown.`

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }]
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : '[]'
  return JSON.parse(text) as GeneratedInsight[]
}