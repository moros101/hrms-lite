    # HRMS Lite

## Overview
HRMS Lite is a lightweight HR management tool to add/delete employees and mark/view daily attendance.

## Live Demo
- Frontend: https://hrms-lite-ovz0esm5p-moros101s-projects.vercel.app/
- Backend API: https://hrms-lite-production-591d.up.railway.app/api/

## Tech stack
- Frontend: React (Create React App)
- Backend: Python, Django, Django REST Framework
- Database: PostgreSQL
- Deployment: Railway (backend & DB) + Vercel/Netlify (frontend)

## Features
- Add / view / delete employees
- Mark attendance (date + status)
- View attendance per employee
- Filter attendance by date, total present days per employee, basic dashboard

## Getting started (local)
### Prereqs
- Python 3.10+
- Node.js 18+
- PostgreSQL

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# set env vars:
export POSTGRES_DB=hrms_db
export POSTGRES_USER=hrms_user
export POSTGRES_PASSWORD=supersecret
export POSTGRES_HOST=localhost
export POSTGRES_PORT=5432
export DJANGO_SECRET_KEY=changeme
python manage.py migrate
python manage.py runserver
