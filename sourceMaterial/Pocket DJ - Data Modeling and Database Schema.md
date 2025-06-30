### **Data Modeling & Database Schema**

---

#### **1\. Database Selection: Cloud Firestore**

The primary database for the Pocket DJ application will be **Cloud Firestore**. This NoSQL, document-oriented database is chosen for several key reasons:

* **Scalability:** Firestore is designed for massive, automatic scaling, which is ideal for a growing user base and community-driven content.  
* **Real-Time Capabilities:** Its real-time listeners are crucial for features like live chat, notifications, and instant updates to likes and comments, providing a dynamic user experience out-of-the-box.  
* **Flexible Data Model:** The document-based structure allows for flexible and evolving schemas without requiring complex migrations.  
* **Serverless Integration:** It integrates seamlessly with Firebase Authentication, Firebase Functions, and Google Cloud Run, aligning perfectly with the chosen microservices architecture.  
* **Robust Security:** Firestore Security Rules provide granular, serverless control over data access, ensuring users can only read and write data they are authorized to.

#### **2\. Data Modeling Philosophy**

The Firestore data model is designed to be **denormalized and optimized for the application's specific read patterns**. The primary goal is to make common queries fast and efficient, even if it means duplicating some data.

* **Query-First Design:** The schema is structured to match the data needed by the UI screens. We are building the data to fit the application's queries, not forcing the application to fit a rigid, normalized structure.  
* **Denormalization:** Data will be duplicated where it improves read performance. For example, a user's username and avatarUrl will be stored on every comment they make, avoiding the need to perform an extra lookup to the users collection just to display the comment.  
* **Subcollections for Scalability:** One-to-many and many-to-many relationships are modeled using subcollections to prevent documents from growing too large and to enable efficient querying of related data (e.g., fetching comments for a specific mix).

---

### **3\. Core Collections Schema**

#### **3.1 users**

Stores public profile information and private preferences for each registered user.

| Field Name | Data Type | Description |
| :---- | :---- | :---- |
| userId | string | **Document ID.** The unique ID from Firebase Authentication. |
| username | string | The user's public display name. Must be unique. |
| email | string | The user's registration email address. |
| avatarUrl | string | URL to the user's profile picture. Can be a default. |
| bio | string | A short user-written biography. |
| followerCount | number | Denormalized count of followers for quick display. Incremented/decremented by a Cloud Function. |
| followingCount | number | Denormalized count of users this user is following. |
| subscription | map | Stores the user's subscription status. |
| subscription.status | string | e.g., "free", "premium", "expired". |
| subscription.tier | string | e.g., "monthly", "yearly". |
| subscription.endDate | timestamp | The date when the current subscription expires. |
| createdAt | timestamp | The timestamp when the user account was created. |

**Subcollections:**

* users/{userId}/following: Stores a list of users this user is following.  
* users/{userId}/followers: Stores a list of users following this user.  
* users/{userId}/notifications: Stores user-specific notifications.

#### **3.2 mixes**

Stores the core metadata for every mix created by a user. This collection is central to the application.

| Field Name | Data Type | Description |
| :---- | :---- | :---- |
| mixId | string | **Document ID.** A unique, auto-generated ID. |
| creatorId | string | The userId of the user who created the mix. |
| creatorUsername | string | Denormalized username of the creator for display. |
| creatorAvatarUrl | string | Denormalized avatar URL of the creator for display. |
| title | string | The title of the mix. |
| description | string | A description of the mix. |
| coverArtUrl | string | URL for the mix's cover art (e.g., from the first track). |
| likeCount | number | Denormalized count of likes. Incremented/decremented by a Cloud Function. |
| commentCount | number | Denormalized count of comments. |
| playCount | number | Total number of times the mix has been played. |
| durationMs | number | The total duration of the mix in milliseconds. |
| mixMetadata | array | An ordered array of maps, representing the "recipe" for the mix. |
| mixMetadata\[\].trackId | string | The SoundCloud ID of the track. |
| mixMetadata\[\].startTimeMs | number | Timestamp (in ms) when the track starts in the mix. |
| mixMetadata\[\].endTimeMs | number | Timestamp (in ms) when the track ends. |
| mixMetadata\[\].transition | map | Details about the transition into this track. |
| mixMetadata\[\].transition.durationMs | number | Duration of the crossfade. |
| mixMetadata\[\].transition.effect | string | e.g., "low\_pass\_filter". |
| createdAt | timestamp | The timestamp when the mix was created. |

**Subcollections:**

* mixes/{mixId}/likes: Stores a list of users who liked the mix.  
* mixes/{mixId}/comments: Stores the comment thread for the mix.

#### **3.3 playlists**

Stores user-curated lists of tracks that are not yet mixed.

| Field Name | Data Type | Description |
| :---- | :---- | :---- |
| playlistId | string | **Document ID.** A unique, auto-generated ID. |
| creatorId | string | The userId of the user who created the playlist. |
| title | string | The title of the playlist. |
| description | string | An optional description. |
| trackIds | array | An ordered array of SoundCloud trackId strings. |
| createdAt | timestamp | The timestamp when the playlist was created. |
| updatedAt | timestamp | The timestamp when the playlist was last updated. |

#### **3.4 tracks**

This collection acts as a **cache** for SoundCloud track metadata to reduce API calls and improve performance.

| Field Name | Data Type | Description |
| :---- | :---- | :---- |
| trackId | string | **Document ID.** The unique ID from SoundCloud. |
| title | string | The track title. |
| artist | string | The name of the track artist. |
| durationMs | number | Duration of the track in milliseconds. |
| artworkUrl | string | URL to the track's cover art. |
| bpm | number | The beats per minute, if available. |
| key | string | The musical key, if available. |
| lastFetched | timestamp | The timestamp when this data was last fetched from SoundCloud, used to manage cache expiry. |

#### **3.5 chats**

This top-level collection manages the metadata for one-on-one chat sessions.

| Field Name | Data Type | Description |
| :---- | :---- | :---- |
| chatId | string | **Document ID.** A composite key of the two participants' userIds, sorted alphabetically and concatenated (e.g., userId1\_userId2). This ensures uniqueness and easy lookup. |
| participants | array | An array containing the two userIds in the chat. |
| lastMessage | map | A denormalized copy of the most recent message for preview purposes. |
| lastMessage.text | string | The text of the last message. |
| lastMessage.senderId | string | The userId of the person who sent the last message. |
| lastMessage.timestamp | timestamp | The time the last message was sent. |

**Subcollections:**

* chats/{chatId}/messages: Stores the actual messages for a conversation.

---

### **4\. Subcollection Schemas**

#### **mixes/{mixId}/likes**

* **Document ID:** The userId of the user who liked the mix.  
* **Fields:**  
  * likedAt: timestamp \- When the user liked the mix.

#### **mixes/{mixId}/comments**

* **Document ID:** A unique, auto-generated ID.  
* **Fields:**  
  * commentId: string \- The unique ID of the comment.  
  * userId: string \- The userId of the commenter.  
  * username: string \- Denormalized username for display.  
  * avatarUrl: string \- Denormalized avatar URL for display.  
  * text: string \- The content of the comment.  
  * createdAt: timestamp \- When the comment was posted.

#### **users/{userId}/following & users/{userId}/followers**

* **Document ID:** The userId of the user being followed or the follower.  
* **Fields:**  
  * followedAt / followingSince: timestamp \- When the relationship was established.

#### **users/{userId}/notifications**

* **Document ID:** A unique, auto-generated ID.  
* **Fields:**  
  * type: string \- e.g., "new\_follower", "new\_like", "new\_comment".  
  * fromUserId: string \- The userId of the user who triggered the notification.  
  * fromUsername: string \- Denormalized username for display.  
  * fromAvatarUrl: string \- Denormalized avatar for display.  
  * targetMixId (optional): string \- The mixId that was liked or commented on.  
  * isRead: boolean \- true if the user has viewed the notification.  
  * createdAt: timestamp \- When the notification was generated.

#### **chats/{chatId}/messages**

* **Document ID:** A unique, auto-generated ID, ordered chronologically.  
* **Fields:**  
  * messageId: string \- The unique ID of the message.  
  * senderId: string \- The userId of the message sender.  
  * text: string \- The content of the message.  
  * createdAt: timestamp \- When the message was sent.

---

### **5\. Firestore Security Rules**

Security rules will be implemented to enforce data integrity and authorization. Rules will be defined on a per-service basis, corresponding to the microservice that owns the data.

**Example Rules:**

Generated code  
     rules\_version \= '2';  
service cloud.firestore {  
  match /databases/{database}/documents {

    // Users can only read their own profile, but anyone can read public data.  
    // Only the authenticated user can write to their own document.  
    match /users/{userId} {  
      allow read: if request.auth \!= null;  
      allow write: if request.auth.uid \== userId;  
    }

    // Anyone can read mixes, but only the creator can update/delete.  
    // A user must be authenticated to create a mix.  
    match /mixes/{mixId} {  
      allow read: if true;  
      allow create: if request.auth \!= null && request.resource.data.creatorId \== request.auth.uid;  
      allow update, delete: if resource.data.creatorId \== request.auth.uid;

      // Anyone authenticated can like or comment.  
      match /likes/{userId} {  
        allow write: if request.auth.uid \== userId;  
      }  
      match /comments/{commentId} {  
        allow create: if request.auth \!= null;  
        allow delete: if resource.data.userId \== request.auth.uid || get(/databases/$(database)/documents/mixes/$(mixId)).data.creatorId \== request.auth.uid;  
      }  
    }  
  }  
}  
     
