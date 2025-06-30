### **Agile Development Board Breakdown for Data Modeling & Firestore Integration**

---

#### **🗃️ Feature \- F\_DM1: Initial Schema Design & Firestore Setup**

* **User Story \- F\_DM1\_US1: Define Core Data Models & Relationships**  
  * **Task \- F\_DM1\_US1\_T1:** Define the schema for the users collection, including all public and private fields.  
  * **Task \- F\_DM1\_US1\_T2:** Define the schema for the mixes collection, including the structure of the mixMetadata array.  
  * **Task \- F\_DM1\_US1\_T3:** Define the schema for the playlists collection.  
  * **Task \- F\_DM1\_US1\_T4:** Define the schema for the tracks collection, establishing it as a cache for SoundCloud metadata.  
  * **Task \- F\_DM1\_US1\_T5:** Define the schema for the top-level chats collection and its messages subcollection.  
  * **Task \- F\_DM1\_US1\_T6:** Define the schemas for all subcollections, including likes, comments, followers, following, and notifications.  
  * **Task \- F\_DM1\_US1\_T7:** Create a comprehensive data dictionary document that explains each field, its data type, and its purpose.  
* **User Story \- F\_DM1\_US2: Initialize and Configure Firestore Environment**  
  * **Task \- F\_DM1\_US2\_T1:** Create the Cloud Firestore project instance in the Google Cloud Platform console.  
  * **Task \- F\_DM1\_US2\_T2:** Configure the Firestore database location and mode (Native).  
  * **Task \- F\_DM1\_US2\_T3:** Write an initial database seeding script (using Firebase Admin SDK) to populate development environments with sample data (users, mixes, etc.).  
  * **Task \- F\_DM1\_US2\_T4:** Configure separate GCP projects for development, staging, and production environments.

---

#### **🔗 Feature \- F\_DM2: Microservice Data Integration**

* **User Story \- F\_DM2\_US1: Integrate User Profile Service**  
  * **Task \- F\_DM2\_US1\_T1:** Implement the Firebase Admin SDK connection within the User Profile Service.  
  * **Task \- F\_DM2\_US1\_T2:** Develop data access functions for creating and reading a user document (createUser, getUser).  
  * **Task \- F\_DM2\_US1\_T3:** Develop data access functions for updating a user document (updateUser).  
  * **Task \- F\_DM2\_US1\_T4:** Develop data access functions for managing the followers and following subcollections.  
  * **Task \- F\_DM2\_US1\_T5:** Write integration tests for all User Profile Service data access functions.  
* **User Story \- F\_DM2\_US2: Integrate Mix Service**  
  * **Task \- F\_DM2\_US2\_T1:** Implement the Firebase Admin SDK connection within the Mix Service.  
  * **Task \- F\_DM2\_US2\_T2:** Develop data access functions for creating, reading, updating, and deleting documents in the mixes collection.  
  * **Task \- F\_DM2\_US2\_T3:** Develop data access functions for managing the likes subcollection.  
  * **Task \- F\_DM2\_US2\_T4:** Develop data access functions for managing the comments subcollection.  
  * **Task \- F\_DM2\_US2\_T5:** Write integration tests for all Mix Service data access functions.  
* **User Story \- F\_DM2\_US3: Integrate Playlist Service**  
  * **Task \- F\_DM2\_US3\_T1:** Implement the Firebase Admin SDK connection within the Playlist Service.  
  * **Task \- F\_DM2\_US3\_T2:** Develop data access functions for CRUD operations on the playlists collection.  
  * **Task \- F\_DM2\_US3\_T3:** Write integration tests for all Playlist Service data access functions.  
* **User Story \- F\_DM2\_US4: Implement Denormalization and Aggregation Logic**  
  * **Task \- F\_DM2\_US4\_T1:** Write a Cloud Function triggered by writes to /mixes/{mixId}/likes/{userId} to increment/decrement likeCount on the parent mix document.  
  * **Task \- F\_DM2\_US4\_T2:** Write a Cloud Function triggered by writes to /mixes/{mixId}/comments/{commentId} to increment/decrement commentCount.  
  * **Task \- F\_DM2\_US4\_T3:** Write a Cloud Function triggered by writes to /users/{userId}/followers/{followerId} to increment/decrement followerCount.  
  * **Task \- F\_DM2\_US4\_T4:** Write unit tests for each aggregation Cloud Function.

---

#### **🛡️ Feature \- F\_DM3: Firestore Security Rules Implementation**

* **User Story \- F\_DM3\_US1: Implement Security Rules for User & Profile Data**  
  * **Task \- F\_DM3\_US1\_T1:** Write Firestore rules for the users collection to ensure users can only write to their own document.  
  * **Task \- F\_DM3\_US1\_T2:** Write Firestore rules for the followers and following subcollections.  
* **User Story \- F\_DM3\_US2: Implement Security Rules for Content Data**  
  * **Task \- F\_DM3\_US2\_T1:** Write Firestore rules for the mixes collection, allowing public reads but restricted writes to the creator.  
  * **Task \- F\_DM3\_US2\_T2:** Write Firestore rules for the playlists collection, restricting all access to the creator.  
  * **Task \- F\_DM3\_US2\_T3:** Write Firestore rules for the tracks cache collection, allowing only backend services (via Admin SDK) to write.  
* **User Story \- F\_DM3\_US3: Implement Security Rules for Interaction Data**  
  * **Task \- F\_DM3\_US3\_T1:** Write rules for the /mixes/{mixId}/likes subcollection, allowing authenticated users to only write to their own like document.  
  * **Task \- F\_DM3\_US3\_T2:** Write rules for the /mixes/{mixId}/comments subcollection, allowing any authenticated user to create, but only the author or mix creator to delete.  
  * **Task \- F\_DM3\_US3\_T3:** Write rules for the chats collection and its messages subcollection, ensuring only participants can read/write.  
* **User Story \- F\_DM3\_US4: Test Security Rules**  
  * **Task \- F\_DM3\_US4\_T1:** Set up the Firestore Emulator and Rules test environment.  
  * **Task \- F\_DM3\_US4\_T2:** Write unit tests for all successful rule cases (e.g., user updating their own profile).  
  * **Task \- F\_DM3\_US4\_T3:** Write unit tests for all failed rule cases (e.g., user trying to delete another user's mix).

---

#### **🧪 Feature \- F\_DM4: Data Model Testing & Validation**

* **User Story \- F\_DM4\_US1: End-to-End Data Flow Testing**  
  * **Task \- F\_DM4\_US1\_T1:** Write an E2E test for the user signup flow, verifying that the Auth Service correctly triggers the creation of a document in the users collection.  
  * **Task \- F\_DM4\_US1\_T2:** Write an E2E test where a user creates a mix, verifying the data is correctly structured in the mixes collection.  
  * **Task \- F\_DM4\_US1\_T3:** Write an E2E test where a user likes a mix, verifying the like is recorded and the aggregation Cloud Function correctly updates the likeCount.  
  * **Task \- F\_DM4\_US1\_T4:** Write an E2E test verifying that a user cannot read a chat they are not a participant in.  
* **User Story \- F\_DM4\_US2: Performance and Indexing**  
  * **Task \- F\_DM4\_US2\_T1:** Analyze all planned application queries to identify the need for composite indexes.  
  * **Task \- F\_DM4\_US2\_T2:** Implement the required composite indexes in firestore.indexes.json.  
  * **Task \- F\_DM4\_US2\_T3:** Create a test suite to load-test common queries (e.g., fetching the main social feed) and measure read performance.

---

#### **📦 Feature \- F\_DM5: Data Versioning & Maintenance**

* **User Story \- F\_DM5\_US1: Implement Schema Versioning Strategy**  
  * **Task \- F\_DM5\_US1\_T1:** Add a \_schemaVersion field (e.g., with value 1\) to the base schema of all top-level collection documents (users, mixes, etc.).  
  * **Task \- F\_DM5\_US1\_T2:** Document the v1.0 schema in the project's data dictionary.  
* **User Story \- F\_DM5\_US2: Develop Data Migration Strategy**  
  * **Task \- F\_DM5\_US2\_T1:** Document the chosen strategy for handling schema changes (e.g., lazy migration, where data is updated on its next read/write).  
  * **Task \- F\_DM5\_US2\_T2:** Write a template migration script using the Firebase Admin SDK to demonstrate how a batch update would be performed (e.g., adding a new isVerified field to all users).  
  * **Task \- F\_DM5\_US2\_T3:** Create a migrations directory in the backend codebase to store future migration scripts.  
* **User Story \- F\_DM5\_US3: Configure Backup & Recovery Procedures**  
  * **Task \- F\_DM5\_US3\_T1:** Configure automated daily backups of the production Firestore database to a Google Cloud Storage bucket.  
  * **Task \- F\_DM5\_US3\_T2:** Document the step-by-step procedure for restoring the database from a backup in a disaster recovery scenario.  
  * **Task \- F\_DM5\_US3\_T3:** Test the restore procedure by restoring a backup to a temporary staging environment.

