import Navbar from "@/components/Navbar";

const schedule = [
  { time: "6:00 AM", title: "Puja / Prayers", description: "The day begins with traditional prayers and rituals." },
  { time: "10:00 AM", title: "Dhol Performances", description: "Traditional dhol performances by village groups." },
  { time: "2:00 PM", title: "Lunch / Prasad Distribution", description: "Community lunch and prasad distribution for all attendees." },
  { time: "10:00 PM", title: "Cultural Program", description: "Evening cultural performances closing out the day." },
];

export default function SchedulePage() {
  return (
    <main>
      <Navbar />
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-2">🗓️ Event Schedule</h1>
        <p className="text-gray-600 mb-10">October 15, 2026 — Songadhwa, Bairagitola</p>

        <div className="relative border-l-2 border-orange-200 pl-8 space-y-10">
          {schedule.map((item, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-orange-600 border-4 border-white" />
              <p className="text-orange-600 font-semibold text-sm mb-1">{item.time}</p>
              <h3 className="text-lg font-bold mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}