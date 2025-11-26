# Scalable Media Transcoder

A full-stack distributed system for video processing.

## Structure
- **/backend**: NestJS + BullMQ + Redis (The API & Worker)
- **/frontend**: Next.js + TailwindCSS (The UI)

## How to Run
1. Start Redis: `docker run -d -p 6379:6379 redis`
2. Backend: `cd backend && npm run start:dev`
3. Frontend: `cd frontend && npm run dev`