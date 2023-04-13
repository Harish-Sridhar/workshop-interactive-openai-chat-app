# Whisper

[Whisper](https://github.com/openai/whisper) is a opensource general-purpose speech recognition model provided by open ai.


# Install whisper

* create venv.
    
    # check if python version is 3.9.9
    python --version 
    # create venv
    python3 -m venv .venv

* install requirements

    source .venv/bin/activate
    pip install openai-whisper

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


# transcribe audio

    ```
        import whisper

    model = whisper.load_model("base")
    result = model.transcribe("audio.mp3")
    print(result["text"])
    ``` 