import React from 'react';

// --- MOCK DATA ---
// All backend data is now simulated here for a self-contained demo.

const MOCK_COLLEGES = [
    { id: "college-1", name: "Tech University", location: "Silicon Valley" },
    { id: "college-2", name: "Arts & Design College", location: "New York" },
];

const MOCK_EVENTS = [
    { id: "event-1", name: "InnovateHack 2025", description: "A 24-hour hackathon to build the future of tech.", type: "Hackathon", date: { seconds: 1757989800 }, organizer: "Tech University", collegeId: "college-1" },
    { id: "event-2", name: "AI/ML Workshop", description: "Deep dive into machine learning models and applications.", type: "Workshop", date: { seconds: 1758594600 }, organizer: "Tech University", collegeId: "college-1" },
    { id: "event-3", name: "Design Thinking Seminar", description: "Learn the principles of user-centric design.", type: "Seminar", date: { seconds: 1760005800 }, organizer: "Arts & Design College", collegeId: "college-2" },
    { id: "event-4", name: "Annual Tech Fest", description: "The biggest tech celebration of the year.", type: "Fest", date: { seconds: 1761129000 }, organizer: "Tech University", collegeId: "college-1" },
];

// We'll simulate data for multiple students to make reports more realistic.
const MOCK_STUDENTS = [
    { id: "user-1", name: "Alex Johnson", collegeId: "college-1", email: "alex@example.com" },
    { id: "user-2", name: "Brenda Smith", collegeId: "college-1", email: "brenda@example.com" },
    { id: "user-3", name: "Charlie Brown", collegeId: "college-2", email: "charlie@example.com" },
];

// Current logged-in user is Alex Johnson (user-1)
const CURRENT_USER_ID = "user-1";

let MOCK_REGISTRATIONS = [
    { id: "reg-1", studentId: "user-1", eventId: "event-2", registrationDate: { seconds: 1758000000 }, attended: true, checkInTime: { seconds: 1758595000 } },
    { id: "reg-2", studentId: "user-1", eventId: "event-4", registrationDate: { seconds: 1760100000 }, attended: false },
    { id: "reg-3", studentId: "user-2", eventId: "event-1", registrationDate: { seconds: 1757500000 }, attended: true, checkInTime: { seconds: 1757990000 } },
    { id: "reg-4", studentId: "user-2", eventId: "event-2", registrationDate: { seconds: 1758100000 }, attended: true, checkInTime: { seconds: 1758595200 } },
    { id: "reg-5", studentId: "user-3", eventId: "event-3", registrationDate: { seconds: 1759500000 }, attended: false },
    { id: "reg-6", studentId: "user-1", eventId: "event-1", registrationDate: { seconds: 1757400000 }, attended: true, checkInTime: { seconds: 1757990100 } },
    { id: "reg-7", studentId: "user-2", eventId: "event-4", registrationDate: { seconds: 1760200000 }, attended: true, checkInTime: { seconds: 1761129500 } },
];

let MOCK_FEEDBACK = [
    { id: "fb-1", registrationId: "reg-1", studentId: "user-1", rating: 5, submissionDate: { seconds: 1758600000 } },
    { id: "fb-2", registrationId: "reg-3", studentId: "user-2", rating: 4, submissionDate: { seconds: 1758000000 } },
];


// --- SVG Icons ---
const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block h-4 w-4 mr-2 text-gray-400">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line>
    </svg>
);
const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block h-4 w-4 mr-2 text-gray-400">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
);
const CheckIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M20 6 9 17l-5-5"></path>
    </svg>
);
const StarIcon = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-6 w-6 ${filled ? 'text-yellow-400' : 'text-gray-500'}`}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="m15 18-6-6 6-6"></path></svg>
);
const BarChartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><line x1="12" x2="12" y1="20" y2="10"></line><line x1="18" x2="18" y1="20" y2="4"></line><line x1="6" x2="6" y1="20" y2="16"></line></svg>
);
const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);
const LoaderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin h-8 w-8 text-white">
        <line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
    </svg>
);

// --- Helper Functions ---
const formatDate = (timestamp) => {
    if (!timestamp) return 'Date TBD';
    return new Date(timestamp.seconds * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

// --- Main App Component ---
export default function App() {
    // --- State Management ---
    const [user, setUser] = React.useState(null);
    const [colleges, setColleges] = React.useState([]);
    const [events, setEvents] = React.useState([]);
    const [registrations, setRegistrations] = React.useState([]);
    const [feedback, setFeedback] = React.useState([]);
    const [selectedEvent, setSelectedEvent] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [currentView, setCurrentView] = React.useState('student');
    const [activeStudentTab, setActiveStudentTab] = React.useState('events');
    const [adminReports, setAdminReports] = React.useState({
        eventPopularity: [],
        studentParticipation: [],
        topStudents: [],
    });
    const [isGeneratingReports, setIsGeneratingReports] = React.useState(false);
    
    // Derived state for the current user's registrations, enriched with event and feedback data
    const userRegistrations = React.useMemo(() => {
        if (!user) return [];
        return registrations
            .filter(reg => reg.studentId === user.id)
            .map(reg => {
                const event = events.find(e => e.id === reg.eventId) || { name: "Unknown Event" };
                const fb = feedback.find(f => f.registrationId === reg.id);
                return { ...reg, event, feedback: fb };
            });
    }, [user, registrations, events, feedback]);

    // --- Initial Data Loading Effect ---
    React.useEffect(() => {
        setIsLoading(true);
        // Simulate a network delay
        setTimeout(() => {
            const currentUser = MOCK_STUDENTS.find(s => s.id === CURRENT_USER_ID);
            setUser(currentUser);
            setColleges(MOCK_COLLEGES);
            setEvents(MOCK_EVENTS);
            setRegistrations(MOCK_REGISTRATIONS);
            setFeedback(MOCK_FEEDBACK);
            setIsLoading(false);
        }, 1000);
    }, []);

    // --- Core Functions (State Manipulation) ---
    const handleRegister = (eventId) => {
        if (!user) return alert("You must be logged in to register.");
        const isAlreadyRegistered = registrations.some(reg => reg.eventId === eventId && reg.studentId === user.id);
        if (isAlreadyRegistered) {
            alert("You are already registered for this event.");
            return;
        }

        const newRegistration = {
            id: `reg-${Date.now()}`,
            studentId: user.id,
            eventId: eventId,
            registrationDate: { seconds: Math.floor(Date.now() / 1000) },
            attended: false,
        };

        setRegistrations(prev => [...prev, newRegistration]);
        alert("Registration successful!");
        setSelectedEvent(null);
    };
    
    const handleAttendance = (registrationId) => {
        setRegistrations(prevRegs => 
            prevRegs.map(reg => 
                reg.id === registrationId 
                ? { ...reg, attended: true, checkInTime: { seconds: Math.floor(Date.now() / 1000) } }
                : reg
            )
        );
        alert("Attendance marked successfully!");
    };

    const handleFeedback = (registrationId, rating) => {
        const newFeedback = {
            id: `fb-${Date.now()}`,
            registrationId: registrationId,
            studentId: user.id,
            rating: rating,
            submissionDate: { seconds: Math.floor(Date.now() / 1000) }
        };
        setFeedback(prev => [...prev, newFeedback]);
        alert("Thank you for your feedback!");
    };

    // --- Report Generation ---
    const generateReports = () => {
        setIsGeneratingReports(true);
        
        // Simulate report generation delay
        setTimeout(() => {
            // 1. Event Popularity Report
            const eventPopularity = events.map(event => {
                const regs = registrations.filter(r => r.eventId === event.id);
                const attendedCount = regs.filter(r => r.attended).length;
                
                const feedbackForEventRegIds = regs.map(r => r.id);
                const feedbackForEvent = feedback.filter(f => feedbackForEventRegIds.includes(f.registrationId));

                const avgFeedback = feedbackForEvent.length > 0
                    ? (feedbackForEvent.reduce((sum, f) => sum + f.rating, 0) / feedbackForEvent.length).toFixed(1)
                    : 'N/A';

                return {
                    ...event,
                    registrations: regs.length,
                    attendancePercentage: regs.length > 0 ? ((attendedCount / regs.length) * 100).toFixed(0) : 0,
                    avgFeedback
                };
            }).sort((a, b) => b.registrations - a.registrations);

            // 2. Student Participation Report
            const studentParticipation = MOCK_STUDENTS.map(student => {
                const attendedRegs = registrations.filter(r => r.studentId === student.id && r.attended);
                return {
                    ...student,
                    eventsAttended: attendedRegs.length,
                };
            }).sort((a, b) => b.eventsAttended - a.eventsAttended);

            // 3. Top 3 Most Active Students
            const topStudents = studentParticipation.slice(0, 3);
            
            setAdminReports({ eventPopularity, studentParticipation, topStudents });
            setIsGeneratingReports(false);
        }, 1500);
    };

    // --- UI Components ---
    const EventCard = ({ event }) => (
        <div 
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 text-white transform hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => setSelectedEvent(event)}
        >
            <h3 className="font-bold text-lg mb-2">{event.name}</h3>
            <p className="text-sm text-gray-300 mb-4">{event.description}</p>
            <div className="flex justify-between items-center text-xs">
                <span className="flex items-center"><CalendarIcon /> {formatDate(event.date)}</span>
                <span className="bg-white/20 px-2 py-1 rounded-full">{event.type}</span>
            </div>
        </div>
    );

    const EventDetailModal = ({ event, onBack, onRegister }) => {
        const isRegistered = userRegistrations.some(reg => reg.eventId === event.id);

        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center p-4 z-50">
                <div className="bg-gray-800/50 backdrop-blur-2xl border border-white/20 rounded-3xl w-full max-w-md text-white flex flex-col max-h-[90vh]">
                    <div className="p-5 flex-grow overflow-y-auto">
                        <button onClick={onBack} className="absolute top-4 left-4 text-white/70 hover:text-white transition-colors"><ChevronLeftIcon /></button>
                        <h2 className="text-2xl font-bold text-center mt-8 mb-4">{event.name}</h2>
                        <span className="block text-center bg-white/10 px-3 py-1 rounded-full w-fit mx-auto text-sm mb-6">{event.type}</span>
                        <p className="text-gray-300 text-center mb-6">{event.description}</p>
                        <div className="text-sm space-y-3 text-gray-200">
                           <div className="flex items-center"><CalendarIcon /> <span>{formatDate(event.date)}</span></div>
                           <div className="flex items-center"><UsersIcon /> <span>Hosted by {event.organizer}</span></div>
                        </div>
                    </div>
                    <div className="p-5 border-t border-white/10">
                        <button 
                            onClick={() => onRegister(event.id)} 
                            disabled={isRegistered}
                            className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${isRegistered ? 'bg-green-600 cursor-not-allowed flex items-center justify-center' : 'bg-blue-600 hover:bg-blue-500'}`}
                        >
                            {isRegistered ? <><CheckIcon/> &nbsp; Registered</> : 'Register Now'}
                        </button>
                    </div>
                </div>
            </div>
        );
    };
    
    const MyRegistrationCard = ({ registration }) => {
        const [rating, setRating] = React.useState(registration.feedback?.rating || 0);
        const [hoverRating, setHoverRating] = React.useState(0);
        
        const canGiveFeedback = registration.attended && !registration.feedback;

        return (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 text-white">
                <h3 className="font-bold text-lg mb-2">{registration.event.name}</h3>
                <p className="text-xs text-gray-400 mb-4">Registered on: {formatDate(registration.registrationDate)}</p>
                <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-sm ${registration.attended ? 'bg-green-500/30 text-green-300' : 'bg-yellow-500/30 text-yellow-300'}`}>
                        {registration.attended ? 'Attended' : 'Registered'}
                    </span>
                    {!registration.attended && (
                        <button onClick={() => handleAttendance(registration.id)} className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-semibold">
                            Simulate Check-in
                        </button>
                    )}
                </div>
                {canGiveFeedback && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-sm font-semibold mb-2">Leave Feedback:</p>
                        <div className="flex items-center space-x-2">
                             {[1, 2, 3, 4, 5].map(star => (
                                <button 
                                    key={star}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => {
                                        setRating(star);
                                        handleFeedback(registration.id, star);
                                    }}
                                >
                                    <StarIcon filled={(hoverRating || rating) >= star} />
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                 {registration.feedback && (
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center">
                        <p className="text-sm font-semibold mr-2">Your Rating:</p>
                        <div className="flex">
                             {[1, 2, 3, 4, 5].map(star => <StarIcon key={star} filled={registration.feedback.rating >= star} />)}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const ReportCard = ({ title, data, columns, renderRow }) => (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 text-white w-full">
            <h3 className="font-bold text-lg mb-4">{title}</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-white/20">
                            {columns.map(col => <th key={col} className="p-2">{col}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? data.map(renderRow) : (
                            <tr><td colSpan={columns.length} className="p-4 text-center text-gray-400">Click "Generate Reports" to view data.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    // --- Main Render Logic ---
    if (isLoading) {
        return <div className="bg-gray-900 min-h-screen flex items-center justify-center"><LoaderIcon/></div>;
    }

    return (
        <div className="bg-gray-900 min-h-screen font-sans text-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"' }}>
            <div className="bg-cover bg-center bg-fixed" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2940&auto=format&fit=crop)'}}>
                <div className="bg-black/60 min-h-screen backdrop-blur-sm">
                    <div className="container mx-auto p-4 max-w-4xl">
                        
                        <header className="flex justify-between items-center py-4 mb-6">
                            <h1 className="text-2xl font-bold tracking-wider">EventHub</h1>
                            <div className="bg-black/30 p-1 rounded-full flex text-sm">
                                <button onClick={() => setCurrentView('student')} className={`px-4 py-1 rounded-full transition-colors ${currentView === 'student' ? 'bg-blue-600' : ''}`}>Student</button>
                                <button onClick={() => setCurrentView('admin')} className={`px-4 py-1 rounded-full transition-colors ${currentView === 'admin' ? 'bg-blue-600' : ''}`}>Admin</button>
                            </div>
                        </header>

                        {currentView === 'student' && (
                            <div>
                                <div className="bg-black/30 p-1 rounded-full flex text-sm w-full max-w-sm mx-auto mb-6">
                                    <button onClick={() => setActiveStudentTab('events')} className={`w-1/2 py-2 rounded-full transition-colors ${activeStudentTab === 'events' ? 'bg-white/20' : ''}`}>Browse Events</button>
                                    <button onClick={() => setActiveStudentTab('my-registrations')} className={`w-1/2 py-2 rounded-full transition-colors ${activeStudentTab === 'my-registrations' ? 'bg-white/20' : ''}`}>My Registrations</button>
                                </div>
                                {activeStudentTab === 'events' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {events.map(event => <EventCard key={event.id} event={event} />)}
                                    </div>
                                )}
                                {activeStudentTab === 'my-registrations' && (
                                    <div className="space-y-4">
                                        {userRegistrations.length > 0 ? (
                                            userRegistrations.map(reg => <MyRegistrationCard key={reg.id} registration={reg} />)
                                        ) : (
                                            <p className="text-center text-gray-400 mt-8">You haven't registered for any events yet.</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {currentView === 'admin' && (
                            <div className="flex flex-col items-center gap-6">
                                <button 
                                    onClick={generateReports} 
                                    disabled={isGeneratingReports}
                                    className="bg-green-600 hover:bg-green-500 disabled:bg-gray-500 px-8 py-3 rounded-xl font-semibold text-lg transition-colors flex items-center gap-2"
                                >
                                    {isGeneratingReports ? <LoaderIcon /> : <BarChartIcon />}
                                    {isGeneratingReports ? 'Generating...' : 'Generate Reports'}
                                </button>
                                
                                <ReportCard
                                    title="Event Popularity"
                                    data={adminReports.eventPopularity}
                                    columns={['Event', 'Registrations', 'Attendance %', 'Avg. Feedback']}
                                    renderRow={(item, index) => (
                                        <tr key={item.id} className="border-b border-white/10 hover:bg-white/5">
                                            <td className="p-2 font-semibold">{item.name}</td>
                                            <td className="p-2 text-center">{item.registrations}</td>
                                            <td className="p-2 text-center">{item.attendancePercentage}%</td>
                                            <td className="p-2 text-center">{item.avgFeedback}</td>
                                        </tr>
                                    )}
                                />
                                <ReportCard
                                    title="Top 3 Most Active Students"
                                    data={adminReports.topStudents}
                                    columns={['Rank', 'Student Name', 'Events Attended']}
                                    renderRow={(item, index) => (
                                        <tr key={item.id} className="border-b border-white/10 hover:bg-white/5">
                                            <td className="p-2 font-semibold">{index + 1}</td>
                                            <td className="p-2">{item.name}</td>
                                            <td className="p-2 text-center">{item.eventsAttended}</td>
                                        </tr>
                                    )}
                                />
                                 <ReportCard
                                    title="Student Participation Report"
                                    data={adminReports.studentParticipation}
                                    columns={['Student Name', 'Events Attended']}
                                    renderRow={(item, index) => (
                                        <tr key={item.id} className="border-b border-white/10 hover:bg-white/5">
                                            <td className="p-2">{item.name}</td>
                                            <td className="p-2 text-center">{item.eventsAttended}</td>
                                        </tr>
                                    )}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {selectedEvent && (
                <EventDetailModal 
                    event={selectedEvent} 
                    onBack={() => setSelectedEvent(null)}
                    onRegister={handleRegister}
                />
            )}
        </div>
    );
}
