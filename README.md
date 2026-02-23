Guarded Developer Assistant

A futuristic, professional web application that integrates OpenClaw and ArmorClaw to securely execute AI instructions on developer projects while enforcing granular security policies.

Project Overview

The Guarded Developer Assistant is designed as a secure, digital sandbox for AI-driven code modifications. Users can upload a ZIP file of their project, define policy rules via multiple-choice options (MCQs), and instruct the AI to perform actions such as refactoring, creating, or deleting files.

The system parses instructions into structured intents (OpenClaw), validates them against the ArmorClaw policy engine, and executes allowed changes while blocking unauthorized actions. All operations are logged in real-time, and the user can download the modified ZIP.

This approach ensures safe, deterministic AI execution without compromising your original files.

Tech Stack

Frontend: React (Vite), TypeScript

Styling: Tailwind CSS (Dark Cyber Security Theme)

Animations: Framer Motion for smooth, futuristic effects

Icons: HugeIcons React

File Handling: JSZip for in-browser sandboxing

AI Integration: OpenClaw + ArmorClaw

Key Features

Virtual Secure Sandbox

Realistic file operations entirely in memory

Prevents direct changes to local machine files

ArmorClaw Policy Enforcement

Allowed Folders: Restrict AI access to specific directories (e.g., src/, tests/)

Restricted Files: Protect critical files (e.g., .env, package.json)

File Type Control: Allow only certain extensions (e.g., .ts, .tsx)

Command Blocking: Prevent dangerous actions like DELETE or CREATE

OpenClaw Intent Parsing

Converts natural language commands into structured JSON for safe execution

MCQ-based Policy Selection

User-friendly interface to define permissions and constraints

Real-time Audit Logs

Step-by-step logging of allowed, blocked, and executed actions

Progress Visualization

Animated progress bars: Parsing → Validation → Enforcement → Execution

Cyber-Security Aesthetic

Dark navy theme with glassmorphism panels

Electric blue highlights, futuristic particle backgrounds

Smooth transitions, hover effects, glow animations

Downloadable Modified ZIP

After execution, the modified project ZIP is available for download

Architecture
Virtual Backend (src/lib/virtual-backend.ts)

Input: ZIP file + instruction + user-selected policy

Process:

Unzip the project into sandbox memory

OpenClaw Agent: Parses natural language instructions

ArmorClaw Engine: Validates intents against policies (folder, file, command rules)

Modify files only if allowed, block otherwise

Re-zip modified project

Output:

Execution logs (allowed/blocked actions)

Progress updates

Modified ZIP for download

Components

AIConsole: Left panel for ZIP upload, MCQ policy selection, and instruction input

ExecutionPanel: Right panel for logs, progress bars, and result visualization

Header: Branding, status, and download button

Usage

Upload Project

Drag and drop a ZIP file containing your project

Configure Policies

Select allowed folders, restricted files, file types, and blocked commands using MCQs

Type Instruction

Example: "Delete test folder" or "Create README.md"

Execute

Watch live progress bars and animated logs

Allowed actions are highlighted, blocked actions pulse red

Review & Download

Review execution logs

Download modified ZIP containing all AI-approved changes

Future Enhancements

Multi-user sessions with separate sandboxes

Integration with Telegram/Discord bot for chat-based instructions

Real-time collaboration & audit logs

AI-driven suggestions for policy rules based on project type
