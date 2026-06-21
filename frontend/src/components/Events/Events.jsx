import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import EventCard from "./EventCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (isLoading || !allEvents || allEvents.length === 0) return;

    const ctx = gsap.context(() => {
      // ── Heading reveal ──
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          x: -40, opacity: 0, duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      }

      // ── Event card reveal ──
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          y: 50, opacity: 0, duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [allEvents, isLoading]);

  return (
    <div ref={sectionRef}>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1 ref={headingRef}>Popular Events</h1>
          </div>

          <div className="w-full grid">
            {allEvents.length !== 0 && (
              <div ref={cardRef}>
                <EventCard data={allEvents && allEvents[0]} />
              </div>
            )}
            <h4>{allEvents?.length === 0 && "No Events have!"}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
