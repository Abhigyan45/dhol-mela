import Navbar from "@/components/Navbar";

const milestones = [
  { year: "[XXXX]", title: "The First Grand Dol", description: "Transitioned from carrying traditional flags to building the first monumental, beautifully decorated Dol — marking entry into the mainstream Dol Mela celebrations of Gopalganj." },
  { year: "[XXXX]", title: "Youth Martial Arts Excellence", description: "Village youth gained widespread recognition across the district for exceptional skills in Lathi-Khel (stick fighting) and traditional sword displays, winning accolades in regional friendly competitions." },
  { year: "[XXXX]", title: "The Modern Sound Revolution", description: "Introduced state-of-the-art modern sound systems and lighting, making the night procession one of the most energetic and heavily attended events in the area." },
  { year: "[XXXX]", title: "Community Infrastructure Growth", description: "The Akhra committee officially structured the Mela layout — introducing dedicated food zones, volunteer-led safety teams, and organized parking to accommodate thousands of outside visitors." },
];

export default function HistoryPage() {
  return (
    <main>
      <Navbar />
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">📜 History of Songadhwa Akhra No-7 Dol Mela</h1>

        <p className="text-gray-700 leading-relaxed mb-8">
          The Songadhwa Akhra No-7 Dol Mela is not just a festival; it is a living legacy of our village's
          unity, bravery, and deep-rooted faith. For decades, our Akhra has stood as a symbol of pride in the
          Gopalganj district, preserving the rich traditions of the Mahaviri Akhada and Dol processions.
        </p>

        <h2 className="text-2xl font-bold mb-3">🌱 When & Why It Started</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          The roots of our mela trace back to <span className="text-red-600 font-semibold">[Insert Year, e.g., 1975]</span> when
          the elders and youth of Songadhwa village came together to establish Akhra No. 7.
        </p>
        <ul className="space-y-2 text-gray-700 list-disc list-inside mb-8">
          <li><strong>The Vision:</strong> Founded under the leadership of <span className="text-red-600">[Insert Founder Name / The Village Elders]</span>.</li>
          <li><strong>The Purpose:</strong> To bring the community together, encourage youth to practice traditional physical fitness (martial arts, lathi, and sword fighting), and celebrate the divine blessings of Lord Hanuman during the festive season.</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mb-12">
          What began as a small, humble gathering with a single holy flag (Nishan) has today grown into one of
          the most anticipated grand festivals in the region.
        </p>

        <h2 className="text-2xl font-bold mb-6">🏆 Major Milestones Over the Years</h2>
        <div className="relative border-l-2 border-orange-200 pl-8 space-y-10 mb-12">
          {milestones.map((m, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-orange-600 border-4 border-white" />
              <p className="text-orange-600 font-semibold text-sm mb-1">{m.year}</p>
              <h3 className="text-lg font-bold mb-1">{m.title}</h3>
              <p className="text-gray-600 text-sm">{m.description}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-3">🤝 Carrying the Legacy Forward</h2>
        <p className="text-gray-700 leading-relaxed">
          Today, the third generation of Songadhwa village is leading Akhra No. 7. While modern tech and
          massive DJ setups have enhanced the scale of the festival, the core values of brotherhood, devotion,
          and cultural pride remain exactly as they were on day one.
        </p>
      </section>
    </main>
  );
}