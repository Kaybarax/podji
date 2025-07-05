# **Pocket DJ (PodJi) React Native Mobile Application UI Overview**

---

### 🏠 **1\. Home Screen (Social Feed & Discovery)**

- **Components**

  - Top navigation bar (Logo, Notification Icon, Search Icon)
  - Feed cards (trending mixes, personalized recommendations, followed DJs)
  - Bottom tab navigation (Home, Library, Mix, Profile, Chat)

- **Controls**
  - Scrollable feed (vertical)
  - Like, Comment, Share buttons
  - Pull-to-refresh interaction
  - Floating Action Button (FAB) for quick mixing or creating playlists

### 🎚️ **2\. Mixing Console Screen**

- **Components**

  - Dual Deck layout (Deck A / Deck B)
  - Waveform visualization for current and next tracks
  - Crossfader
  - Tempo/BPM Slider
  - Effects control panel (EQ, reverb, echo)
  - AI assistant panel (track suggestions, transitions)

- **Controls**
  - Play/Pause buttons (individual deck)
  - Cue point markers
  - Sync Button
  - Crossfade Slider (Gesture Handler & Animated)
  - Effects toggles (realtime application)
  - Tempo/BPM slider

### 🎧 **3\. Library & Track Search Screen**

- **Components**

  - Search input field
  - Track listing (cover art, artist, track title, duration, BPM)
  - Audio snippet preview waveform
  - Quick add button (add to queue or playlists)

- **Controls**
  - Search/filter dropdown (Artist, Genre, BPM)
  - Infinite scrolling with pagination
  - Quick-preview button (play/pause snippet)
  - Contextual action sheet (add track to playlist, queue)

### 📋 **4\. Playlist Management Screen**

- **Components**

  - Playlists listing (with thumbnails, name, track count)
  - Playlist detailed view (editable track list)
  - AI-generated playlist suggestions

- **Controls**
  - Drag-and-drop reorder functionality (Gesture Handler)
  - Edit playlist metadata (rename, description, cover image)
  - Add/Remove track buttons
  - Save and Delete buttons
  - AI-auto-generate playlist button

### 🚀 **5\. Mix Sharing & Social Publishing Screen**

- **Components**

  - Mix details (Title, Creator, Cover Art)
  - Track timeline visualization (interactive waveform)
  - Social engagement metrics (Likes, Comments, Shares)
  - Share panel (Firebase Dynamic Links integration)

- **Controls**
  - Share buttons (Social apps, copy link)
  - Like and Comment buttons
  - Edit mix details button (creator only)

### 👤 **6\. User Profile Screen**

- **Components**

  - Profile Header (Avatar, Username, Bio)
  - Social statistics (followers, following, likes)
  - Tabs for created and liked mixes

- **Controls**
  - Follow/Unfollow buttons
  - Profile editing (avatar upload, bio editing)
  - Tabbed navigation (Created, Liked)

### 💬 **7\. Chat & Messaging Screen**

- **Components**

  - Chat list (recent conversations, user avatars)
  - Messaging interface (real-time chat bubbles, timestamps)
  - Chat notifications indicators (unread badge)

- **Controls**
  - Text input box
  - Send button
  - Emoji and media attachments
  - Pull-to-refresh for messages

### 🔔 **8\. Notifications Screen**

- **Components**

  - List of actionable notifications (likes, comments, new followers)
  - Notification categories (Social, Mixes, System)

- **Controls**
  - Tap-to-view actions (navigate to relevant screens)
  - Clear/Mark as read buttons
  - Notification settings (toggle preferences)

### ⚙️ **9\. Settings Screen**

- **Components**

  - Account Settings (Profile, Authentication, Linked Accounts)
  - Subscription Management (Premium features, Billing information)
  - Audio preferences (quality, streaming options)
  - Theme selection (Dark mode, system default)

- **Controls**
  - Toggle switches (Dark Mode, Notifications)
  - Dropdown selectors (audio quality, language)
  - Editable fields for billing details
  - Save settings button

### 💳 **10\. Subscription & Billing Screen**

- **Components**

  - Subscription plan overview (Free vs. Premium)
  - Payment methods (add, remove, update)
  - Transaction history (billing dates, amounts)

- **Controls**
  - Subscribe/Upgrade/Downgrade buttons
  - Manage payment methods button
  - Cancel Subscription button
  - Receipt viewing/download options

### 🤖 **11\. AI Assistant Screen**

- **Components**

  - AI chat interface (interactive, track and transition suggestions)
  - Suggested playlists and tracks panel (AI-generated)

- **Controls**
  - Text input for queries
  - Interactive suggestion cards (accept/reject)
  - Refresh AI suggestions button

### 📈 **12\. Analytics & Insights Screen**

- **Components**

  - Visual dashboard for mix analytics (plays, likes, comments)
  - Audience insights (user demographics, listening habits)
  - Track performance analytics

- **Controls**
  - Interactive charts (tap-to-expand details)
  - Date range picker for analytics scope
  - Export analytics data button (PDF/CSV)

### 🎓 **13\. Onboarding & Tutorial Screens**

- **Components**

  - Step-by-step onboarding carousel
  - Instructional overlays for critical features
  - Embedded video tutorials (short explainer videos)

- **Controls**
  - Swipe navigation between onboarding screens
  - Skip onboarding option
  - Replay tutorials/videos button

## 🛠️ **Common UI Controls (Across All Mobile Screens)**

- **Navigation Controls**

  - Bottom Tab Navigator (Home, Library, Mix, Profile, Chat)
  - Stack navigators for nested screens
  - Hamburger/Drawer Menu (additional navigation options)

- **Interactive Components**

  - Primary and Secondary Buttons
  - Floating Action Button (FAB) for quick actions
  - Modals and Pop-ups (confirmation, forms, detailed views)
  - Toast notifications (Success, Error, Warning, Info)

- **Input Controls and Forms**

  - Text inputs (Single-line, Multiline)
  - Checkboxes, Radio buttons, Toggles (switches)
  - Sliders (Volume, Tempo, Pitch, Crossfade)
  - Dropdowns and Pickers (lists, dates)

- **Gestural Interactions**

  - Swipe-to-delete or archive
  - Long-press context menus
  - Pull-to-refresh (lists, feeds)

- **Audio/Visual Controls**
  - Custom audio playback controls (play/pause, seek bar, loop)
  - Waveform interactive visualizations (zoom, navigate)
  - Responsive animations (Reanimated)
