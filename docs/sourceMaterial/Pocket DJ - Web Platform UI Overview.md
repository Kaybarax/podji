# **Pocket DJ (PodJi) Web Platform UI Overview**

---

### **🌟 1\. Landing Page / Home Feed**

**Components**

- Navbar (Logo, Navigation Links, Search Bar, Profile Icon)
- Feed Sections (Trending Mixes, Recently Played, Recommended)
- Mix Cards (Thumbnail, Title, Artist, Play Button, Like, Comment Count)

**Controls**

- Search Input (autocomplete-enabled)
- Filter Tabs (Trending, Recent, Followed)
- Infinite Scroll / Pagination Controls
- Interactive Mix Cards (Like, Play, Comment, Share)

### **🎛️ 2\. Mixing Console Screen**

**Components**

- Dual Deck UI (Deck A and Deck B)
- Waveform Visualizer (Wavesurfer.js)
- Crossfader Control
- BPM (Tempo) Slider
- Effects Panel (EQ, Reverb, Echo, Filter)
- AI Assistant Panel (track recommendations, transitions)

**Controls**

- Play, Pause, Cue, Sync Buttons
- BPM and Crossfader Sliders
- Track Selection Dropdowns
- Effect Toggles and Sliders
- AI Suggestions Toggle

### **🎵 3\. Track Search & Library Screen**

**Components**

- Search Bar with Filter Options (Genre, BPM, Artist, Duration)
- Track Table (Title, Artist, BPM, Key, Duration)
- Preview Playback Waveform
- Album Artwork/Thumbnail Display

**Controls**

- Autocomplete Search Input
- Sortable Columns (Title, BPM, Key, Duration)
- Play/Preview Buttons
- Pagination Controls

###

### **📁 4\. Playlist Management Screen**

**Components**

- Playlist Sidebar (My Playlists, Created, Favorites)
- Playlist Detail View (Track List, Title, Description, Cover Art)
- Mix Creation Panel (Drag-and-Drop Interface)

**Controls**

- Track Arrangement via dnd-kit
- Add/Remove/Edit Track Buttons
- Playlist Metadata Editor
- Save/Delete Playlist Buttons

### **📢 5\. Mix Sharing & Social Feed Screen**

**Components**

- Mix Detail Card (Cover Image, Description, Creator)
- Comments Section (Threaded Replies)
- Interaction Panel (Likes, Shares, Comments)
- Firebase Dynamic Link Generation Panel

**Controls**

- Comment Input \+ Submit Button
- Like/Share Buttons
- Copy Link to Clipboard Button
- Link Preview Modal

### **🫅 6\. User Profile Screen**

**Components**

- Profile Header (Avatar, Username, Bio, Follower Stats)
- Mix Tabs (Created, Liked, Saved)
- Recent Activity Feed

**Controls**

- Follow/Unfollow Toggle
- Profile Edit Modal (Avatar, Username, Bio)
- Tab Navigation (Mix Categories)

### **💬 7\. Chat & Messaging Screen**

**Components**

- Chat Sidebar (Conversations List)
- Real-Time Messaging View
- Notifications/Message Preview Panel

**Controls**

- Message Input \+ Emoji Picker
- Send Button
- Start New Conversation Button
- Socket.io Integration

### **🔔 8\. Notifications Screen**

**Components**

- Notification List (Follows, Likes, Comments, DMs)
- Actionable Notifications (Follow Back, Reply, View Mix)

**Controls**

- Mark As Read / Clear All Buttons
- Notification Type Filters (Unread, Social, System)

### **⚙️ 9\. Settings Screen**

**Components**

- Account Settings Panel (Email, Password, Linked Accounts)
- Audio Settings (Streaming Quality, Playback Preferences)
- UI Settings (Theme Toggle, Accessibility)
- Notification Preferences

**Controls**

- Toggle Switches (Dark Mode, Alerts)
- Dropdowns (Audio Quality, Language)
- Form Inputs \+ Submit Buttons

###

### **💳 10\. Subscription & Billing Screen**

**Components**

- Tier Cards (Free, Premium \- Features Compared)
- Billing Info Panel (Current Plan, Next Payment Date)
- Invoice History & Payment Method Panel

**Controls**

- Upgrade/Downgrade Buttons
- Add/Change Payment Method Form
- Cancel Subscription Link

### **🤖 11\. AI Assistant Screen**

**Components**

- AI Chat Interface (User Prompts \+ Suggestions)
- Recommendations Feed (AI Tracks, Playlists)

**Controls**

- Message Input & Send
- Track Accept/Reject Buttons
- Expandable Recommendation Cards

###

### **📊 12\. Analytics & Insights Screen**

**Components**

- Dashboards (Play Counts, Engagement, Shares)
- Interactive Graphs (Charts.js or Recharts)
- Filter Controls & Export Panel

**Controls**

- Time Range Selectors
- Metric Filters (Track, Mix, User Stats)
- Export Options (CSV, PDF)

### **🚩 13\. Onboarding & Tutorial Screens**

**Components**

- Welcome Tour Modal (Multi-Step Highlight Walkthrough)
- Tutorial Video Carousel
- FAQ & Help Links Section

**Controls**

- Next/Previous Step Buttons
- Skip Tutorial Button
- Replay Video Tutorial Buttons

###

### **🌐 Common UI Controls (Across All Screens)**

**Navigation**

- Navbar (Logo, Navigation Links, Search, Profile)
- Footer (Quick Links: Home, Explore, Profile, Help)

**Reusable Components**

- Modals (Delete Confirm, Edit Form, Share Prompt)
- Toast Notifications (Success, Error, Info)
- Input Components (TextFields, Dropdowns, Sliders, Checkboxes, Radio)
- DatePickers, Range Sliders (Tempo, Pitch, Volume)
