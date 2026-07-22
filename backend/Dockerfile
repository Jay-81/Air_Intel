FROM python:3.13-slim

WORKDIR /app

RUN apt-get update && \
    apt-get install -y git git-lfs && \
    git lfs install

COPY . .

RUN git lfs pull

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]