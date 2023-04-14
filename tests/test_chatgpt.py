import openai
import os


openai.api_key = os.environ["OPENAI_API_KEY"]
OPENAI_MODEL_ENGINE = "text-curie-001"

prompt = "What are the seven wonders of the world?"

completion = openai.Completion.create(engine=OPENAI_MODEL_ENGINE, prompt=prompt)
