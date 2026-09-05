import Navbar from "@/components/Navbar";

const LAT = 26.583427;
const LNG = 84.279223;

export default function LocationPage() {
  const mapSrc = `https://www.google.com/maps?q=${LAT},${LNG}&hl=en&z=15&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;

  return (
    <main>
      <Navbar />
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-2">📍 Location</h1>
        <p className="text-gray-600 mb-6">
          Songadhwa, Bairagitola village, Gopalganj district, Bihar
        </p>
        <div className="rounded-2xl overflow-hidden border aspect-video">
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mela Location Map"
          />
        </div>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-5 py-2 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700"
        >
          Get Directions
        </a>
      </section>
    </main>
  );
}