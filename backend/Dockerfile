FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# System dependencies
RUN apt-get update && apt-get install -y \
    build-essential gcc g++ libglib2.0-0 libgomp1 libstdc++6 libsm6 libxext6 libxrender1 curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .
RUN python -m pip install --upgrade pip \
 && python -m pip install --no-cache-dir -r requirements.txt

# Copy project code
COPY . /app

# Ensure Python can find the inner backend package
ENV PYTHONPATH=/app

EXPOSE 8000

# Default: Gunicorn for production
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
