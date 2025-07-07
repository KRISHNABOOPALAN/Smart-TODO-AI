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

### ✍️ Task Form
![Task Form](./screenshots/task-form.png)

### 🧠 Context Input Page
![Context Page](./screenshots/context-page.png)

### 🤖 AI Suggestions
![AI Output](./screenshots/ai-output.png)


### Sample Test Data

[
  {
    "model": "todo.category",
    "pk": 1,
    "fields": {
      "name": "Work",
      "usage_frequency": 5
    }
  },
  {
    "model": "todo.category",
    "pk": 2,
    "fields": {
      "name": "Personal",
      "usage_frequency": 3
    }
  },
  {
    "model": "todo.contextentry",
    "pk": 1,
    "fields": {
      "content": "Team meeting scheduled for Monday at 10 AM",
      "source": "email",
      "timestamp": "2025-07-06T10:00:00Z",
      "insights": {
        "keywords": ["meeting", "team", "monday"],
        "sentiment": "neutral"
      }
    }
  },
  {
    "model": "todo.contextentry",
    "pk": 2,
    "fields": {
      "content": "Remember to buy groceries and pay the electricity bill",
      "source": "note",
      "timestamp": "2025-07-06T11:00:00Z",
      "insights": {
        "keywords": ["groceries", "bill"],
        "sentiment": "urgent"
      }
    }
  },
  {
    "model": "todo.task",
    "pk": 1,
    "fields": {
      "title": "Prepare meeting slides",
      "description": "Slides for Monday’s team meeting",
      "category": 1,
      "priority_score": 8.5,
      "deadline": "2025-07-08T08:00:00Z",
      "status": "pending",
      "created_at": "2025-07-06T09:00:00Z",
      "updated_at": "2025-07-06T09:00:00Z"
    }
  },
  {
    "model": "todo.task",
    "pk": 2,
    "fields": {
      "title": "Pay electricity bill",
      "description": "Before the due date: July 9",
      "category": 2,
      "priority_score": 7.2,
      "deadline": "2025-07-09T23:59:00Z",
      "status": "pending",
      "created_at": "2025-07-06T09:30:00Z",
      "updated_at": "2025-07-06T09:30:00Z"
    }
  }
]


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
