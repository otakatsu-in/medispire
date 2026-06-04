import { useEffect } from "react";

export default function Terms() {
  useEffect(() => {
    document.title = "Terms of Service | MediSpire";
  }, []);

  return (
    <div className="w-full">
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-primary-foreground/80">Rules and Guidelines</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl prose dark:prose-invert">
          <h2>1. Terms of Use</h2>
          <p>
            By accessing or using the services provided by Medispire UG ("MediSpire", "we", "us", or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>

          <h2>2. Description of Services</h2>
          <p>
            MediSpire provides consultation, guidance, and document review services for healthcare professionals seeking to relocate and work in Germany. We are consultants offering advice based on personal and professional experience, not legal representatives or state authority officials.
          </p>

          <h2>3. No Guarantee of Placement</h2>
          <p>
            While we provide extensive support, CV optimization, and interview preparation, we do not guarantee job placement, successful visa applications, or the successful issuance of the Approbation or Berufserlaubnis. These decisions are at the sole discretion of the respective German state authorities and employers.
          </p>

          <h2>4. Payment Terms</h2>
          <p>
            Some of our services are offered as paid packages. Payment must be made in advance or as agreed upon in a specific service contract. All fees are non-refundable unless expressly stated otherwise in writing. Prices are subject to change, but changes will not affect already booked and paid services.
          </p>

          <h2>5. Cancellation Policy</h2>
          <p>
            Consultations can be rescheduled or cancelled up to 24 hours prior to the scheduled time without penalty. Cancellations made less than 24 hours in advance or no-shows may not be eligible for a refund.
          </p>

          <h2>6. User Responsibilities</h2>
          <p>
            You agree to provide accurate, current, and complete information regarding your qualifications, documents, and personal details. MediSpire is not liable for any delays, rejections, or issues arising from false or incomplete information provided by you.
          </p>

          <h2>7. Intellectual Property</h2>
          <p>
            All content, guides, checklists, and materials provided by MediSpire remain our intellectual property. You may not distribute, reproduce, or resell these materials without our explicit written permission.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, MediSpire shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, resulting from your use of our services.
          </p>
        </div>
      </section>
    </div>
  );
}
