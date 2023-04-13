# Pre-requisties

* python `3.9.9`.
* Create an account in openai and create a API Key.

https://platform.openai.com/docs/introduction

# setting up local environment

* create venv.
    
    # check if python version is 3.9
    python --version 
    # create venv
    python3 -m venv .venv

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