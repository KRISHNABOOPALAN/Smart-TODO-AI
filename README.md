# 🧠 Smart Todo List Application
AI-powered Smart Todo List Web App built with Django, Next.js, Tailwind CSS, and PostgreSQL (Supabase). Includes intelligent task suggestions, deadline predictions, and context-aware task enhancement using LM Studio .

A full-stack Todo app with AI features, built using:
- **Backend**: Django REST Framework + Supabase (PostgreSQL)
- **Frontend**: Next.js + Tailwind CSS
- **AI**: LM Studio for task enhancement

## 🚀 Features
- Task creation with AI-enhanced descriptions and deadlines
- Context input from notes, emails, WhatsApp
- Priority scoring and smart category suggestions

## 🧰 Tech Stack
| Layer     | Tech              |
|-----------|-------------------|
| Backend   | Django REST + DRF |
| Database  | Supabase PostgreSQL |
| Frontend  | Next.js + Tailwind CSS |
| AI Module | LM Studio |

## 🔧 Project Structure

```bash
├── smart_todo_frontend/     # Next.js + Tailwind CSS UI
├── smart_todo/    # Django + Drf


## ⚙️ How to Run

### Backend (Django)
```bash
cd smart_todo
python -m venv env
source env/bin/activate  # Or use env\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

### Frontend  (Next.js)
```bash
cd frontend/smart-todo-frontend
npm install
npm run dev

Open: http://localhost:3000

#### API Endpoints

Method	      URL	            Description
GET      	/api/tasks/	        List tasks
POST	    /api/tasks/	        Create task
GET	      /api/contexts/	    List context entries
POST	    /api/contexts/	    Add context entry
GET     	/api/categories/	  List task categories


## 🖼 UI Screenshots

### 📋 Dashboard View
![Dashboard](./screenshots/dashboard.png)
![Dashboard](./screenshots/dashboard-Darktheme.png)

### ✍️ Task Form
![Task Form](./screenshots/task-page.png)
![Task Edit Form](./screenshots/task-edit-page.png)

### 🧠 Context Input Page
![Context Page](./screenshots/context-page.png)

### 🤖 AI Suggestions
![AI Output](./screenshots/ai-output.png)
![AI Output](./screenshots/ai-loading.png)


### Sample Test Data
task.json-file


### Environment Variables

Backend: .env for DB credentials and API keys
Frontend: .env.local for any keys if needed

### Deployment
You can deploy using:
Backend: Render, Railway, Fly.io
Frontend: Vercel, Netlify

### License
This project was developed as part of a technical assessment for Ergosphere Solutions Pvt Ltd.
All rights reserved © 2025.


### Contact
📧 devgods99@gmail.com
🧑 Author: Krishnakumar (Full Stack Developer Candidate)


## 🧰 GitHub Setup Instructions

To clone and run this full stack Smart Todo List application locally:

---

### 1. 📦 Clone the Repository

```bash
git clone https://github.com/KRISHNABOOPALAN/Smart-TODO.git
cd Smart-TODO

