# Guarded Developer Assistant

A professional, digital AI control dashboard web application that enforces security policies on AI-generated code modifications.

## Project Overview

This application serves as a secure sandbox for executing AI instructions on developer projects. It allows users to upload a ZIP file of their codebase, define granular security policies via MCQ (Multiple Choice Questions), and execute instructions (e.g., "Refactor auth", "Delete test folder"). The system parses the intent, validates it against the policies using the **ArmorClaw** engine, and either executes the changes or blocks them, providing a detailed audit log.

## Tech Stack

- **Frontend**: React (Vite), TypeScript
- **Styling**: Tailwind CSS (Custom "Cyber Security" Theme)
- **Animations**: Framer Motion
- **Icons**: HugeIcons React
- **File Processing**: JSZip (Client-side Virtual Sandbox)

## Key Features

- **Virtual Secure Sandbox**: Performs "real" file system operations (create, modify, delete) on uploaded ZIP files entirely within the browser memory.
- **ArmorClaw Policy Engine**: 
    - **Allowed Folders**: Restrict AI access to specific directories (e.g., `src`, `tests`).
    - **Restricted Files**: Block modification of critical files (e.g., `.env`, `package.json`).
    - **File Type Control**: Whitelist allowed extensions (e.g., `.ts`, `.tsx` only).
    - **Command Blocking**: Prevent specific actions like `DELETE` or `CREATE`.
- **OpenClaw Intent Parsing**: Simulates an AI agent parsing natural language instructions into structured JSON intents.
- **Real-time Audit Logs**: Displays a scrolling console of system events, policy checks, and execution steps.
- **Progress Visualization**: Step-by-step progress bars showing the execution pipeline (Parsing -> Validating -> Enforcement -> Execution).
- **Cyber-Security Aesthetic**: Dark navy theme, glassmorphism, electric blue accents, and professional data visualization components.

## Architecture

### Virtual Backend (`src/lib/virtual-backend.ts`)
Instead of a remote server, the application uses a "Serverless" approach where the backend logic runs in the browser:
1. **Input**: ZIP File + Instruction + Policy.
2. **Process**:
   - Unzips the file into memory.
   - **OpenClaw**: Parses the instruction (heuristic-based mock agent).
   - **ArmorClaw**: Validates the intent against the active policy (File paths, types, commands).
   - Modifies the file structure if allowed.
   - Re-zips the result.
3. **Output**: Execution Result (Status, Logs, Modified ZIP).

### Components
- **AIConsole**: Left panel for inputs and configuration (MCQ Policy Settings).
- **ExecutionPanel**: Right panel for visualization, logs, and progress tracking.
- **Header**: Application branding and status.

## Usage

1. **Upload**: Drag and drop a ZIP file of your project.
2. **Configure**: Use the MCQ settings to select allowed folders, restricted files, and blocked commands.
3. **Instruct**: Type a command like "Delete test folder" or "Create README.md".
4. **Execute**: Watch the system parse, validate, and execute with real-time progress bars.
5. **Review**: Check the "Allowed/Blocked" status and download the modified ZIP if successful.
