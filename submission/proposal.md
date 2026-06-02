# NHAI EdgeFace Secure

## Team Information

Team Name:

Team Members:

Hackathon:
NHAI Innovation Hackathon 7.0

---

# 1. Executive Summary
NHAI EdgeFace Secure is an offline-first facial authentication and visitor management system designed for integration with DataLake 3.0. The solution addresses authentication challenges in remote highway construction zones, tunnels, inspection sites, and other field environments where internet connectivity may be unavailable.

The proposed system performs face authentication, liveness verification, policy-based decision making, visitor registration, local event storage, and cloud synchronization. By combining edge AI and offline-first architecture, the system enables secure and uninterrupted operation while maintaining synchronization with centralized infrastructure whenever connectivity becomes available.

The solution improves workforce accountability, reduces attendance fraud, enhances visitor traceability, and provides a scalable foundation for future deployment across NHAI field operations.

# 2. Problem Statement
NHAI field personnel frequently operate in remote locations where reliable internet connectivity cannot be guaranteed. Traditional authentication systems depend heavily on cloud connectivity, making them unsuitable for deployment in tunnels, remote highways, construction sites, and other low-connectivity environments.

The challenge is to develop a secure facial authentication system capable of:

Operating entirely offline
Running on standard mobile devices
Performing liveness verification
Preventing spoofing attacks
Managing visitors and temporary workers
Maintaining secure local records
Synchronizing data with central systems when connectivity becomes available

The system must integrate seamlessly with DataLake 3.0 while remaining lightweight, scalable, and secure.

# 3. Proposed Solution
NHAI EdgeFace Secure introduces an offline-first authentication framework built around facial recognition, liveness detection, policy evaluation, local storage, and synchronization mechanisms.

The system workflow consists of:

Camera Capture
→ Face Detection
→ Quality Verification
→ Liveness Verification
→ Face Recognition
→ Policy Evaluation
→ Attendance / Visitor Management
→ Local Storage
→ Sync Queue
→ AWS / DataLake Synchronization

The solution includes the following major modules:

Face Authentication Module

Performs facial recognition and identity verification using edge-based AI models.

### Liveness Detection Module

Protects against spoofing attacks through active liveness checks such as blink, smile, and head movement verification.

### Policy Engine
Converts authentication outcomes into business actions such as attendance marking, visitor registration, temporary access generation, or rejection. 
 
### Visitor Management
Allows supervisors to register visitors, vehicle numbers, and visit purposes while operating offline. 
  
### Synchronization Layer 
Maintains local records during offline operation and uploads them to AWS/DataLake once connectivity is restored. 
  
### Storage Layer
Ensures reliable local storage of authentication records, visitor logs, and synchronization queues

# 4. System Architecture

The proposed system follows an offline-first architecture designed specifically for remote deployment environments.

```text
React Native Application
            │
            ▼
     Face Authentication
            │
            ▼
      Policy Engine
            │
            ▼
      Local Storage
            │
            ▼
       Sync Queue
            │
            ▼
     AWS / DataLake
```

The architecture consists of five primary layers:

### User Interface Layer

Provides authentication, visitor management, and synchronization dashboards.

### Authentication Layer

Performs face detection, quality verification, liveness verification, and identity matching.

### Policy Layer

Determines business actions based on authentication outcomes.

### Storage Layer

Maintains local records during offline operation.

### Synchronization Layer

Transfers locally stored records to cloud infrastructure once connectivity becomes available.

---

# 5. Workflow

The complete system workflow is illustrated below:

### Worker Authentication Flow

Worker Approaches Device
↓
Face Capture
↓
Face Detection
↓
Quality Verification
↓
Liveness Verification
↓
Identity Matching
↓
Policy Evaluation
↓
Attendance Marked
↓
Local Storage
↓
Sync Queue

### Visitor Management Flow

Visitor Registration
↓
Name Entry
↓
Vehicle Number Entry
↓
Purpose Entry
↓
Local Storage
↓
Sync Queue

### Synchronization Flow

Internet Available
↓
Upload Pending Records
↓
AWS Processing
↓
DataLake Update
↓
Queue Purge
↓
Synchronization Complete

The workflow ensures uninterrupted operation even when network connectivity is unavailable.

# 6. Key Features
Offline Face Authentication

The system performs facial authentication directly on the device without requiring internet connectivity.

Active Liveness Detection

The solution uses active liveness challenges such as blink detection, smile verification, and head movement tracking to prevent spoofing attacks.

Policy-Based Decision Engine

Authentication outcomes are converted into actionable business decisions through a configurable policy engine.

Visitor Management

Supervisors can register visitors, vehicle numbers, and visit purposes even in offline environments.

Synchronization Queue

Records generated during offline operation are queued locally and synchronized automatically once connectivity becomes available.

Cloud Integration Readiness

The architecture supports seamless synchronization with AWS infrastructure and DataLake 3.0.

# 7. Technology Stack

| Layer                 | Technology         |
| --------------------- | ------------------ |
| Mobile Application    | React Native       |
| Development Framework | Expo               |
| Face Detection        | BlazeFace          |
| Face Recognition      | MobileFaceNet      |
| Liveness Detection    | MediaPipe          |
| Local Storage         | SQLite / SQLCipher |
| Similarity Search     | FAISS              |
| Synchronization       | AWS                |
| Cloud Database        | DynamoDB           |
| Cloud Integration     | DataLake 3.0       |

### Key Advantages

* Offline-first operation
* Lightweight deployment
* Mobile-device compatibility
* Cloud synchronization readiness
* Secure local storage
* Scalable architecture


# 8. Innovation

The proposed solution introduces several innovative features designed specifically for NHAI deployment scenarios.

Offline-First Architecture

Unlike conventional cloud-dependent systems, the solution continues operating without network access.

Lightweight Edge AI

Face authentication and decision-making occur directly on the mobile device, reducing latency and improving reliability.

Active Anti-Spoofing

The system combines facial recognition with active liveness verification to improve security against presentation attacks.

Modular Design

Authentication, policy evaluation, storage, and synchronization are implemented as independent modules, enabling future scalability and easier maintenance.

Sync-Based Data Management

The synchronization queue ensures that records generated offline are never lost and are uploaded automatically when connectivity returns.

# 9. Future Scope

Future enhancements may include:

Real-time BlazeFace Integration
MobileFaceNet Deployment
SQLCipher Encrypted Storage
AWS Lambda Integration
DynamoDB Synchronization
Advanced Anti-Spoofing Models
Analytics Dashboard
Geofencing Support
Role-Based Access Control
Multi-Site Deployment Support

These enhancements will further improve security, scalability, and operational efficiency.

# 10. Conclusion

NHAI EdgeFace Secure provides an offline-first authentication and visitor management framework tailored for remote field environments. By combining facial authentication, liveness verification, policy-based decision making, local storage, and synchronization mechanisms, the system ensures reliable operation even in challenging connectivity conditions.

The proposed architecture is scalable, secure, and integration-ready for DataLake 3.0 deployments. The solution addresses critical operational challenges while providing a strong foundation for future AI-driven enhancements.
