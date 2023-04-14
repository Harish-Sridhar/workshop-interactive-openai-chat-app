# Whisper

[Whisper](https://github.com/openai/whisper) is a general-purpose speech recognition model provided by open ai.


# Install whisper

Note: Skip this part if you completed instructions in `01-setting-up.md`.

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

# create a voice recording.

* Using an online/ offline audio recorder create a audio file. 


# transcribe audio using whisper ai

create a python file `test_whisper.py` and use the following code.

    ```
        import whisper

    model = whisper.load_model("base")
    result = model.transcribe(<enter-path-to-audio-file.>)
    print(result["text"])
    ``` 