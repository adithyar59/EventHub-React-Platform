# Design Document: Campus Event Management Platform

**Project Author:** Aditya R (Reva University)  
**Date:** September 7, 2025  
**Repository:** https://github.com/adithyar59/Campus-Event-Management-Platform

---

## 1. Introduction & Approach

This document outlines the design and architecture for the prototype of a Campus Event Management Platform's reporting system, as per the Webknot Technologies assignment.

My approach was to build a frontend-only prototype using React JS. This allowed for rapid development of a high-fidelity, interactive user interface that demonstrates all the required functionalities (student registration, attendance, feedback, and admin reporting) without the need for a live backend, which is ideal for a tight deadline. All data is mocked within the application to simulate a real-world environment.

### 1.1. AI-Assisted Brainstorming

I utilized an LLM (GitHub Copilot) for the following:

- Initial project scaffolding and component structure in React
- Generating SVG icons and the overall glassmorphic, Apple-inspired design theme
- Refactoring the application from a Firebase-connected backend to a self-contained mock data demo
- Debugging and error resolution

I deviated from the initial AI suggestion of using a live Firebase backend to ensure the prototype was fully functional and easily demonstrable without any external setup or potential permission issues.

---

## 2. System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CAMPUS EVENT PLATFORM                    │
├─────────────────────────────────────────────────────────────┤
│                    PRESENTATION LAYER                       │
│  ┌─────────────────┐    ┌─────────────────────────────────┐ │
│  │  Student View   │    │         Admin View              │ │
│  │                 │    │                                 │ │
│  │ • Browse Events │    │ • Generate Reports              │ │
│  │ • Register      │    │ • Event Analytics               │ │
│  │ • Check-in      │    │ • Student Participation        │ │
│  │ • Feedback      │    │ • Top Performers               │ │
│  └─────────────────┘    └─────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                     BUSINESS LOGIC                          │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ • Registration Management                               │ │
│  │ • Attendance Tracking                                   │ │
│  │ • Feedback Collection                                   │ │
│  │ • Report Generation                                     │ │
│  │ • State Management (React Hooks)                       │ │
│  └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                      DATA LAYER                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                   MOCK DATA STORE                       │ │
│  │ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐ │ │
│  │ │  Colleges   │ │   Events    │ │     Students        │ │ │
│  │ └─────────────┘ └─────────────┘ └─────────────────────┘ │ │
│  │ ┌─────────────┐ ┌─────────────┐                       │ │
│  │ │Registrations│ │  Feedback   │                       │ │
│  │ └─────────────┘ └─────────────┘                       │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Database Schema (Simulated)

The data is structured as a NoSQL-style collection of objects. This schema could be directly implemented in databases like Firestore.

### 3.1. Entity Relationship Diagram

```
┌─────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   College   │────▶│     Events      │────▶│  Registrations  │
│             │     │                 │     │                 │
│ • id        │     │ • id            │     │ • id            │
│ • name      │     │ • collegeId (FK)│     │ • studentId (FK)│
│ • location  │     │ • name          │     │ • eventId (FK)  │
└─────────────┘     │ • description   │     │ • regDate       │
                    │ • type          │     │ • attended      │
┌─────────────┐     │ • date          │     │ • checkInTime   │
│   Students  │     │ • organizer     │     └─────────────────┘
│             │     └─────────────────┘              │
│ • id        │              │                       │
│ • collegeId │              │                       ▼
│ • name      │              │              ┌─────────────────┐
│ • email     │              │              │    Feedback     │
└─────┬───────┘              │              │                 │
      │                      │              │ • id            │
      │                      │              │ • registrationId│
      └──────────────────────┼──────────────│ • studentId (FK)│
                             │              │ • rating        │
                             │              │ • submissionDate│
                             │              └─────────────────┘
                             │
                             ▼
                    One-to-Many Relationships
```

### 3.2. Data Structure Details

**Colleges**
```javascript
{
  id: string,           // e.g., "college-1"
  name: string,         // e.g., "Tech University"
  location: string      // e.g., "Silicon Valley"
}
```

**Events**
```javascript
{
  id: string,           // e.g., "event-1"
  collegeId: string,    // Foreign key
  name: string,
  description: string,
  type: string,         // "Hackathon", "Workshop", "Fest", "Seminar"
  date: timestamp,
  organizer: string
}
```

**Students**
```javascript
{
  id: string,           // e.g., "user-1"
  collegeId: string,    // Foreign key
  name: string,
  email: string
}
```

**Registrations**
```javascript
{
  id: string,           // e.g., "reg-1"
  studentId: string,    // Foreign key
  eventId: string,      // Foreign key
  registrationDate: timestamp,
  attended: boolean,
  checkInTime: timestamp // optional
}
```

**Feedback**
```javascript
{
  id: string,           // e.g., "fb-1"
  registrationId: string, // Foreign key
  studentId: string,    // Foreign key
  rating: number,       // 1-5
  submissionDate: timestamp
}
```

---

## 4. API Design (Simulated)

The prototype simulates the following API endpoints through internal state management functions:

### 4.1. Core Functions

```javascript
// Registration Management
handleRegister(eventId)
// Action: Creates a new registration document
// Input: eventId
// Logic: Checks if user is already registered, creates new entry

handleAttendance(registrationId)
// Action: Marks a student as attended
// Input: registrationId  
// Logic: Updates attended status to true

handleFeedback(registrationId, rating)
// Action: Submits feedback for an event
// Input: registrationId, rating
// Logic: Creates new feedback entry

generateReports()
// Action: Computes and generates admin reports
// Input: None
// Logic: Calculates Event Popularity, Student Participation, Top Students
```

---

## 5. User Workflows

### 5.1. Student Registration Workflow

```
    Student                                System/UI
       │                                       │
       │ 1. Browse Available Events            │
       │──────────────────────────────────────▶│
       │                                       │
       │ 2. Select Event & View Details        │
       │──────────────────────────────────────▶│
       │                                       │
       │ 3. Click "Register Now"               │
       │──────────────────────────────────────▶│
       │                                       │
       │                                       │ 4. Check if already registered
       │                                       │    ┌─────────────────────────┐
       │                                       │    │ if (already registered) │
       │                                       │    │   show error message    │
       │                                       │    │ else                    │
       │                                       │    │   create registration   │
       │                                       │    └─────────────────────────┘
       │                                       │
       │ 5. Receive Success Confirmation       │
       │◀──────────────────────────────────────│
       │                                       │
       │ 6. Navigate to "My Registrations"     │
       │──────────────────────────────────────▶│
       │                                       │
```

### 5.2. Attendance & Feedback Workflow

```
    Student                                System/UI
       │                                       │
       │ 1. Go to "My Registrations" Tab       │
       │──────────────────────────────────────▶│
       │                                       │
       │ 2. Click "Simulate Check-in"          │
       │──────────────────────────────────────▶│
       │                                       │
       │                                       │ 3. Update registration.attended = true
       │                                       │    Add checkInTime timestamp
       │                                       │
       │ 4. See "Attended" Status              │
       │◀──────────────────────────────────────│
       │                                       │
       │ 5. Feedback UI Appears                │
       │◀──────────────────────────────────────│
       │                                       │
       │ 6. Select Star Rating (1-5)           │
       │──────────────────────────────────────▶│
       │                                       │
       │                                       │ 7. Create feedback record
       │                                       │    Link to registration
       │                                       │
       │ 8. Receive "Thank you" Message        │
       │◀──────────────────────────────────────│
       │                                       │
```

### 5.3. Admin Report Generation Workflow

```
    Admin                                  System/UI
       │                                       │
       │ 1. Switch to "Admin" View             │
       │──────────────────────────────────────▶│
       │                                       │
       │ 2. Click "Generate Reports"           │
       │──────────────────────────────────────▶│
       │                                       │
       │                                       │ 3. Show loading spinner
       │                                       │
       │                                       │ 4. Calculate metrics:
       │                                       │    ┌─────────────────────────┐
       │                                       │    │ Event Popularity:       │
       │                                       │    │ • Registration count    │
       │                                       │    │ • Attendance %          │
       │                                       │    │ • Average feedback      │
       │                                       │    │                         │
       │                                       │    │ Student Participation:  │
       │                                       │    │ • Events attended       │
       │                                       │    │ • Ranked by activity    │
       │                                       │    │                         │
       │                                       │    │ Top 3 Students:         │
       │                                       │    │ • Most active users     │
       │                                       │    └─────────────────────────┘
       │                                       │
       │ 5. Display Comprehensive Reports      │
       │◀──────────────────────────────────────│
       │                                       │
```

---

## 6. Component Architecture

### 6.1. Component Hierarchy

```
App
├── Header
│   ├── Logo (EventHub)
│   └── ViewToggle (Student/Admin)
│
├── StudentView
│   ├── TabNavigation
│   │   ├── BrowseEvents
│   │   └── MyRegistrations
│   │
│   ├── EventGrid
│   │   └── EventCard[]
│   │       ├── EventInfo
│   │       ├── EventType
│   │       └── EventDate
│   │
│   └── RegistrationGrid
│       └── RegistrationCard[]
│           ├── AttendanceStatus
│           ├── CheckInButton
│           └── FeedbackStars
│
├── AdminView
│   ├── GenerateReportsButton
│   └── ReportsGrid
│       ├── EventPopularityReport
│       ├── StudentParticipationReport
│       └── TopStudentsReport
│
└── EventDetailModal
    ├── EventInformation
    ├── RegistrationButton
    └── CloseButton
```

### 6.2. State Management Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      APP STATE                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │    user     │  │   events    │  │    registrations    │  │
│  │   colleges  │  │  feedback   │  │   selectedEvent     │  │
│  │  isLoading  │  │currentView  │  │  adminReports       │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                    STATE UPDATES                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  handleRegister()     ────────────▶  Add to registrations  │
│  handleAttendance()   ────────────▶  Update registration   │
│  handleFeedback()     ────────────▶  Add to feedback       │
│  generateReports()    ────────────▶  Update adminReports   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                   DERIVED STATE                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  userRegistrations = useMemo(() => {                        │
│    return registrations                                     │
│      .filter(reg => reg.studentId === user.id)             │
│      .map(reg => ({                                         │
│        ...reg,                                              │
│        event: events.find(e => e.id === reg.eventId),      │
│        feedback: feedback.find(f => f.regId === reg.id)    │
│      }))                                                    │
│  }, [user, registrations, events, feedback])               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. UI/UX Design Principles

### 7.1. Design System

```
Color Palette:
┌─────────────────────────────────────────────────────────────┐
│  Primary: Dark Gray (#1f2937)                              │
│  Secondary: Blue (#3b82f6)                                 │
│  Success: Green (#10b981)                                  │
│  Warning: Yellow (#f59e0b)                                 │
│  Text: White (#ffffff) / Gray (#6b7280)                    │
└─────────────────────────────────────────────────────────────┘

Typography:
┌─────────────────────────────────────────────────────────────┐
│  Font Family: -apple-system, BlinkMacSystemFont, Segoe UI  │
│  Headers: Bold, 1.5-2rem                                   │
│  Body: Regular, 1rem                                       │
│  Captions: 0.875rem                                        │
└─────────────────────────────────────────────────────────────┘

Layout Principles:
┌─────────────────────────────────────────────────────────────┐
│  • Glassmorphism effect with backdrop-blur                 │
│  • Card-based layout with rounded corners                  │
│  • Consistent spacing using Tailwind scale                 │
│  • Responsive grid system (1 col mobile, 2 col desktop)    │
│  • Hover animations and smooth transitions                 │
└─────────────────────────────────────────────────────────────┘
```

### 7.2. Responsive Breakpoints

```
Mobile First Approach:

┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   Mobile        │  │     Tablet      │  │    Desktop      │
│   < 768px       │  │   768px-1024px  │  │    > 1024px     │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ • Single column │  │ • Two columns   │  │ • Two columns   │
│ • Stacked cards │  │ • Grid layout   │  │ • Grid layout   │
│ • Full width    │  │ • Responsive    │  │ • Max width     │
│   buttons       │  │   buttons       │  │   container     │
│ • Touch-friendly│  │ • Hover states  │  │ • Hover states  │
│   targets       │  │   enabled       │  │   enabled       │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## 8. Assumptions & Edge Cases

### 8.1. Core Assumptions

```
Authentication:
┌─────────────────────────────────────────────────────────────┐
│ The demo assumes a user is always logged in as a specific  │
│ mock user (user-1). A real system would have a full       │
│ authentication flow with login/logout capabilities.        │
└─────────────────────────────────────────────────────────────┘

Data Validation:
┌─────────────────────────────────────────────────────────────┐
│ The demo assumes all input is valid. A production app     │
│ would require robust input validation and error handling.  │
└─────────────────────────────────────────────────────────────┘
```

### 8.2. Edge Cases Handled

```
Registration Logic:
┌─────────────────────────────────────────────────────────────┐
│ • Duplicate Registrations: System prevents a student from  │
│   registering for the same event more than once            │
│                                                             │
│ • Feedback Constraints: Feedback can only be submitted     │
│   for events the student has attended, and only once       │
│   per event                                                 │
└─────────────────────────────────────────────────────────────┘

State Management:
┌─────────────────────────────────────────────────────────────┐
│ • Loading States: UI shows loading spinners during data    │
│   processing operations                                     │
│                                                             │
│ • Empty States: Proper messaging when no data is          │
│   available (e.g., "No registrations yet")                │
└─────────────────────────────────────────────────────────────┘
```

### 8.3. Production Considerations

```
Not Implemented (Future Scope):
┌─────────────────────────────────────────────────────────────┐
│ • Event Cancellations: Workflow for cancelled events and   │
│   student notifications                                     │
│                                                             │
│ • Real-time Updates: Live updates for registration counts  │
│   and availability                                         │
│                                                             │
│ • Email Notifications: Automated email system for          │
│   registration confirmations and reminders                 │
│                                                             │
│ • Role-based Access: Different permission levels for       │
│   students, event organizers, and super admins            │
└─────────────────────────────────────────────────────────────┘
```

---

## 9. Scale Considerations

### 9.1. Current Architecture (Demo Scale)

```
Designed for: ~50 colleges, ~1000 students, ~100 events

┌─────────────────────────────────────────────────────────────┐
│                    SINGLE TENANT                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  All Data in Single Database                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ • Colleges (collegeId as partition key)            │   │
│  │ • Students (collegeId as foreign key)              │   │
│  │ • Events (collegeId as foreign key)                │   │
│  │ • Registrations (indexed by studentId, eventId)    │   │
│  │ • Feedback (indexed by registrationId)             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Benefits:                                                  │
│  • Simple queries                                          │
│  • Cross-college reporting                                 │
│  • Centralized management                                  │
└─────────────────────────────────────────────────────────────┘
```

### 9.2. Production Scale Architecture

```
For Large Scale: 500+ colleges, 100k+ students

┌─────────────────────────────────────────────────────────────┐
│                  MULTI-TENANT ARCHITECTURE                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Option 1: Database Per College                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │ College A   │  │ College B   │  │   Central Index     │ │
│  │ Database    │  │ Database    │  │   Database          │ │
│  │             │  │             │  │                     │ │
│  │ • Students  │  │ • Students  │  │ • College Registry  │ │
│  │ • Events    │  │ • Events    │  │ • Global Analytics  │ │
│  │ • Regis...  │  │ • Regis...  │  │ • Cross-college     │ │
│  └─────────────┘  └─────────────┘  │   Reports           │ │
│                                    └─────────────────────┘ │
│                                                             │
│  Option 2: Sharded Database                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Shard by collegeId hash                             │   │
│  │ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────┐ │   │
│  │ │ Shard 1 │ │ Shard 2 │ │ Shard 3 │ │ Shard N     │ │   │
│  │ │College  │ │College  │ │College  │ │ College     │ │   │
│  │ │1-100    │ │101-200  │ │201-300  │ │ 301-N       │ │   │
│  │ └─────────┘ └─────────┘ └─────────┘ └─────────────┘ │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 9.3. Performance Optimizations

```
Database Indexes:
┌─────────────────────────────────────────────────────────────┐
│ • registrations: (studentId, eventId) - compound index     │
│ • events: (collegeId, date) - for college event queries    │
│ • feedback: (registrationId) - for feedback lookups        │
│ • students: (collegeId) - for college student queries      │
└─────────────────────────────────────────────────────────────┘

Caching Strategy:
┌─────────────────────────────────────────────────────────────┐
│ • Event Lists: Cache for 5 minutes (events don't change    │
│   frequently)                                              │
│ • Student Registrations: Real-time (critical for UX)       │
│ • Analytics Reports: Cache for 1 hour (computation heavy)  │
│ • College Data: Cache for 24 hours (rarely changes)        │
└─────────────────────────────────────────────────────────────┘
```

---

## 10. Technology Stack & Deployment

### 10.1. Frontend Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    TECHNOLOGY CHOICES                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ React 18.2.0                                               │
│ ├── Hooks-based architecture                               │
│ ├── Functional components                                  │
│ └── Context API for state management                       │
│                                                             │
│ Tailwind CSS 3.x (via CDN)                                │
│ ├── Utility-first styling                                 │
│ ├── Responsive design classes                             │
│ └── Custom glassmorphism effects                          │
│                                                             │
│ Create React App                                           │
│ ├── Zero-config build setup                               │
│ ├── Hot module replacement                                │
│ └── Production build optimization                          │
│                                                             │
│ Custom SVG Icons                                           │
│ ├── Inline SVG components                                 │
│ ├── Consistent iconography                                │
│ └── Scalable vector graphics                              │
└─────────────────────────────────────────────────────────────┘
```

### 10.2. Deployment Configuration

```
Netlify Deployment:
┌─────────────────────────────────────────────────────────────┐
│ netlify.toml Configuration:                                 │
│                                                             │
│ [build]                                                     │
│   publish = "build"                                         │
│   command = "npm run build"                                 │
│                                                             │
│ [[redirects]]                                               │
│   from = "/*"                                               │
│   to = "/index.html"                                        │
│   status = 200                                              │
│                                                             │
│ Features:                                                   │
│ • Automatic deploys from GitHub                            │
│ • SPA routing support                                      │
│ • SSL certificate                                          │
│ • CDN distribution                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 11. Future Enhancements

### 11.1. Phase 2 Features

```
Real-time Features:
┌─────────────────────────────────────────────────────────────┐
│ • WebSocket integration for live updates                   │
│ • Real-time registration counts                            │
│ • Live event status updates                                │
│ • Push notifications for event reminders                   │
└─────────────────────────────────────────────────────────────┘

Advanced Analytics:
┌─────────────────────────────────────────────────────────────┐
│ • Interactive charts and graphs                            │
│ • Trend analysis over time                                 │
│ • Predictive analytics for event popularity               │
│ • Custom report generation                                 │
└─────────────────────────────────────────────────────────────┘
```

### 11.2. Phase 3 Features

```
Mobile Application:
┌─────────────────────────────────────────────────────────────┐
│ • React Native mobile app                                  │
│ • QR code-based check-ins                                 │
│ • Offline functionality                                    │
│ • Push notifications                                       │
└─────────────────────────────────────────────────────────────┘

Integration Capabilities:
┌─────────────────────────────────────────────────────────────┐
│ • Calendar system integration                              │
│ • Email marketing platforms                                │
│ • Student information systems                              │
│ • Payment gateway integration                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 12. Conclusion

This prototype successfully demonstrates a comprehensive Campus Event Management Platform with all required features implemented in a self-contained React application. The design prioritizes user experience, scalability considerations, and real-world applicability while maintaining simplicity for demonstration purposes.

**Key Achievements:**
- ✅ Complete student registration workflow
- ✅ Attendance tracking and feedback system  
- ✅ Comprehensive admin reporting dashboard
- ✅ Responsive, modern UI design
- ✅ Production-ready architecture considerations
- ✅ Deployment-ready configuration

**Repository:** https://github.com/adithyar59/Campus-Event-Management-Platform

---

*End of Document*
