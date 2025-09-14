# Cross-Lingual Text Summarization 
This project provides a cross-lingual text summarization system that leverages a pre-trained model from the Hugging Face Model Hub to condense text written in any language and produce a summary in a selected target language. It includes a FastAPI backend, a React-based frontend, and an NGINX server to manage multiple simultaneous requests. The entire application is containerized with Docker and orchestrated using Docker Compose.

# Why This Model?

Model: ```google/flan-t5-base```

* Performance: google/flan-t5-base is a fine-tuned sequence-to-sequence model capable of understanding and generating text across multiple languages. It is well-suited for summarization tasks where both input and output can vary by language.

* Pre-trained & Ready-to-Deploy: Available directly from the Hugging Face Model Hub, the model is pre-trained for generative tasks, enabling fast setup and minimal configuration effort.

* Multilingual Flexibility: Unlike monolingual summarizers, this model supports summarizing text written in one language and producing the summary in another, making it adaptable to global use cases.

* Robustness: Handles a wide range of languages and content types, ensuring summaries remain coherent and contextually meaningful.

* Motivation: In a multilingual world, users often face long texts in unfamiliar languages. This system delivers concise summaries in the user’s chosen language, bridging gaps in comprehension and saving valuable time.

# Prerequisites

* Docker and Docker Compose installed

* Python 3.10+ (for running backend or testing locally)

* Node.js 18+ (for local frontend development, optional)

* ```google/flan-t5-base``` model, downloaded through a dedicated notebook in ```./backend/app/model-downloading.ipynb```.  The model is not included in the repository due to its large size (~1GB) and must be downloaded separately before running the application.


# Setup Instructions
* Build and Run with Docker Compose: ```docker-compose up --build```

* Nginx is configured on port 80 as follows:
    - Serves React static files from /usr/share/nginx/html.
    - Internally forwards API requests (/api) to the backend service running on port 8000.

# Access the Application

* Open http://localhost in a browser to use the React frontend.

* Send API requests to http://localhost/summarize for direct backend access.

# Usage

### Frontend

* Enter the input text in any language.
* Choose the output language from the dropdown list.
* Set the desired summary length (default: 100 words).
* Click Summarize or press Enter.
* View the generated cross-lingual summary below the input form.
* Use Clear to reset the form.

## API

* Endpoint: POST /summarize

# Notebooks

* ```backend/app/download_model.ipynb``` → Responsible for downloading and saving the Hugging Face model before runtime.

* ```notebook/``` → Contains test notebooks for experimenting with the model and verifying summarization quality.

# Project Files

* Backend: FastAPI app that loads the ```google/flan-t5-base``` model and exposes a ```/summarize``` endpoint.
    * ```backend/app/main.py```: Defines the summarization API.
    * ```backend/app/download_model.ipynb```: Notebook to download and cache the model.
    * ```backend/Dockerfile```: Backend container configuration.
    * ```backend/requirements.txt```: Python dependencies.

* NGINX: Acts as a reverse proxy for concurrent requests.
    * ```backend/nginx.conf```: NGINX config.
    * ```backend/Dockerfile.nginx```: Docker build for NGINX.

* Frontend: React-based user interface for interacting with the summarization service.
    * ```frontend/src/App.js```: Main React app.
    * ```frontend/Dockerfile```: Frontend container configuration.

* Docker Compose:
    * ```docker-compose.yml```: Orchestrates backend, frontend, and NGINX containers.

* Notebooks:
    * ```notebook/```: Test notebooks demonstrating how to interact with the summarization model directly.


# Scaling and Performance

* NGINX: Configured with worker_processes auto and worker_connections 1024 to efficiently handle parallel requests.

* Gunicorn: Runs the FastAPI backend with 4 workers (-w 4) using Uvicorn workers for async processing.

* Model Inference: The google/flan-t5-base model is loaded once at startup to minimize latency. FastAPI’s async features ensure non-blocking requests and improved concurrency.