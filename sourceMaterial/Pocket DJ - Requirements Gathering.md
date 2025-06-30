### **Requirements Gathering**

---

#### **Continuous Mix Builder & Playback Engine**

* **Core Audio Processing (Mobile & Web):**  
  * **Mobile:**  
    * React Native Audio API (AudioBufferSourceNode, GainNode, BiquadFilterNode)  
    * Superpowered SDK (Advanced audio mixing, tempo/pitch shifting, low-latency playback)  
    * AVFoundation (iOS) & ExoPlayer (Android) for native playback & effects  
  * **Web:**  
    * Web Audio API  
    * AudioWorklet for low-latency multi-threaded audio processing  
    * Howler.js for simplified audio control  
* **Audio Visualization:**  
  * **Mobile:**  
    * react-native-waveform  
    * react-native-svg  
  * **Web:**  
    * Wavesurfer.js  
    * Web Audio API AnalyserNode with custom visualization logic  
* **Tempo & Pitch Control:**  
  * Superpowered SDK (Mobile)  
  * AVAudioUnitTimePitch (iOS)  
  * ExoPlayer PlaybackParameters (Android)  
  * Web Audio API with playbackRate and detune manipulation (Web)  
* **Effects & Enhancements:**  
  * Superpowered SDK (filters, EQ, reverb, echo)  
  * BiquadFilterNode (Mobile/Web)  
  * Custom DSP modules

  ---

  #### **AI-Assisted Suggestions**

* **AI Platforms:**  
  * Google Genkit (cloud-based orchestration)  
  * Gemma AI (on-device or cloud-based model for real-time recommendations)  
* **Technology:**  
  * WebAssembly (for efficient in-browser AI model execution)  
  * Dedicated **AI Suggestion Service** (Cloud Run) to handle intensive tasks and integrate with AI platforms.

  ---

  #### **SoundCloud Integration & Library**

* **API & Authentication:**  
  * SoundCloud API for metadata and streaming  
  * OAuth Authentication (managed via backend)  
* **Backend Proxy:**  
  * Dedicated **Music Metadata Service** (Cloud Run) to securely manage API keys, proxy requests, and handle rate-limiting.  
  * Caching layer (Redis/Memorystore) for search results and track metadata.

  ---

  #### **Queue Management & Playlists**

* **State Management:**  
  * Zustand (Mobile & Web)  
* **UI & Interactions:**  
  * React Native Drag & Drop / Gesture Handler (Mobile)  
  * dnd-kit / react-beautiful-dnd (Web)  
* **Storage:**  
  * Firestore (managed by the **Playlist Service**) for cloud storage of user playlists and queue metadata.

  ---

  #### **Mix Sharing & Social Publishing**

* **Sharing Mechanism:**  
  * Firebase Dynamic Links (shareable metadata-only URLs)  
* **Data Storage:**  
  * Firestore (managed by the **Mix Service**) for storage of mix metadata and user interactions.  
* **Routing & UI:**  
  * React Navigation (Mobile)  
  * Next.js App Router (Web)

  ---

  #### **Social Features & Community**

* **User Engagement:**  
  * Firestore Subcollections (Likes, Comments, Followers), managed by the **User Profile Service** and **Mix Service**.  
* **Messaging:**  
  * React Native Gifted Chat (Mobile)  
  * Socket.io / TalkJS (Web)  
* **Notifications:**  
  * Firebase Cloud Messaging (both platforms), managed by the **Notification Service**.  
  * Web Push API (Web only)

  ---

  #### **User Profiles & Account Roles**

* **Authentication:**  
  * Firebase Auth (email/password, OAuth), managed by the **Auth Service**.  
* **Subscription Management:**  
  * App Store / Play Store Billing (Mobile)  
  * Web Billing Integration (Stripe \+ Firebase Functions)  
* **User Data:**  
  * Firestore (profile data, custom claims for roles), managed by the **User Profile Service**.

  ---

  ### **Technical Architecture & Infrastructure**

* **Frontend Monorepo Architecture:**  
  * Monorepo managed by **Turborepo** and **Yarn Workspaces**.  
  * **apps/ workspace:**  
    * web: The final Next.js web application.  
    * mobile: The final Expo (React Native) mobile application.  
  * **development/ workspace:**  
    * web-ui-dev: **React Vite \+ Storybook** environment for developing web UI components.  
    * mobile-ui-dev: **Expo \+ Storybook** environment for developing mobile UI components.  
  * **packages/ workspace:**  
    * @podji/web-ui: Distributable library of web components.  
    * @podji/mobile-ui: Distributable library of mobile components.  
    * @podji/design-tokens: **Style Dictionary** package to parse design tokens into SASS (web) and React Native Stylesheets (mobile).  
    * @podji/graphql-client: Shared Apollo Client configuration and GraphQL operations/types.  
    * @podji/eslint-config & @podji/tsconfig: Shared configurations for linting and TypeScript.  
* **Styling & UI Frameworks:**  
  * React Native Paper (Mobile)  
  * Tailwind CSS (Web)  
* **Animation & Gesture Handling:**  
  * Reanimated, Gesture Handler (Mobile)  
  * Framer Motion (Web)  
* **Backend Microservices Architecture:**  
  * **Design:** A distributed system of independent, single-responsibility services.  
  * **API Gateway:** A unified **GraphQL API Gateway** (Apollo Server on Cloud Run) acts as the single entry point for all clients.  
  * **Communication:** Services communicate asynchronously via **Google Pub/Sub** events (e.g., mix.created) to remain decoupled.  
  * **Division of Services:**  
    * **Auth Service (Firebase Function):** Manages Firebase Authentication and custom roles.  
    * **User Profile Service (Firebase Function):** Manages user data and social graph.  
    * **Playlist Service (Firebase Function):** Manages playlist CRUD operations.  
    * **Mix Service (Firebase Function):** Manages mix metadata and interactions.  
    * **Music Metadata Service (Cloud Run):** Proxies SoundCloud API, handles caching and rate-limiting.  
    * **AI Suggestion Service (Cloud Run):** Integrates with Google Genkit/Gemma for AI features.  
    * **Notification Service (Firebase Function):** Listens for events and sends push notifications.

  ---

  #### **Data Modeling & Firestore Schema**

* **Collections:** Users, Playlists, Tracks (cached metadata), Mixes.  
* **Subcollections:** Likes, Comments, Chats, Notifications.  
* **Ownership:** Each collection is managed by its corresponding microservice to maintain separation of concerns.

  ---

  #### **GraphQL API Design & Data Flow**

* **Schema:** Apollo Server Schema-first approach.  
* **Resolvers:** Resolvers in the API Gateway orchestrate data fetching by calling the appropriate downstream microservices. Utilizes **DataLoader** for batching requests to services within a single GraphQL operation.  
* **Authentication:** Middleware on the API Gateway verifies the Firebase JWT before routing requests.

  ---

  #### **DevOps & CI/CD**

* **Containerization:** Podman (for Cloud Run services).  
* **CI/CD Tools:** GitHub Actions, Cloud Build.  
* **Optimization:** **Turborepo Remote Caching** is leveraged in CI/CD pipelines to speed up builds and tests by avoiding re-computation of unchanged tasks.  
* **Testing:**  
  * **Unit:** Jest, React Native Testing Library.  
  * **E2E:** Cypress (Web), Detox (Mobile).  
*   
* **Monitoring:** Sentry, Firebase Crashlytics.  
* **Analytics:** Firebase Analytics.

  ---

  #### **Security & Compliance**

* **Access Control:** Firebase Authentication & Firestore Security Rules, with JWT verification at the API Gateway.  
* **API Security:** Rate limiting and key management handled within the Music Metadata Service.  
* **Compliance:** GDPR-compliant data handling; no persistent storage of copyrighted audio streams.

  ---

  #### **Roadmap & Future Enhancements**

* WebRTC for group chat and collaborative real-time mixing.  
* On-device audio analysis (BPM/key).  
* Plugin/SDK support for third-party effects and themes.  
* Full web parity with desktop-first enhancements (e.g., bulk track editing, multi-window workflows).

