# ---------- Base image ----------
    FROM python:3.11-slim

    # ---------- Working directory ----------
    WORKDIR /app
    
    # ---------- Install system dependencies ----------
    RUN apt-get update && apt-get install -y build-essential libpq-dev && rm -rf /var/lib/apt/lists/*
    
    # ---------- Copy requirements ----------
    COPY requirements.txt .
    
    # ---------- Install Python dependencies ----------
    RUN pip install --no-cache-dir -r requirements.txt gunicorn
    
    # ---------- Copy project ----------
    COPY . .
    
    # ---------- Environment variables ----------
    ENV PYTHONUNBUFFERED=1
    ENV DJANGO_SETTINGS_MODULE=hrms.settings
    ENV PORT=8000
    
    # ---------- Run commands ----------
    CMD ["gunicorn", "hrms.wsgi:application", "--bind", "0.0.0.0:8000"]
    