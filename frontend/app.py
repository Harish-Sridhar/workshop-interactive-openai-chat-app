from flask import render_template
from flask import Flask
from flask import Flask, flash, request, redirect
import os
import whisper
import openai
from transformers import pipeline
import time

TMP_AUDIO_FILES_PATH = "./frontend/static/recordings/"
TMP_AUDIO_FILE_NAME = os.path.join(TMP_AUDIO_FILES_PATH, "recorded_audio.ogg")

os.makedirs(TMP_AUDIO_FILES_PATH, exist_ok=True)

app = Flask(__name__)

nchannels = 1
sampwidth = 1
framerate = 8000
nframes = 1

initial_chat_array = [
    {'party': 'bot', 'text': """Hi. Welcome to our app. 
    You can use the record buttons to record your voice and interact with me."""}
    ]
chat_array = initial_chat_array.copy()

sentiment_detection = {
    'positive': 0,
    'negative': 0,
    'neutral': 0
}

current_chat_sentiment = sentiment_detection.copy()

@app.route('/')
def home(recordedText=None, 
         recordedAudioLocation=None, 
         chatArray = initial_chat_array,
         totalTurns=0,
         sentiments=sentiment_detection):
    chat_array = initial_chat_array.copy()
    current_chat_sentiment = sentiment_detection.copy()
    return render_template('index.html',
                           recordedText=recordedText,
                           recordedAudioLocation=recordedAudioLocation,
                           chatArray = chatArray,
                           totalTurns = totalTurns,
                           sentiments=sentiments)

@app.route('/audio', methods=['post'])
def audio():
    file = request.files['audioFile']
    with open(TMP_AUDIO_FILE_NAME, 'wb') as f:
        file.save(f)
    return transcribeAudio(TMP_AUDIO_FILE_NAME)

@app.route('/render', methods=['post'])
def render():
    form_data = request.form
    recorded_text = form_data.get("recordedText")
    text_to_complete = form_data.get("textToComplete")
    if text_to_complete is not None:
        chat_array.append({
            'party': 'user', 'text': text_to_complete
        })
        completed_text = completePrompt(text_to_complete)
        chat_array.append({
            'party': 'bot', 'text': completed_text
        })
        turn_sentiment = detectSentiment(text_to_complete).lower()
        current_chat_sentiment[turn_sentiment] = current_chat_sentiment.get(turn_sentiment, 0) + 1


    totalTurns = len(chat_array) if len(chat_array)>1 else 0 

    return render_template('index.html',
                           recordedText=recorded_text,
                           recordedAudioLocation="/static/recordings/recorded_audio.ogg",
                           chatArray = chat_array,
                           totalTurns = totalTurns,
                           sentiments=current_chat_sentiment)

@app.route('/end_chat')
def end_chat():
    user_text = " ".join([ x['text'] for x in chat_array if x['party'] == 'user' ])
    overall_sentiment = detectSentiment(user_text).lower()
    print(user_text)
    print(overall_sentiment)
    return render_template('summary.html',
                           chatArray = chat_array,
                           sentiments=current_chat_sentiment,
                           overallSentiment = overall_sentiment ) 


"""
Task 1: Load the whisper base model..
Note: use base model as it is small and faster to transcribe.
and transcribe the audio
"""

def transcribeAudio(audio_file_path: str) -> str:
    """
    transcribe a given audio file using open ai.

    Args:
        audio_file_path (str): path to the audio file to transcribe

    Returns:
        str: transcription of the audio file
    """
    pass

"""
Task 2: use the openai "text-curie-001" model to complete the user prompt ..
Note: use "text-curie-001" model as it is small and faster and also cost effective.
Note: provide OPENAPI_KEY as environment variable to prevent secrets in code.
"""

def completePrompt(prompt: str) -> str:
    """
    complete a given prompt using open ai chat gpt 3 model.

    Args:
        prompt (str): the user prompt

    Returns:
        str: chat gpt response text
    """
    pass

"""
Task 3: use the hugging face "sentiment-analysis" model to detect sentiments..
"""
def detectSentiment(text: str)-> str:
    """
    detect the sentiment of given text using hugging face sentiment analysis model

    Args:
        text (str): the text to analyse sentiment.

    Returns:
        str: the sentiment label of the text
    """
    pass

if __name__ == '__main__':
    app.run(debug=True)