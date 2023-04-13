# workshop-interactive-openai-chat-app
Workshop for the interactive openai chat api

In this workshop, we will build a front end interactive chat application that record user voice, use open ai to transcribe the audio, then use chat gpt to respond to the request.
We also use hugging face sentiment analysis to detect sentiments.

**Note:** Please use english language to interact with the app.

# what will you learn

* transcribing audio using openai whisper programatically.
* using chat gpt 3 models using openai programatically.
* Using sentiment analysis model from hugging face.
* creating a front end app using python flask.


# Pre-requisties

* python `3.9`.
* Create an account in openai and create a API Key.

# setting up local environment

* create venv.
    
    # check if python version is 3.9
    python --version 
    # create venv
    python3 venv .venv

* install requirements

    source .venv/bin/activate
    pip install -r requirements.txt

* install ffmpeg. This is needed for openai-whisper

    # on Ubuntu or Debian
    sudo apt update && sudo apt install ffmpeg

    # on Arch Linux
    sudo pacman -S ffmpeg

    # on MacOS using Homebrew (https://brew.sh/)
    brew install ffmpeg

    # on Windows using Chocolatey (https://chocolatey.org/)
    choco install ffmpeg

    # on Windows using Scoop (https://scoop.sh/)
    scoop install ffmpeg


# Testing the app

    ./.venv/bin/python frontend/app.py

then go to the url `http://127.0.0.1:5000/`