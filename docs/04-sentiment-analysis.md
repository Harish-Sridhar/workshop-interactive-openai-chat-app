# Hugging face sentiment analysis

[Sentiment analysis](https://huggingface.co/blog/sentiment-analysis-python) is the automated process of tagging data according to their sentiment, such as positive, negative and neutral. 

# Installation

Note: Skip this part if you completed instructions in `01-setting-up.md`.

* create venv.
    
    # check if python version is 3.9.9
    python --version 
    # create venv
    python3 -m venv .venv

* install requirements

    source .venv/bin/activate
    pip install transformers

# perform sentiment analysis

create a python file `test_sentiment_analysis.py` and use the following code.

    from transformers import pipeline
    sentiment_pipeline = pipeline("sentiment-analysis")
    data = ["I love you", "I hate you"]
    sentiment_pipeline(data)
