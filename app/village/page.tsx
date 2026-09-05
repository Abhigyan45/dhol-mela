import Navbar from "@/components/Navbar";

export default function VillagePage() {
  return (
    <main>
      <Navbar />
      <section className="max-w-3xl mx-auto px-4 py-16 space-y-12">
        <div>
          <h1 className="text-3xl font-bold mb-4">🏡 Welcome to Our Village: Songadhwa</h1>
          <p className="text-gray-700 leading-relaxed">
            Located in the serene heart of the Kuchaikote block in the Gopalganj district of Bihar, Songadhwa
            (also known as Songharwa) is a beautiful, tight-knit community grounded in rich agrarian roots,
            shared values, and centuries-old cultural traditions. Guided by our local PIN code 841425, our
            village seamlessly balances peaceful rural life with a vibrant, modernizing outlook.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">👨‍👩‍👧‍👦 Population & Community Life</h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Total Population:</strong> Home to roughly 2,500 to 3,000 residents.</li>
            <li><strong>Our Culture:</strong> Life in Songadhwa is quiet, green, and peaceful — most families thrive on farming, growing lush fields of sugarcane and grain.</li>
            <li><strong>Unity in Diversity:</strong> Neighbors live together like an extended family. From dynamic night processions to local markets, the village is defined by a powerful sense of brotherhood and mutual support.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">🛕 Notable Landmarks, Temples & Schools</h2>
          <h3 className="font-semibold mb-2">Spiritual Centers</h3>
          <ul className="space-y-2 text-gray-700 list-disc list-inside mb-4">
            <li><strong>The Local Hanuman Mandir:</strong> The heart of our community, especially during the Dol Mela, where youth gather to offer prayers and Nishan (holy flags) before processions.</li>
            <li><span className="text-red-600">[Insert Name]</span> Temple: A peaceful spiritual spot where village families gather every morning and evening for daily prayers and community discussions.</li>
          </ul>
          <h3 className="font-semibold mb-2">Education & Services</h3>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li><strong>Our Village Schools:</strong> Songadhwa is home to <span className="text-red-600">[Insert School Name, e.g., Rajkiya Prathmik Vidyalaya]</span>, ensuring a strong educational foundation right within the village.</li>
            <li><strong>Songharwa Post Office & Services:</strong> Our local Branch Post Office ensures the village stays connected with essential digital and financial services.</li>
          </ul>
        </div>

        <div className="bg-orange-50 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-3">⭐ What Makes Us Proud</h2>
          <ul className="space-y-3 text-gray-700">
            <li><strong>Home of Akhra No. 7:</strong> Widely recognized across Gopalganj district for the legendary Songadhwa Akhra No-7 Dol Mela — the discipline, bravery, and grandeur of the annual parade make the village a symbol of pride for miles around.</li>
            <li><strong>Preserving Ancient Martial Arts:</strong> In an era of smartphones, the youth of the village keep ancestral roots alive by mastering Lathi-Khel (stick fighting) and defensive sword play.</li>
            <li><strong>Hardworking Spirit:</strong> From farmers feeding the region to young professionals building careers in major cities, the people of Songadhwa are known for honesty, resilience, and an unshakeable work ethic.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}