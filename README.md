# ✈️ Wonderlust 

> **A high-performance, Server-Side Rendered (SSR) public accommodations marketplace built on the MEN Stack.**

Unlike traditional Single Page Applications (SPAs) that serve empty DOM nodes to web crawlers, Wonderlust utilizes **EJS** to compile fully populated HTML on the server. This architectural decision guarantees immediate **Search Engine Optimization (SEO)** indexing for public property listings while maintaining a dynamic, stateful user experience.

---

## 🏗️ System Architecture & Highlights

* **Fail-Fast Request Interception:** Implemented strict server-side validation using **Joi** inside custom Express middleware to intercept and map malformed payloads before initiating round-trip network calls to the database.
* **Streamed Media Pipeline:** Intercepts `multipart/form-data` via **Multer**, buffering and streaming raw image binaries directly to **Cloudinary** cloud storage to preserve MongoDB's 16MB document size limit.
* **Automated Data Sanitization:** Bound a Mongoose `post('findOneAndDelete')` lifecycle hook to the Listing schema to automatically cascade-delete orphaned reviews, preventing long-term database storage bloat.
* **Multi-Tenant Data Isolation:** Enforces strict Route Authorization via middleware that casts and verifies entity ownership against `res.locals.currUser._id` using byte-level `ObjectId.equals()` evaluations.
* **Stateful Deep-Linking:** Employs session-persisted target URL tracking (`saveRedirectUrl`) to safely return unauthenticated users to their exact pre-login intent after Passport.js session regeneration.

---

## 🛠️ Technical Stack Matrix

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Backend Core** | Node.js, Express.js | RESTful API routing and HTTP server orchestration |
| **Database & ODM** | MongoDB Atlas, Mongoose | Normalized BSON data persistence and Schema modeling |
| **Session Store** | `connect-mongo`, `express-session` | Persistent, encrypted session storage inside Mongo |
| **View Layer** | EJS, `ejs-mate` | Layout wrapping and server-side markup generation |
| **Auth & Security**| Passport.js (Local), PBKDF2 | Decoupled authentication and secure password salting |
| **Data Gatekeepers**| Joi, `method-override` | Pre-flight payload validation & REST verb translation |
| **Media & Polish** | Cloudinary, Multer, Flash | Auto-scaling image delivery and stateless UI Toast flags |

---

## 🚀 Local Setup & Installation

### 1. Prerequisites
Ensure you have **Node.js (v18+)** and a **MongoDB Atlas Cluster** (or local Mongo instance) running.

### 2. Clone the Repository
```bash
git clone [https://github.com/erabdulbasit/Wonderlust.git](https://github.com/erabdulbasit/Wonderlust.git)
cd Wonderlust

3. Install Dependencies
Bash

npm install

4. Environment Configuration

Create a .env file in the root directory and supply the following key-value pairs:
Plaintext

PORT=8080
MONGO_URL=mongodb+srv://<your_user>:<your_password>@cluster0...
SECRET=your_super_secret_session_encryption_key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

5. Execute the Server
Bash

node app.js

The application will bind to http://localhost:8080.
