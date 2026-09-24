// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function SponsorsSection() {
//   const sponsors = await prisma.sponsor.findMany({ orderBy: { order: "asc" } });
//   if (sponsors.length === 0) return null;

//   // return (
//   //   <section className="max-w-6xl mx-auto px-4 py-12">
//   //     <h2 className="text-2xl font-bold mb-6 text-center">🤝 Our Sponsors</h2>
//   //     <div className="flex flex-wrap justify-center gap-8">
//   //       {sponsors.map((s: typeof sponsors[number]) => (
//   //         <div key={s.id} className="text-center">
//   //           {s.logoUrl ? (
//   //             <img src={s.logoUrl} alt={s.name} className="h-16 object-contain mx-auto mb-2" />
//   //           ) : (
//   //             <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-2 font-bold text-gray-500">
//   //               {s.name[0]}
//   //             </div>
//   //           )}
//   //           <p className="font-semibold text-sm">{s.name}</p>
//   //           {s.contribution && <p className="text-xs text-gray-500">{s.contribution}</p>}
//   //         </div>
//   //       ))}
//   //     </div>
//   //   </section>
//   // );
//   return (
//   <section className="bg-amber-50 py-12">
//     <div className="max-w-6xl mx-auto px-4">
//       <h2 className="text-2xl font-bold mb-6 text-center">🤝 Our Sponsors</h2>
//       <div className="flex flex-wrap justify-center gap-8">
//         {sponsors.map((s: typeof sponsors[number]) => (
//           <div key={s.id} className="text-center">
//             {s.logoUrl ? (
//               <img src={s.logoUrl} alt={s.name} className="h-16 object-contain mx-auto mb-2" />
//             ) : (
//               <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-2 font-bold text-gray-500">
//                 {s.name[0]}
//               </div>
//             )}
//             <p className="font-semibold text-sm">{s.name}</p>
//             {s.contribution && <p className="text-xs text-gray-500">{s.contribution}</p>}
//           </div>
//         ))}
//       </div>
//     </div>
//   </section>
// );
// }

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function SponsorsSection() {
  const sponsors = await prisma.sponsor.findMany({ orderBy: { order: "asc" } });
  if (sponsors.length === 0) return null;

  return (
    <section className="bg-amber-50 py-12 overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 text-center">🤝 Our Sponsors</h2>

      <div className="flex">
        <div className="marquee-track">
          {[0, 1].map((rep) => (
            <div key={rep} className="flex items-center">
              {sponsors.map((s: typeof sponsors[number]) => (
                <div key={`${rep}-${s.id}`} className="flex flex-col items-center mx-8 shrink-0 w-24">
                  {s.logoUrl ? (
                    <img src={s.logoUrl} alt={s.name} className="h-16 w-16 object-contain mb-2" />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center mb-2 font-bold text-gray-500 text-xl">
                      {s.name[0]}
                    </div>
                  )}
                  <p className="font-semibold text-sm text-center whitespace-nowrap">{s.name}</p>
                  {s.contribution && <p className="text-xs text-gray-500 text-center whitespace-nowrap">{s.contribution}</p>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}