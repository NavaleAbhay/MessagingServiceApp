  # MessagingServiceApp

# 🔔 Real-Time Messaging Service — Node.js + Angular

This project is a simple real-time chat application that demonstrates how to use **WebSocket communication** via **Socket.IO** with **JWT authentication**, entirely using **in-memory state**.

No databases. No storage persistence. Pure in-memory simulation of a messaging system for interview/demo purposes.

---

## 📌 Features

- ✅ REST API for **User Registration**, **OTP Verification**, and **JWT-based Login**
- ✅ WebSocket communication using **Socket.IO**
- ✅ **Message queuing** for offline users
- ✅ Auto-delivery of messages when receiver reconnects
- ✅ Frontend in Angular using `socket.io-client`
- ✅ Shared `Message` model between frontend & backend
- ✅ No database — fully **in-memory**

---

## 🧠 Architecture Overview

[ Angular Client ] <--REST--> [ Node.js API ]
| |
+--- WebSocket (Socket.IO)---+


---

## 🛠 Technology Stack

| Layer         | Tech                          |
|--------------|-------------------------------|
| Frontend      | Angular 17                    |
| Backend       | Node.js + Express             |
| Real-time     | Socket.IO                     |
| Auth          | JSON Web Token (JWT)          |
| Data Storage  | In-memory (Map, Array, etc.)  |

---

## ✅ Task Breakdown & Workflow

| Stage | Description |
|-------|-------------|
| 🔹 Environment Setup | Installed Angular CLI, Node.js, Socket.IO, Express |
| 🔹 Project Scaffolding | Created folder structures for `services`, `models`, `controllers`, etc. |
| 🔹 Auth Flow | Register → Verify OTP → Login → JWT issued |
| 🔹 WebSocket Integration | Connected client via Socket.IO using JWT |
| 🔹 In-Memory Queuing | Messages sent to offline users are queued |
| 🔹 Message Delivery | Queued messages delivered when receiver reconnects |
| 🔹 Angular Binding | Live chat UI updates via RxJS `BehaviorSubject` |

---

## 📁 Project Structure

### 📦 Node.js Backend
<details>
  <summary>
    <code>
  node-backend:
    src:
      config:
        - constants.js
      controllers:
        - auth.controller.js
      routes:
        - auth.routes.js
      services:
        - user.service.js
        - message.service.js
      helpers:
        - jwt.js
      models:
        - user.model.js
        - message.model.js
      socket:
        - websocket.js
      - server.js
    - package.json
    - .env
        </code>
    </summary>
</details>
    
### 💻 Angular Frontend

<details>
  <summary>
    <code>
        angular-messaging-app:
    src:
      app:
        components:
          chat:
            - chat.component.ts
            - chat.component.html
            - chat.component.css
        services:
          - auth.service.ts
          - websocket.service.ts
        models:
          - message.ts
        - app.module.ts
        - app.component.html
      - main.ts
    - angular.json
    - package.json
    - tsconfig.json
    </code>
    </summary>
</details>
    
---

## 🔐 Authentication Flow

1. **POST /auth/register**
   - Registers a new user (stored in memory)

2. **POST /auth/verify**
   - Simulates OTP check using hardcoded OTP `123456`

3. **POST /auth/login**
   - Issues a JWT on successful login

4. **WebSocket Connection**
   - Connects to `ws://localhost:5000` using:
     ```ts
     io('http://localhost:5000', {
       auth: { token: 'your_jwt_token' }
     })
     ```

---

## 🔄 WebSocket Flow Diagram

```mermaid
sequenceDiagram
  participant A as Angular Client
  participant B as Node Server
  participant C as Receiver Client (maybe offline)

  A->>B: Connect WebSocket (with JWT)
  B->>A: JWT Verified → Connection Established

  A->>B: Send Message { sender, receiver, text }
  alt Receiver Online
    B->>C: Deliver message via WebSocket
  else Receiver Offline
    B->>B: Queue message in memory
  end

  C->>B: Reconnect WebSocket
  B->>C: Flush queued messages
