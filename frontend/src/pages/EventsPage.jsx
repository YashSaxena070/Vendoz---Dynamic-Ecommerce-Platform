import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import Footer from "../components/Layout/Footer";
import styles from "../styles/styles";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  const bannerRef = useRef(null);
  const bannerTextRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Banner image zoom + fade ──
      if (bannerRef.current) {
        const img = bannerRef.current.querySelector("img");
        if (img) {
          gsap.from(img, {
            scale: 1.15, duration: 1.4, ease: "power2.out",
          });
        }
      }

      // ── Banner text stagger ──
      if (bannerTextRef.current) {
        gsap.from(bannerTextRef.current.children, {
          y: 40, opacity: 0, duration: 0.7, stagger: 0.15,
          ease: "power3.out", delay: 0.3,
        });
      }

      // ── Event cards stagger on scroll ──
      if (cardsRef.current && cardsRef.current.children.length > 0) {
        gsap.from(cardsRef.current.children, {
          y: 50, opacity: 0, duration: 0.6, stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    });

    return () => ctx.revert();
  }, [allEvents]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-[#FAF9F6] min-h-screen flex flex-col">
          <Header activeHeading={4} />

          {/* Celebration Banner */}
          <div ref={bannerRef} className="relative w-full h-[320px] overflow-hidden mb-10 shadow-md">
            {/* Background Image */}
            <img 
              src="https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1600" 
              alt="Celebration" 
              className="w-full h-full object-cover filter brightness-[0.45] contrast-[1.15] scale-[1.02]"
            />
            {/* Overlay Text */}
            <div ref={bannerTextRef} className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
              <span className="text-[12px] font-extrabold text-amber-400 uppercase tracking-[0.3em] mb-3 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-400/20 backdrop-blur-sm animate-pulse">
                Special Limited Time Event
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] uppercase">
                Vendoz Super Sale
              </h1>
              <p className="text-sm md:text-lg text-slate-200 mt-4 max-w-xl font-medium drop-shadow-md">
                Don't miss out! Get an <span className="text-amber-400 font-extrabold">extra 50% off</span> on everything in this event.
              </p>
            </div>
          </div>

          <div className={`${styles.section} flex-1`}>
            {allEvents && allEvents.length !== 0 ? (
              <div ref={cardsRef} className="space-y-8 mb-16">
                {allEvents.map((event) => (
                  <EventCard key={event._id} active={true} data={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white border border-slate-150 rounded-3xl max-w-md mx-auto my-12 shadow-sm">
                <h1 className="text-[18px] font-bold text-[#1A1A2E]">
                  No events available!
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Check back later for active events.
                </p>
              </div>
            )}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default EventsPage;
