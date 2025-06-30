# **Pocket DJ (PodJi) – Software Product Specification**

---

![][image1]

# **1\. Introduction & Vision**

## **1.1 Project Overview** 

Pocket DJ (PodJi) is a cross-platform mobile application, compatible with Android and iOS, which aims to make digital DJing accessible to a wider audience by facilitating real-time mixing of music sourced from SoundCloud, and potentially other platforms in future iterations. Utilizing a contemporary technology stack that includes React, React Native, NextJs, Firebase, GraphQL, and Google’s Genkit & Gemma AI, the application provides an intuitive yet sophisticated interface for manual and AI-driven mixing, playlist composition, and social dissemination of personalized mixes. The primary objective of PodJi is to empower casual music enthusiasts with professional-grade DJ tools on their mobile devices, and also on the web, enabling them to curate bespoke DJed playlists. This initiative was conceived based on the personal experience of desiring seamless playback of a running music playlist, which necessitated the use of pre-made DJed playlists, and the aspiration to create customized versions thereof.

## **1.2 Key Objectives** 

* Deliver low‑latency, gapless playback of two simultaneous audio streams. 

* Provide comprehensive manual controls (play, pause, cue, crossfader, tempo/pitch, effects). Integrate AI‑powered auto‑mix and next‑track suggestions. 

* Enable mix recording, saving, and social sharing via dynamic links. 

* Foster community through feeds, follows, and DJed playlists shares. 

* Support tiered feature access with Free vs. Premium account roles.

* Ensure parity across mobile and web clients.

# **2\. Feature Overview & Functional Modules**

## **2.1 Continuous Mix Builder & Playback Engine**

**Two-Track Mix Workflow:** 

Users start with two tracks—the “Current Track” and the “Next Track”—played concurrently for seamless blending. Upon transition, the “Next Track” becomes the “Current Track,” and a new track is selected or queued as the “Next Track,” maintaining at most two active streams.

**Mix Construction**:

* **Transition Points**: Users set or rely on AI-suggested transition timestamps (e.g., downbeat, chorus end).

* **Mix Metadata**: Each mix session constructs a sequential metadata record capturing track order, transition timestamps, crossfade durations, tempo adjustments, and applied effects.

* **Audio Rendering**: Optionally, users can record the live mix output into a continuous audio file stored locally; metadata remains primary for sharing to comply with streaming service policies. 

**Playback of Completed Mixes**:

* **Metadata-Driven Playback**: On playback, the app reconstructs the mix using the saved metadata, streaming original tracks and applying stored transition parameters (crossfades, tempo changes, effects) in real-time for a seamless experience.

* **Audio File Playback**: If an audio file was recorded, the app plays the consolidated file directly, bypassing real-time track loading.

**Waveform & Timeline Visualization**: A unified timeline displays the entire mix’s waveform or metadata markers, allowing users to navigate, preview segments, and adjust transition points post-recording.

**Tempo & Pitch Control**: Global BPM adjustment for the entire mix or per-track basis, with optional harmonic pitch shifting during both building and playback phases.

**Effects & Enhancements**:

* **Smart Effects Application**: Apply filters, EQ, reverb, or echo globally or at individual transition points, recorded in metadata.

* **AI-Assisted Suggestions**: Genkit-powered analysis for optimal transition placement and effect recommendations based on track features (BPM, key, energy).

**Auto-Build Mode (AI)**: Users choose a series of tracks or a playlist; AI automatically schedules transitions, builds metadata, and optionally records the mix, producing a complete mix asset with minimal manual input.

## **2.2 SoundCloud Integration & Library**

**Authentication & OAuth:** SoundCloud login for full‑length streaming (Go+ required), with account detection and upgrade prompts.

**Search & Metadata**: Query SoundCloud API by title, artist, genre, tags; display track duration and artwork.

**Streaming**: Retrieve HLS/MP3 stream URLs via backend Music Metadata Service; handle URL refresh and client‑side buffering for gapless play.

**Rate**~~‑~~**Limit Compliance**: Cache search results and metadata, respect API quotas.

## **2.3 Queue Management & Playlists**

**Live Queue**: Dynamic “Up Next” panel accessible via swipe; drag‑and‑drop reordering; real‑time updates.

**Playlists (Mixes)**: 

* **Manual creation:** Curate ordered track lists without mixing.

* **Save current mix:** Capture track sequence and optional transition timestamps.

**Library Screen**: List of saved playlists with thumbnails; detail view lists tracks, allows play/recreate mix, edit (rename, add/remove tracks, reorder), and delete.

## **2.4 Mix Sharing & Social Publishing**

**Dynamic Links:** Generate Firebase Dynamic Links encoding Mix metadata (track IDs, order, timestamps). No audio file transfer; playback streams from SoundCloud.

**Mix Detail Page**: Displays title, creator, description, track list with timestamps, like/comment counts; play button; owner edit/delete options.

## **2.5 Social Features & Community**

**Home Feed:** Personalized feed of new mixes from followed DJs, trending mixes, and community highlights.

**Following & Followers:** Follow/unfollow users; follower/following counts; discover top DJs.

**Likes & Comments:** Upvote mixes; comment threads per mix; notifications of new likes/comments.

**Chat:** One‑to‑one messaging with push notifications; chats list and conversation screens.

**Notifications:** Push via Firebase Cloud Messaging for follows, likes, comments, and messages.

## **2.6 User Profiles & Account Roles**

**Profile Page**: Display name, avatar, bio, stats (followers, following, total likes), tabs for own mixes and liked mixes.

**Authentication**: Firebase Auth (email/password, OAuth); user ID maps to Firestore document; token‑based auth in GraphQL.

**Free vs. Premium**:

* **Free**: Standard audio quality (128–160 kbps), ads (AdMob/Firebase), mix/save limits (e.g., max playlists, recording length), basic effects & auto‑mix.

* **Premium**: High‑quality streaming (320 kbps), ad‑free, unlimited saves, full effects suite, advanced AI mix suggestions, priority feature access.

**Subscription Flow**: In‑app purchases (monthly/yearly); App Store/Play Store billing integration; backend receipt verification via Cloud Functions; update Firebase Auth custom claims or Firestore flag; periodic status checks and downgrade handling.

## **2.7 AI-Assisted DJ Features**

**Automated Mixing:** Genkit (cloud) and on‑device Gemma 3 LLM analyze BPM, key, waveform energy to select optimal transition points, adjust tempo, and execute crossfades.

**Next Track Suggestions**: AI recommends compatible tracks based on current deck context and user SoundCloud data; interactive chat tips (e.g., “Fade after the chorus for smooth blend”).

**Model Integration (On-device AI)**: Firebase Genkit SDK orchestrates calls to Google Cloud AI (Gemma/Vertex AI); swappable models for future enhancements.

# **3\. Technical Architecture & Infrastructure**

## **3.1 Frontend Monorepo Architecture**

The web and mobile frontends will be developed within a unified monorepo managed by **Turborepo** and **Yarn Workspaces**. This approach maximizes code sharing, streamlines dependency management, and simplifies cross-platform development.

The monorepo will be organized into distinct workspaces:

* **apps/**: Contains the final, user-facing applications.

  * web: The primary Next.js web application that consumes the @podji/web-ui library.

  * mobile: The primary Expo (React Native) mobile application that consumes the @podji/mobile-ui library. A modular codebase with independent microfrontends for Mixing Console, Search, Playlist Manager, Social Feed, Profile, and Settings, orchestrated via Re.Pack Module Federation.

* **development/**: A dedicated workspace for isolated UI component development.

  * web-ui-dev: An environment using **React Vite \+ Storybook** for building and testing all web UI components in isolation before they are packaged.

  * mobile-ui-dev: An environment using **Expo \+ Storybook** for building and testing all mobile UI components in isolation before they are packaged.

* **packages/**: Contains all shared and distributable libraries.

  * @podji/web-ui: A distributable UI library that packages and exports components from the development/web-ui-dev environment for consumption by the main web app.

  * @podji/mobile-ui: A distributable UI library that packages and exports components from the development/mobile-ui-dev environment for consumption by the main mobile app.

  * @podji/design-tokens: A dedicated package using **Style Dictionary** to parse theme and style definitions. It compiles and exports:

    * SASS variables and mixins for the web platform.

    * A React Native Stylesheet object and theme provider for the mobile platform.

  * @podji/graphql-client: A shared package containing the Apollo Client configuration, all GraphQL queries, mutations, subscriptions, and auto-generated TypeScript types (from the API gateway's schema) for type-safe data fetching.

  * @podji/eslint-config: A shared ESLint configuration to enforce consistent coding standards across the entire monorepo.

  * @podji/tsconfig: Shared base TypeScript configurations used by all other packages.

## **3.2 Backend Microservices Architecture (Firebase & GCP)**

The backend is designed as a distributed system of microservices running on Google Cloud Platform (GCP), primarily using Firebase Functions for event-driven services and Google Cloud Run for containerized, long-running workloads.

* **API Gateway & Service Communication**:

  * **GraphQL API Gateway**: A single, unified GraphQL endpoint built with **Apollo Server** and running on **Google Cloud Run**. It is the sole entry point for all frontend clients, responsible for authenticating requests, routing them to the appropriate downstream microservice, and aggregating data.

  * **Inter-Service Communication**: **Google Pub/Sub** is used for asynchronous, event-driven communication between services to ensure they are decoupled and independently scalable. Direct HTTPS calls are used for synchronous internal requests where necessary.

* **Division of Microservices**:

  * **Auth Service (Firebase Function)**: Manages user authentication, and custom token claims via Firebase Authentication.

  * **User Profile Service (Firebase Function)**: Manages user data and social graph (followers/following).

  * **Playlist Service (Firebase Function)**: Provides CRUD functionality for user playlists.

  * **Mix Service (Firebase Function)**: Manages mix metadata and social interactions (likes, comments).

  * **Music Metadata Service (Cloud Run)**: A secure proxy to the SoundCloud API, handling caching and rate-limiting.

  * **AI Suggestion Service (Cloud Run)**: A containerized service for intensive AI tasks, integrating with Google Genkit and Gemma.

  * **Notification Service (Firebase Function)**: Subscribes to events via Pub/Sub to send notifications using FCM.

## **3.3 Core Technologies & Implementation Details**

* **State Management**: **Zustand** for lightweight, global UI state management across both mobile and web.

* **Data Fetching**: **React Query (TanStack Query)** for managing GraphQL/REST calls with robust caching, background refresh, and loading/error state handling.

* **Mobile Specifics**:

  * **Audio**: A hybrid approach using the **React Native Audio API** for basic controls and the **Superpowered SDK** for low-latency, high-performance mixing, tempo/pitch shifting, and effects. **AVFoundation (iOS)** & **ExoPlayer (Android)** are used for native playback.

  * **UI & Gestures**: **React Native Paper** for the component system, with **Reanimated** and **Gesture Handler** for smooth animations and complex interactions like drag-and-drop.

* **Web Specifics**:

  * **Audio**: **Web Audio API** and **AudioWorklet** for low-latency, multi-threaded audio processing.

  * **UI & Visualization**: **Tailwind CSS** for styling, **Framer Motion** for animations, **Wavesurfer.js** for waveform visualization, and **dnd-kit** for drag-and-drop.

  * **Chat/Real-time:** Socket.io or TalkJS (***uncommitted: under future roadmap***).

  * **Notifications:** Firebase Cloud Messaging, Web Push API.

  * **AI Integration:** Genkit, Gemma AI via GraphQL & WebAssembly.

  * **UI/Styling:** SASS, Framer Motion.

  * **PWA Support:** Next.js PWA plugin.

  * **Microfrontend Event Bus**: Shared lightweight event emitter for cross‑MFE events (TRACK\_LOADED, PLAYLIST\_UPDATED, etc.).

## **3.4 Data Modeling & Firestore Schema**

* **Users**: { userId: UID, username, email, createdAt, preferences: { audioQuality } }

* **Playlists**: { playlistId, userId, name, description, trackIds: \[\], createdAt, updatedAt }

* **Tracks (Cache)**: { trackId, title, artist, duration, artworkUrl, bpm?, key?, lastFetched }

* **Mixes**: { mixId, userId, name, description, duration, storagePath, createdAt, tracklist: \[{ trackId, startTime, endTime }\] }

* **Relationships**: Separate collections/subcollections for Follows, Likes, Comments, Chats, and Notifications to optimize query patterns and ensure scalability. Each microservice is the designated owner of its relevant collection(s).

## **3.5 GraphQL API Design & Data Flow**

**Schema Definition** 

* **Schema‑first approach:** maintain .graphql files with type definitions and directives.

* **Core types:** User, Playlist, Track, Mix, Comment, Like, Notification, Chat, plus root types Query, Mutation, Subscription.

**Queries** 

getUser(userId: ID\!): User 

searchTracks(query: String\!, limit: Int): \[Track\] 

getPlaylist(playlistId: ID\!): Playlist 

getMix(mixId: ID\!): Mix 

feed(userId: ID\!, filter: FeedFilter): \[Mix\]

**Mutations** 

createUser(input: CreateUserInput\!): User 

updateUser(input: UpdateUserInput\!): User 

followUser(targetId: ID\!): FollowResponse 

createPlaylist(input: CreatePlaylistInput\!): Playlist 

addTrackToPlaylist(playlistId: ID\!, trackId: ID\!): Playlist 

recordMix(input: RecordMixInput\!): Mix 

likeMix(mixId: ID\!): LikeResponse 

commentOnMix(input: CommentInput\!): Comment

**Subscriptions**

Real-time updates (e.g., onNewComment) are handled via WebSocket connections managed by Apollo Server, using Google Pub/Sub as the broadcasting mechanism to link the distributed services.

onNewComment(mixId: ID\!): Comment 

onLike(mixId: ID\!): Like 

onMessage(chatId: ID\!): ChatMessage 

onFollow(userId: ID\!): FollowNotification

**Resolver Layer**

* Resolvers within the API Gateway orchestrate data fetches by calling the appropriate downstream microservices (e.g., the getUser query calls the User Profile Service). 

* Field resolvers utilize **DataLoader** for batching and caching calls within a single request.

**Authentication & Authorization**

* Middleware in the API Gateway verifies the Firebase JWT on every request, and populates context.userId and context.roles. 

* Resolver guards enforce user-scoped access and role-based permissions before forwarding requests to microservices.

**Request Lifecycle & Data Flow**

1. Client (Apollo Client) issues GraphQL operation with auth token.

2. API Gateway verifies token (admin.auth().verifyIdToken), constructs context.

3. Resolvers orchestrate data fetches: Firestore, caching layer, AI services.

4. For mutations, Cloud Functions and Pub/Sub events trigger side‑effects (e.g., feed updates, notifications).

5. Subscriptions maintain WebSocket connections via Apollo Server Pub/Sub adapter over Cloud Run, using Google Pub/Sub for broadcast.

6. Response is returned; Apollo Client normalizes and caches results locally.

**Performance & Caching**

* Persisted queries and Automatic Persisted Queries (APQ) reduce payload size.

* Server‑side LRU cache for frequently invoked queries.

* CDN caching for introspection and persisted query layers.

## **3.6 DevOps & CI/CD**

* **Containerization**: **Podman** for building lightweight, secure containers for Cloud Run services.

* **Pipelines**: **GitHub Actions** for frontend and backend CI/CD pipelines, including automated testing, linting, and type-checking. Cloud Build will be triggered for deployments to Cloud Run.

* **Testing**:

  * **Unit**: Jest & React Native Testing Library.

  * **Integration**: Jest with mocks for GraphQL and microservice interactions.

  * **E2E**: **Detox** for mobile UI flows; **Cypress** for web UI flows.

* **Monitoring**: Cloud Logging for backend services; **Sentry** or **Firebase Crashlytics** for client-side error reporting; Firebase Analytics for usage insights.

* **Monorepo Optimization**: **Turborepo's** remote caching will be utilized to speed up builds and tests across the CI/CD pipeline.

# 

# **4\. Security & Compliance**

**Authentication**

Secure authentication is enforced via Firebase Auth, with ID Tokens verified at the API Gateway before any backend service is accessed.

**Authorization**

The GraphQL gateway and Firestore Security Rules work in tandem to enforce strict, user-scoped data access, ensuring users can only access their own data.

**API Rate Limits**

The Music Metadata Service implements caching and intelligent backoff strategies to respect SoundCloud's API policies.

**Data Privacy**

No copyrighted audio is stored persistently on servers. All user data is handled in compliance with GDPR and other relevant regional data protection laws.

# **5\. Roadmap & Future Enhancements**

**Group Chat & Live Session Chat**

Expand real-time messaging capabilities for live mix events.

**Advanced Audio Analysis**

Implement on-device BPM and key detection to reduce reliance on external metadata.

**Collaborative Mixing**

Develop real-time, multi-user co-DJing sessions using WebRTC.

**Plugin/SDK**

Create a system to allow third-party developers to build custom effects and themes.

[image1]: <data:image/png;base64,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>