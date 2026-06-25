import { useEffect } from "react";

export default function Datenschutz() {
  useEffect(() => {
    document.title = "Datenschutzerklärung — Privacy Policy | MediSpire";
  }, []);

  return (
    <div className="w-full">
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Datenschutzerklärung</h1>
          <p className="text-xl text-primary-foreground/80">Privacy Policy</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl prose dark:prose-invert">
          <h2>1. An overview of data protection</h2>
          <h3>General information</h3>
          <p>
            The following information will provide you with an easy to navigate overview of what will happen with your personal data when you visit this website. The term "personal data" comprises all data that can be used to personally identify you.
          </p>
          
          <h3>Data recording on this website</h3>
          <p>
            <strong>Who is the responsible party for the recording of data on this website (i.e., the "controller")?</strong><br />
            The data on this website is processed by the operator of the website. For contact details, please refer to the "Impressum" (Legal Notice) section.
          </p>
          <p>
            <strong>How do we record your data?</strong><br />
            We collect your data as a result of your sharing of your data with us. This may, for instance be information you enter into our contact form. Other data shall be recorded by our IT systems automatically or after you consent to its recording during your website visit. This data comprises primarily technical information (e.g., web browser, operating system, or time the site was accessed).
          </p>
          
          <h2>2. General information and mandatory information</h2>
          <h3>Data protection</h3>
          <p>
            The operators of this website and its pages take the protection of your personal data very seriously. Hence, we handle your personal data as confidential information and in compliance with the statutory data protection regulations and this Data Protection Declaration.
          </p>
          
          <h3>Information about the responsible party (referred to as the "controller" in the GDPR)</h3>
          <p>
            The data processing controller on this website is:<br />
            Medispire UG<br />
            Emsdettener Str. 10, 48268 Greven, Germany<br />
            Email: medispire.de@gmail.com
          </p>

          <h2>3. Data recording on this website</h2>
          <h3>Cookies</h3>
          <p>
            Our websites and pages use what the industry refers to as "cookies." Cookies are small text files that do not cause any damage to your device. They are either stored temporarily for the duration of a session (session cookies) or they are permanently archived on your device (permanent cookies). Session cookies are automatically deleted once you terminate your visit.
          </p>
          
          <h3>Contact form</h3>
          <p>
            If you submit inquiries to us via our contact form, the information provided in the contact form as well as any contact information provided therein will be stored by us in order to handle your inquiry and in the event that we have further questions. We will not share this information without your consent.
          </p>
          
          <h2>4. Your Rights</h2>
          <p>
            You have the right to request information about your archived personal data, its origin, its recipients, and the purpose of its collection at any time. You also have the right to request that it be rectified or eradicated. If you have consented to data processing, you may revoke this consent at any time, which shall affect all future data processing.
          </p>
        </div>
      </section>
    </div>
  );
}
