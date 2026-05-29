import cohere
from dotenv import load_dotenv
import os

load_dotenv()

client = cohere.ClientV2(api_key=os.getenv("COHERE_API_KEY"))

SYSTEM_PROMPT = """
You are a customer support agent for an e-commerce company.

You can handle:
- Order status questions
- General product FAQs
- Simple refund requests
- Delivery issues

You CANNOT handle:
- Fraud or legal complaints
- Refunds over $500
- Abusive or threatening customers
- Anything you are uncertain about

If the issue falls outside what you can handle, respond with exactly:
ESCALATE: <brief reason why>

Otherwise respond helpfully and concisely in 2-3 sentences.
"""

def process_ticket(issue: str) -> dict:
    response = client.chat(
        model="command-a-03-2025",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"Customer issue: {issue}"}
        ]
    )

    response_text = response.message.content[0].text.strip()
    is_escalated = response_text.startswith("ESCALATE")

    return {
        "response": response_text,
        "escalated": is_escalated
    }