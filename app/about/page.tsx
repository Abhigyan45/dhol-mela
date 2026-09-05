import Navbar from "@/components/Navbar";

export default function AboutMelaPage() {
  return (
    <main>
      <Navbar />
      <section className="max-w-3xl mx-auto px-4 py-16 space-y-12">
        <div>
          <h1 className="text-3xl font-bold mb-4">🥁 About Songadhwa Akhra No-7 Dol Mela</h1>
          <p className="text-gray-700 leading-relaxed">
            Welcome to the official page of the Songadhwa Akhra No-7 Dol Mela, Gopalganj. This annual
            celebration is the pride of our village, bringing together the spirit of devotion, bravery, and
            community. Organized by Songadhwa Akhra No. 7, our Dol Mela is famous throughout the Gopalganj
            district for its magnificent Dols (holy floats), high-energy traditional martial arts, and vibrant
            cultural celebrations.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">⏰ Opening & Closing Times</h2>
          <p className="text-gray-700 mb-3">
            Our village mela follows a traditional two-day schedule, transitioning from a high-energy night
            procession into a bustling daytime carnival.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Day 1 (The Grand Procession):</strong> Starts at 4:00 PM and runs overnight until 8:00 AM the following morning.</li>
            <li><strong>Day 2 (The Main Fair/Mela):</strong> Stalls and family entertainment open from 10:00 AM and conclude around 10:00 PM.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">🙏 Religious Programme</h2>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li><strong>Mahaviri Akhada Processions:</strong> The core spiritual element of the Mela — Songadhwa Akhra No. 7 brings out holy flags (Nishan) to honor Lord Hanuman.</li>
            <li><strong>The Holy Dols:</strong> Beautifully decorated, monumental structures representing local deities, paraded through the village streets.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">🥁 Dhol & Music Programme</h2>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li><strong>Traditional Dhol & Tasha:</strong> Rhythmic, heavy drum beats as local youth perform synchronized drumming.</li>
            <li><strong>Mega DJ Outfits:</strong> Modern sound setups light up the night with music and friendly competition between local groups.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">🎭 Cultural Programme</h2>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li><strong>Traditional Lathi & Sword Fighting:</strong> Akhada members display ancient martial arts skills with breathtaking mock-fights.</li>
            <li><strong>Folk Dance & Stage Performances:</strong> Local artists present traditional folk songs and performances during the daytime carnival.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">🎪 Visitor Facilities</h2>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li><strong>Food Stalls & Bazaars:</strong> A massive open-air food street with Litti Chokha, Jalebi, Chat, and local sweets.</li>
            <li><strong>Medical Help Desk:</strong> A dedicated first-aid booth managed by village volunteers near the main entry points.</li>
            <li><strong>Designated Parking:</strong> Free parking grounds for two-wheelers and four-wheelers set up on the outskirts of the village entry points.</li>
          </ul>
        </div>

        <div className="bg-orange-50 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-3">🚨 Emergency Contact Information</h2>
          <p className="text-gray-700 mb-3">
            For assistance, crowd control, or medical emergencies, please reach out to our village control booth:
          </p>
          <ul className="space-y-1 text-gray-700">
            <li><strong>Songadhwa Akhra No. 7 Committee:</strong> <span className="text-red-600 font-mono">+91-XXXXX-XXXXX</span> <span className="text-xs text-gray-500">(replace with actual number)</span></li>
            <li><strong>Local Police Helpline (Gopalganj):</strong> 112 / 100</li>
            <li><strong>Ambulance Services:</strong> 102</li>
          </ul>
        </div>
      </section>
    </main>
  );
}