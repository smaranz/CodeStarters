import { jsPDF } from "jspdf";

export function generateVolunteerCertificate(opts: {
  volunteerName: string;
  activityDescription: string;
  hours: number;
  approvedDate: string;
}): Buffer {
  const { volunteerName, activityDescription, hours, approvedDate } = opts;
  const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "letter" });

  const W = 612;
  const margin = 60;

  // Header bar
  doc.setFillColor(22, 163, 74); // brand green
  doc.rect(0, 0, W, 90, "F");

  // Organization name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text("CodeStarters", margin, 40);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Empowering the Next Generation in CS & AI", margin, 58);

  doc.setFontSize(9);
  doc.text(`EIN: 81-2908499  |  codestarters26@gmail.com`, margin, 74);

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(15, 15, 15);
  doc.text("VOLUNTEER SERVICE VERIFICATION", W / 2, 145, { align: "center" });

  // Divider
  doc.setDrawColor(22, 163, 74);
  doc.setLineWidth(2);
  doc.line(margin, 160, W - margin, 160);

  // Body
  const lineH = 28;
  let y = 200;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(50, 50, 50);

  const field = (label: string, value: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(22, 163, 74);
    doc.text(label.toUpperCase(), margin, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(13);
    doc.setTextColor(15, 15, 15);
    const wrapped = doc.splitTextToSize(value, W - margin * 2);
    doc.text(wrapped, margin, y);
    y += wrapped.length * lineH;
  };

  field("Volunteer Name", volunteerName);
  y += 6;
  field("Activity / Service Description", activityDescription);
  y += 6;
  field("Total Hours", `${hours} hour${hours === 1 ? "" : "s"}`);
  y += 6;
  field("Date Verified", approvedDate);

  // Statement
  y += 20;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(margin, y, W - margin, y);
  y += 20;

  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  const statement =
    "This document certifies that the above-named individual has completed the stated volunteer service with CodeStarters. " +
    "CodeStarters is a student-led 501(c)(3) fiscal sponsor project (EIN: 81-2908499). " +
    "This letter may be presented to schools, scholarship programs, or other organizations as proof of volunteer service.";
  const stLines = doc.splitTextToSize(statement, W - margin * 2);
  doc.text(stLines, margin, y);
  y += stLines.length * 15 + 40;

  // Signature line
  doc.setDrawColor(15, 15, 15);
  doc.setLineWidth(0.8);
  doc.line(margin, y, margin + 200, y);
  y += 14;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(15, 15, 15);
  doc.text("Authorized by CodeStarters", margin, y);
  y += 14;
  doc.setTextColor(80, 80, 80);
  doc.text("codestarters26@gmail.com", margin, y);

  // Footer
  doc.setFillColor(245, 245, 245);
  doc.rect(0, 720, W, 72, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text("CodeStarters  ·  EIN 81-2908499  ·  codestarters26@gmail.com  ·  codestarters.xyz", W / 2, 745, { align: "center" });
  doc.text(`Generated ${approvedDate}`, W / 2, 760, { align: "center" });

  return Buffer.from(doc.output("arraybuffer"));
}
