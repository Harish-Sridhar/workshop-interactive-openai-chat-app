# Opennai Chatgpt

[Openai](https://platform.openai.com/docs/introduction) offers various ai models which can be used for different purposes. Chatgpt is one such model that can interact in a conversation.


# Installation,

Note: Skip this part if you completed instructions in `01-setting-up.md`.

* create venv.
    
    # check if python version is 3.9.9
    python --version 
    # create venv
    python3 -m venv .venv

* install requirements

    source .venv/bin/activate
    pip install openai

# openai api key

The openai api key is needed to interact with openai models.  
create an account in openai.  
Login to your account, create api key.  
Save the api key as environment variable `OPENAI_API_KEY`.


# interact with chatgpt.

create a python file `test_chatgpt.py` and use the following code.

    ```
    import openai
    import os

    openai.api_key = os.environ["OPENAI_API_KEY"]
    OPENAI_MODEL_ENGINE = "text-curie-001"

    prompt = "What are the seven wonders of the world?"

    completion = openai.Completion.create(engine=OPENAI_MODEL_ENGINE, prompt=prompt, max_tokens=2000)

    ``` 

Note: 
`text-curie-001` is one of the gpt3 models that is economical and faster compared to `da-vinci` but also less accurate.

`max_tokens` determines how many tokens are returned by chatgpt.

Look at the [api doc](https://platform.openai.com/docs/api-reference/completions) to understand how to use the completion further. 