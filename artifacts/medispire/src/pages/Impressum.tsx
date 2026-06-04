import { useEffect } from "react";

export default function Impressum() {
  useEffect(() => {
    document.title = "Impressum — Legal Notice | MediSpire";
  }, []);

  return (
    <div className="w-full">
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Impressum</h1>
          <p className="text-xl text-primary-foreground/80">Legal Notice</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl prose dark:prose-invert">
          <h2>Medispire UG</h2>
          <p>
            Address: Emsdettener Str. 10, 48268 Greven, Germany<br />
            Email: <a href="mailto:info.medispire@gmail.com">info.medispire@gmail.com</a><br />
            Phone: <a href="tel:+491626498523">+49 162 649 8523</a>
          </p>

          <h3>Responsible for content</h3>
          <p>Dr. Sandeep Amin & Dr. Sangeeta Pai</p>

          <h3>Website</h3>
          <p><a href="https://medispire.de">medispire.de</a></p>

          <h3>Liability for Content</h3>
          <p>
            As service providers, we are liable for own contents of these websites according to Sec. 7, paragraph 1 German Telemedia Act (TMG). However, according to Sec. 8 to 10 German Telemedia Act (TMG), service providers are not obligated to permanently monitor submitted or stored information or to search for evidences that indicate illegal activities.
          </p>
          <p>
            Legal obligations to removing information or to blocking the use of information remain unchallenged. In this case, liability is only possible at the time of knowledge about a specific violation of law. Illegal contents will be removed immediately at the time we get knowledge of them.
          </p>

          <h3>Liability for Links</h3>
          <p>
            Our offer includes links to external third party websites. We have no influence on the contents of those websites, therefore we cannot guarantee for those contents. Providers or administrators of linked websites are always responsible for their own contents.
          </p>

          <h3>Copyright</h3>
          <p>
            Contents and compilations published on these websites by the providers are subject to German copyright laws. Reproduction, editing, distribution as well as the use of any kind outside the scope of the copyright law require a written permission of the author or originator. Downloads and copies of these websites are permitted for private use only.
          </p>
        </div>
      </section>
    </div>
  );
}
