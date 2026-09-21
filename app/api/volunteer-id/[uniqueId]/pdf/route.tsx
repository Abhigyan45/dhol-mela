import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Document, Page, Text, View, StyleSheet, Image, renderToBuffer } from "@react-pdf/renderer";

const prisma = new PrismaClient();

type VolunteerForPdf = {
  id: string;
  name: string;
  phone: string;
  village: string | null;
  interest: string | null;
  photoUrl: string | null;
  status: string;
  uniqueId: string | null;
  approvedAt: Date | null;
};

const styles = StyleSheet.create({
  page: { padding: 0, backgroundColor: "#FAF3E4" },
  card: { margin: 40, border: "3pt solid #7A1F2B", borderRadius: 12, padding: 30 },
  header: { textAlign: "center", marginBottom: 20 },
  akhraName: { fontSize: 18, fontWeight: 700, color: "#7A1F2B", marginBottom: 4 },
  subtitle: { fontSize: 11, color: "#666" },
  divider: { borderBottom: "1pt solid #E0C88A", marginVertical: 16 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  label: { fontSize: 10, color: "#888" },
  value: { fontSize: 13, fontWeight: 700, color: "#241C1A" },
  idBadge: { textAlign: "center", marginTop: 10, marginBottom: 20 },
  idText: { fontSize: 16, fontWeight: 700, color: "#C9962C", letterSpacing: 1 },
  signatureRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 40 },
  signatureBlock: { textAlign: "center", width: 150 },
  signatureLine: { borderBottom: "1pt solid #333", marginBottom: 4, height: 30 },
  signatureLabel: { fontSize: 9, color: "#666" },
  photo: { width: 70, height: 70, borderRadius: 35, alignSelf: "center", marginBottom: 4, objectFit: "cover" },
});

export async function GET(req: Request, { params }: { params: Promise<{ uniqueId: string }> }) {
  const { uniqueId } = await params;
  const volunteers = await prisma.$queryRaw<VolunteerForPdf[]>`
    SELECT "id", "name", "phone", "village", "interest", "photoUrl", "status", "uniqueId", "approvedAt"
    FROM "Volunteer"
    WHERE "uniqueId" = ${uniqueId}
    LIMIT 1
  `;
  const volunteer = volunteers[0];

  if (!volunteer || volunteer.status !== "approved") {
    return NextResponse.json({ error: "Not found or not approved" }, { status: 404 });
  }

  const doc = (
    <Document>
      <Page size="A5" style={styles.page}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.akhraName}>Songadhwa Akhra No. 7</Text>
            <Text style={styles.subtitle}>Dhol Mela Committee — Official Volunteer ID</Text>
          </View>

          <View style={styles.divider} />

          {volunteer.photoUrl && <Image src={volunteer.photoUrl} style={styles.photo} />}

          <View style={styles.idBadge}>
            <Text style={styles.idText}>{volunteer.uniqueId}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{volunteer.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{volunteer.phone}</Text>
          </View>
          {volunteer.village && (
            <View style={styles.row}>
              <Text style={styles.label}>Village</Text>
              <Text style={styles.value}>{volunteer.village}</Text>
            </View>
          )}
          {volunteer.interest && (
            <View style={styles.row}>
              <Text style={styles.label}>Role</Text>
              <Text style={styles.value}>{volunteer.interest}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Approved On</Text>
            <Text style={styles.value}>
              {volunteer.approvedAt ? new Date(volunteer.approvedAt).toLocaleDateString("en-IN") : ""}
            </Text>
          </View>

          <View style={styles.signatureRow}>
            <View style={styles.signatureBlock}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureLabel}>Committee Signature</Text>
            </View>
            <View style={styles.signatureBlock}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureLabel}>Official Seal</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  const buffer = await renderToBuffer(doc);
  const pdf = Uint8Array.from(buffer);

  return new NextResponse(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${volunteer.uniqueId}.pdf"`,
    },
  });
}