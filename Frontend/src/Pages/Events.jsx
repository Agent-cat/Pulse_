import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Helper component for modern, minimalist icons
const Icon = ({ path, className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const formatSpecialTitle = (title) => {
  if (!title) return "";
  return title.replace(
    /^(\w)(\w*)/,
    (match, first, rest) => `${first}<b>${rest}</b>`
  );
};

const EventButton = ({ onClick, children, className, disabled = false }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    disabled={disabled}
    className={`mt-4 px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${className}`}
  >
    {children}
  </button>
);

const ParticipantMeter = ({ current, limit }) => {
  const percentage = limit > 0 ? (current / limit) * 100 : 0;
  return (
    <div className="w-full md:w-48">
      <div className="flex justify-between items-center text-xs font-mono mb-1">
        <span className="text-gray-400">Participants</span>
        <span className="text-white font-bold">
          {current}/{limit}
        </span>
      </div>
      <div className="w-full bg-black/50 border border-gray-600 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-green-500 to-green-400 h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const Events = () => {
  const url = import.meta.env.VITE_API_URL;
  const [events, setEvents] = useState([]);
  const [eventView, setEventView] = useState("current");
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();
  const [showSuccessPopup, setShowSuccessPopup] = useState({
    show: false,
    message: "",
  });
  const [apiError, setApiError] = useState(null);
  const [formError, setFormError] = useState(null);

  const container = useRef();
  const popupsRef = useRef(null);

  // Prevent background scroll when popup is open
  useEffect(() => {
    document.body.style.overflow =
      showRegisterPopup || showSuccessPopup.show ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showRegisterPopup, showSuccessPopup.show]);

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${url}/api/events`);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setApiError("Failed to load events. Please try again later.");
      }
    };
    fetchEvents();
  }, [url]);

  // GSAP animations
  useGSAP(
    () => {
      gsap.fromTo(
        ".animate-in",
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.2,
        }
      );
      if (showRegisterPopup || showSuccessPopup.show) {
        gsap.fromTo(
          popupsRef.current,
          { opacity: 0, scale: 0.95, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
        );
      }
    },
    {
      scope: container,
      dependencies: [events, showRegisterPopup, showSuccessPopup.show],
    }
  );

  // Filter events by current/past
  const filterEvents = (events) => {
    if (!Array.isArray(events)) {
      return { pastEvents: [], currentEvents: [] };
    }
    const now = new Date();
    const pastEvents = [];
    const currentEvents = [];

    events.forEach((category) => {
      const pastCategory = { ...category, Events: [] };
      const currentCategory = { ...category, Events: [] };

      if (Array.isArray(category.Events)) {
        category.Events.forEach((event) => {
          const eventEndTime = new Date(
            `${event.details.date} ${event.details.endTime}`
          );
          if (eventEndTime < now) {
            pastCategory.Events.push(event);
          } else {
            currentCategory.Events.push(event);
          }
        });
      }

      if (pastCategory.Events.length > 0) {
        pastEvents.push(pastCategory);
      }
      if (currentCategory.Events.length > 0) {
        currentEvents.push(currentCategory);
      }
    });

    return { pastEvents, currentEvents };
  };

  const { pastEvents, currentEvents } = filterEvents(events);
  const displayedEvents = eventView === "current" ? currentEvents : pastEvents;

  // Event Handlers
  const handleToggleEvent = (eventId) =>
    setExpandedEvent(expandedEvent === eventId ? null : eventId);

  const handleRegisterClick = (category, event) => {
    if (eventView === "past") {
      setFormError("You cannot register for past events.");
      return;
    }
    setSelectedEvent({ ...event, categoryId: category._id });
    setShowRegisterPopup(true);
  };

  const handleUnregisterClick = async (category, event) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      await fetch(
        `${url}/api/events/${category._id}/events/${event._id}/unregister`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );
      const response = await axios.get(`${url}/api/events`);
      setEvents(response.data);
      setShowSuccessPopup({
        show: true,
        message: "Successfully unregistered from the event!",
      });
    } catch (err) {
      setFormError("Failed to unregister. Please try again.");
    }
  };

  const handleRegistrationSubmit = async () => {
    if (!acceptedTerms) {
      setFormError("You must accept the terms and conditions to register.");
      gsap.fromTo(
        popupsRef.current,
        { x: 0 },
        { x: -10, duration: 0.05, yoyo: true, repeat: 5, ease: "power2.inOut" }
      );
      return;
    }
    setFormError(null);
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await fetch(
        `${url}/api/events/${selectedEvent.categoryId}/events/${selectedEvent._id}/register`,
        { method: "POST", headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      if (!response.ok) {
        if (data.conflictingEvent) {
          setFormError(
            `Time Conflict: You are already registered for "${data.conflictingEvent.title}" at ${data.conflictingEvent.time} on ${data.conflictingEvent.date}`
          );
        } else {
          throw new Error(data.message || "Failed to register.");
        }
        return;
      }

      setShowRegisterPopup(false);
      setAcceptedTerms(false);
      setSelectedEvent(null);
      setShowSuccessPopup({
        show: true,
        message: "You have successfully registered for the event!",
      });
      const eventsResponse = await axios.get(`${url}/api/events`);
      setEvents(eventsResponse.data);
    } catch (err) {
      setFormError(err.message);
    }
  };

  // Popup Components
  const SuccessPopup = () => (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div
        ref={popupsRef}
        className="bg-gray-900 border border-gray-700 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl shadow-green-500/10"
      >
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-500/20 mb-4 border-2 border-green-500/50">
          <Icon
            path="M4.5 12.75l6 6 9-13.5"
            className="h-8 w-8 text-green-400"
          />
        </div>
        <h3
          className="text-2xl font-bold text-white mb-2 special-font"
          dangerouslySetInnerHTML={{ __html: formatSpecialTitle("Success!") }}
        ></h3>
        <p className="text-gray-300 mb-6">{showSuccessPopup.message}</p>
        <button
          onClick={() => setShowSuccessPopup({ show: false, message: "" })}
          className="w-full bg-green-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-green-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Close
        </button>
      </div>
    </div>
  );

  const RegisterPopup = () => (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div
        ref={popupsRef}
        className="bg-gray-900 border border-gray-700 p-6 sm:p-8 rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl shadow-green-500/10"
      >
        <h3
          className="text-2xl font-bold text-green-400 mb-1 special-font"
          dangerouslySetInnerHTML={{
            __html: formatSpecialTitle(`Register for ${selectedEvent?.title}`),
          }}
        ></h3>
        <p className="text-gray-400 mb-6">
          Review the terms before confirming.
        </p>
        <div className="flex-grow overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          <div className="bg-black/50 p-4 rounded-lg text-gray-300 text-sm border border-gray-700">
            <h4 className="font-bold text-white mb-2">Terms & Conditions:</h4>
            <ul className="list-disc pl-5 space-y-2">
              {selectedEvent?.termsandconditions
                ?.split(".")
                .filter((term) => term.trim())
                .map((term, index) => (
                  <li key={index} className="marker:text-green-400">
                    {term.trim()}
                  </li>
                )) || <li>Standard event terms apply.</li>}
            </ul>
          </div>
          <label className="flex items-center gap-3 text-white cursor-pointer mt-4 select-none p-2 rounded-md hover:bg-white/5 transition-colors duration-200">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="appearance-none h-5 w-5 rounded-sm bg-black border-2 border-gray-600 checked:bg-green-500 checked:border-green-400 transition duration-200 focus:ring-2 focus:ring-green-500/50 focus:outline-none"
            />
            I have read and accept the terms and conditions.
          </label>
        </div>
        {formError && (
          <div className="mt-4 p-3 bg-red-900/50 border border-red-500/30 rounded-lg text-red-300 text-sm">
            {formError}
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-700 mt-6">
          <button
            onClick={handleRegistrationSubmit}
            disabled={!acceptedTerms}
            className="flex-1 px-6 py-3 bg-green-500 text-black rounded-lg font-bold transition-all duration-300 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/80 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Confirm Registration
          </button>
          <button
            onClick={() => {
              setShowRegisterPopup(false);
              setFormError(null);
              setAcceptedTerms(false);
            }}
            className="flex-1 sm:flex-initial px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 hover:border-gray-500 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={container}
      className="min-h-screen bg-black blood-donors-background text-gray-200 font-sans overflow-x-hidden"
    >
      <div className="absolute top-36 right-4 z-10 animate-in">
        <button
          onClick={() => navigate("/registered-events")}
          className="px-4 py-2 bg-gray-800  text-gray-300 rounded-full text-sm font-medium border border-gray-700 hover:bg-gray-700 hover:text-white transition-colors duration-300"
        >
          My Events
        </button>
      </div>

      {/* Hero Section */}
      <div className="flex justify-center items-center pt-24 pb-12 sm:pt-32 sm:pb-16 animate-in">
        <h1
          className="text-5xl md:text-7xl font-bold text-white special-font"
          dangerouslySetInnerHTML={{ __html: formatSpecialTitle("EVENTS") }}
        ></h1>
      </div>

      {/* Toggle Section */}
      <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="flex justify-center mb-12 animate-in">
        <div className="flex rounded-full bg-gray-900 border border-gray-700 p-1">
          <button
            onClick={() => setEventView("current")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              eventView === "current"
                ? "bg-green-500 text-black shadow-lg shadow-green-500/25"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            Current Events
          </button>
          <button
            onClick={() => setEventView("past")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              eventView === "past"
                ? "bg-green-500 text-black shadow-lg shadow-green-500/25"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            Past Events
          </button>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4">
        {apiError ? (
          <div className="text-red-400 text-center p-8 bg-gray-900 rounded-lg animate-in border border-gray-700">
            {apiError}
          </div>
        ) : displayedEvents.length > 0 ? (
          displayedEvents.map((category, categoryIndex) => (
            <div key={category._id}>
              {categoryIndex > 0 && (
                <hr className="w-1/2 mx-auto border-t-0 bg-gradient-to-r from-transparent via-green-500/30 to-transparent h-[1px] my-16" />
              )}
              <div className="mb-16 animate-in">
                <div className="mb-8">
                  <h2
                    className="text-3xl md:text-4xl font-bold text-green-400 special-font text-center"
                    dangerouslySetInnerHTML={{
                      __html: formatSpecialTitle(category.categoryName),
                    }}
                  />
                </div>

                {/* Card Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.Events?.map((event) => (
                    <div
                      key={event._id}
                      className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-green-400/70 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10 h-full flex flex-col hover:scale-[1.02] transform-gpu"
                    >
                      {/* Event Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-mono">
                          {event.registeredStudents.length}/
                          {event.participantLimit}
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 flex-grow flex flex-col">
                        <div className="flex-grow">
                          <h3
                            className="text-xl font-bold text-white mb-3 special-font"
                            dangerouslySetInnerHTML={{
                              __html: formatSpecialTitle(event.title),
                            }}
                          ></h3>

                          <div
                            className={`transition-all duration-500 ease-in-out ${
                              expandedEvent === event._id
                                ? "opacity-100 max-h-96"
                                : "opacity-100 max-h-20 overflow-hidden"
                            }`}
                          >
                            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                              {event.details.description}
                            </p>

                            {expandedEvent === event._id && (
                              <div className="space-y-3 text-sm text-gray-400 mb-4">
                                <div className="flex items-center gap-2">
                                  <Icon
                                    path="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                    className="w-4 h-4 text-green-400"
                                  />
                                  <span>{event.details.venue}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Icon
                                    path="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18"
                                    className="w-4 h-4 text-green-400"
                                  />
                                  <span>
                                    {new Date(
                                      event.details.date
                                    ).toLocaleDateString("en-US", {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Icon
                                    path="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    className="w-4 h-4 text-green-400"
                                  />
                                  <span>
                                    {event.details.startTime} -{" "}
                                    {event.details.endTime}
                                  </span>
                                </div>
                                <div className="mt-4">
                                  <ParticipantMeter
                                    current={event.registeredStudents.length}
                                    limit={event.participantLimit}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className="flex flex-col gap-3 mt-auto">
                          <button
                            onClick={() => handleToggleEvent(event._id)}
                            className="text-green-400 text-sm font-medium hover:text-green-300 transition-colors duration-200 flex items-center justify-center gap-2"
                          >
                            {expandedEvent === event._id
                              ? "Show Less"
                              : "Show More"}
                            <Icon
                              path="M19.5 8.25l-7.5 7.5-7.5-7.5"
                              className={`w-4 h-4 transition-transform duration-300 ${
                                expandedEvent === event._id ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {eventView === "current" ? (
                            event.registeredStudents.includes(
                              localStorage.getItem("userId")
                            ) ? (
                              <EventButton
                                onClick={() =>
                                  handleUnregisterClick(category, event)
                                }
                                className="w-full bg-red-600 text-white hover:bg-red-500 focus:ring-red-400"
                              >
                                Unregister
                              </EventButton>
                            ) : event.registeredStudents.length >=
                              event.participantLimit ? (
                              <EventButton
                                disabled
                                className="w-full bg-gray-700 text-gray-400 cursor-not-allowed"
                              >
                                Event Full
                              </EventButton>
                            ) : (
                              <EventButton
                                onClick={() =>
                                  handleRegisterClick(category, event)
                                }
                                className="w-full bg-green-500 text-black hover:bg-green-400 focus:ring-green-400"
                              >
                                Register Now
                              </EventButton>
                            )
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 animate-in">
            <h3
              className="text-2xl font-bold text-gray-400 special-font"
              dangerouslySetInnerHTML={{
                __html: formatSpecialTitle("No Events Found"),
              }}
            ></h3>
            <p className="text-gray-500 mt-2">
              {eventView === "current"
                ? "No current events available."
                : "No past events to display."}
            </p>
          </div>
        )}
      </main>

      {showRegisterPopup && <RegisterPopup />}
      {showSuccessPopup.show && <SuccessPopup />}
    </div>
  );
};

export default Events;
