import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react";

const blogPosts = [
  {
    slug: "german-a1-to-c1-roadmap",
    title: "How to Learn German as a Doctor: The Complete A1 to C1 Roadmap",
    category: "German Language",
    author: "Dr. Sandeep Amin",
    date: "November 15, 2024",
    content: `Learning German is often the biggest hurdle for foreign doctors, but it's also the most important investment in your career. Here is a structured approach to getting from zero (A1) to professional proficiency (C1).\n\nThe first step is to focus on general German from A1 to B2. This usually takes 8-12 months of intensive study. It's crucial to build a strong grammatical foundation early on. The B2 certificate (Goethe, Telc, or ÖSD) is mandatory to apply for your Berufserlaubnis (temporary license).\n\nOnce you have your B2, the focus shifts to medical German. This is where you prepare for the Fachsprachprüfung (FSP). The FSP tests your ability to take a patient history (Anamnesegespräch), write a doctor's letter (Arztbrief), and discuss the case with a senior physician (Arzt-Arzt-Gespräch).\n\nTo prepare, you'll need specialized C1 medical courses or coaching. Reading German medical literature, listening to medical podcasts, and practicing role-plays are essential.`
  },
  {
    slug: "fsp-exam-guide",
    title: "What is FSP (Fachsprachprüfung) and How to Crack It",
    category: "FSP & Exams",
    author: "Dr. Sandeep Amin",
    date: "November 8, 2024",
    content: `The Fachsprachprüfung (FSP) is a medical language exam conducted by the State Medical Chamber (Ärztekammer). It does not test your medical knowledge, but rather your ability to communicate effectively in a clinical setting in Germany.\n\nThe exam simulates a real hospital scenario and consists of three parts (20 minutes each):\n\n1. Doctor-Patient Communication: You interview a simulated patient to take their medical history.\n2. Documentation: You write a summary of the patient's history and suspected diagnosis (Arztbrief) under time pressure.\n3. Doctor-Doctor Communication: You present the case to a "senior physician" (the examiners) and answer their questions.\n\nTo pass, you must demonstrate clear, empathetic communication with the patient (using laymen's terms) and precise, professional terminology with colleagues. Practice is key—specifically role-playing under exam conditions.`
  },
  // We include a generic content for the remaining for brevity, but they are fully accessible.
  {
    slug: "approbation-vs-berufserlaubnis",
    title: "Approbation vs Berufserlaubnis: What Indian Doctors Need to Know",
    category: "Medical Licensing",
    author: "Dr. Sandeep Amin",
    date: "October 25, 2024",
    content: `When applying to work in Germany, you will encounter two main types of licenses: Berufserlaubnis and Approbation. Understanding the difference is crucial for your timeline and career planning.\n\nBerufserlaubnis is a temporary, restricted medical license. It allows you to work as an Assistenzarzt (resident) under the supervision of a fully licensed doctor. It is usually valid for up to 2 years and is often tied to a specific hospital or state. This is an excellent way to start earning a salary and gaining practical experience while preparing for your full license.\n\nApprobation is the permanent, unrestricted license to practice medicine in Germany. It is valid nationwide and for life. To get Approbation, you must either prove that your Indian degree is fully equivalent to a German one (via a detailed document check) or pass the Kenntnisprüfung (knowledge exam).`
  },
  {
    slug: "why-germany-over-uk-australia",
    title: "Top 10 Reasons Indian Doctors Are Choosing Germany Over UK, Australia, and Canada",
    category: "Life in Germany",
    author: "Dr. Sandeep Amin",
    date: "October 10, 2024",
    content: `Historically, the UK, Australia, and Canada were the top destinations for Indian medical graduates. However, Germany has rapidly emerged as the preferred choice. Here's why:\n\n1. Straightforward Pathway: Germany has clear, defined rules for foreign doctors. If you learn the language and pass the exams, you get the license.\n2. Less Bottlenecks for Specialization: Unlike the UK or Australia where training posts (residencies) are highly competitive and limited, Germany has a shortage of doctors. Once you have your license, finding a residency spot (Weiterbildung) is relatively easy.\n3. High Salaries and Benefits: Doctors are among the highest earners in Germany, with excellent social security, healthcare, and pension benefits.\n4. Work-Life Balance: Strict labor laws ensure paid overtime, 30 days of paid vacation, and comprehensive parental leave.\n5. Pathway to Permanent Residency: Doctors can often obtain an EU Blue Card quickly, leading to permanent residency in 21-33 months.`
  },
  {
    slug: "indian-nurse-move-to-germany",
    title: "Complete Step-by-Step Guide to Moving to Germany as an Indian Nurse",
    category: "For Nurses",
    author: "Dr. Sangeeta Pai",
    date: "September 28, 2024",
    content: `Germany is facing a massive shortage of nursing staff, creating an unprecedented opportunity for nurses from India. Here is the step-by-step process:\n\nStep 1: Language. You need B1 or B2 German to start. We recommend aiming for B2 to make your work life easier.\nStep 2: Anerkennung (Recognition). Your nursing degree (BSc or GNM) must be assessed by the German authorities. They will issue a Defizitbescheid (deficiency notice) outlining what further training you need.\nStep 3: Adaptation Program. Most foreign nurses complete an adaptation course (Anpassungslehrgang) or take a knowledge exam (Kenntnisprüfung) to bridge the gap. During this time, you can work as an assistant nurse.\nStep 4: Full Recognition. Once completed, you become a fully registered nurse (Pflegefachkraft) with the corresponding salary increase.`
  },
  {
    slug: "work-life-balance-doctors-germany",
    title: "The Truth About Work-Life Balance for Doctors in Germany",
    category: "Life in Germany",
    author: "Dr. Sandeep Amin",
    date: "September 15, 2024",
    content: `One of the most common questions we get is: "Is the work-life balance really that good?" The short answer is yes, compared to many other countries, but it's not without its challenges.\n\nGerman labor laws are strict. A standard work week is 38.5 to 42 hours. Any on-call duties (Bereitschaftsdienst) or overtime are compensated either financially or with time off (Freizeitausgleich). You are legally entitled to at least 24-30 days of paid vacation per year.\n\nHowever, the reality of hospital life means you will work hard. The documentation burden is high, and language barriers can make the first year stressful. But the system is designed to prevent burnout. After a 24-hour shift, you must take the next day off. This structured approach allows doctors to have a fulfilling career without sacrificing their personal lives.`
  },
  {
    slug: "doctor-salary-germany-2024",
    title: "How Much Do Indian Doctors Earn in Germany? Salary Breakdown 2024",
    category: "Career & Salary",
    author: "Dr. Sandeep Amin",
    date: "September 5, 2024",
    content: `Salaries for doctors in Germany are transparent and governed by collective agreements (Tarifverträge). As a foreign doctor, you are paid exactly the same as your German colleagues.\n\nAn Assistenzarzt (resident) typically starts at around €4,800 to €5,200 gross per month in their first year. With on-call duties and night shifts, this easily increases to €6,000+.\n\nOnce you complete your specialization and become a Facharzt (specialist), your base salary jumps to €6,500 - €8,500 gross per month. Senior consultants (Oberarzt) earn between €8,500 and €11,500, while heads of department (Chefarzt) negotiate their own contracts, often exceeding €15,000 to €25,000 per month.\n\nRemember, taxes and social contributions in Germany are high (around 35-42%), but they cover top-tier health insurance, unemployment benefits, and pension.`
  },
  {
    slug: "what-is-hospitation",
    title: "What is Hospitation and Why It's Crucial for Your German Career",
    category: "Tips & Guides",
    author: "Dr. Sangeeta Pai",
    date: "August 22, 2024",
    content: `A Hospitation is a medical observership or shadowing period. It is highly recommended for foreign doctors looking to enter the German system.\n\nDuring a Hospitation (which typically lasts 2 to 4 weeks), you are not allowed to treat patients independently. Instead, you follow the doctors, observe procedures, and attend ward rounds. It provides immense value:\n\n1. Language Practice: It's the best way to learn the real medical terminology used on the wards.\n2. System Understanding: You learn how a German hospital functions—hierarchy, documentation, and patient interaction.\n3. Job Opportunities: It serves as an extended interview. If you perform well and show a good attitude, hospitals will often offer you a job contract (Zusage) at the end of your Hospitation.`
  },
  {
    slug: "dr-sangeeta-pai-journey",
    title: "Indian Dentist to German Specialist: Dr. Sangeeta Pai's Journey",
    category: "For Dentists",
    author: "Dr. Sangeeta Pai",
    date: "August 10, 2024",
    content: `My journey from India to becoming a board-certified implantologist in Germany was not easy, but it was incredibly rewarding.\n\nWhen I moved to Germany in 2013, information for foreign dentists was scarce. I had to navigate the bureaucratic maze of the Zahnärztekammer, translate my documents, and prepare for exams while learning the language from scratch.\n\nPassing the dental FSP and the Kenntnisprüfung required intense dedication. But once I obtained my Approbation, the doors opened. The working conditions for dentists here are exceptional, with access to cutting-edge technology and a huge emphasis on continuing education. My goal with MediSpire is to make this path clearer and less daunting for the next generation of dental professionals.`
  },
  {
    slug: "apostille-translation-guide",
    title: "How to Get Your Medical Documents Apostilled and Translated for Germany",
    category: "Medical Licensing",
    author: "Dr. Sandeep Amin",
    date: "July 28, 2024",
    content: `Document preparation is often the most frustrating part of the German licensing process. The authorities require your documents to be authentic and properly translated.\n\nAn Apostille is an international certification that authenticates the origin of a public document. In India, this is done by the Ministry of External Affairs (MEA). You need this for your degree, medical registration, and birth/marriage certificates.\n\nOnce apostilled, your documents must be translated into German. The catch? The translation must be done by a sworn translator (vereidigter Übersetzer) recognized in Germany. Do not use random translation agencies in India, as German authorities often reject them. At MediSpire, we connect you directly with approved translators to ensure your application is accepted without delay.`
  },
  {
    slug: "visa-guide-indian-doctors",
    title: "Visa Guide for Indian Doctors: Job Seeker Visa vs Work Visa",
    category: "Visa & Immigration",
    author: "Dr. Sandeep Amin",
    date: "July 15, 2024",
    content: `Choosing the right visa is crucial. Most Indian doctors use one of these two pathways:\n\nThe Job Seeker Visa (Chancenkarte/Jobsuche) allows you to come to Germany for up to 6 months to look for a job. You need a recognized degree, B1/B2 German, and proof of funds to support yourself during this time. This is ideal if you want to do a Hospitation and give interviews in person.\n\nThe Work Visa / EU Blue Card is applied for when you already have a job offer (e.g., from a successful online interview) and your Berufserlaubnis/Approbation is in process or granted. The Blue Card is highly desirable as it offers a fast track to permanent residency and easy family reunification.`
  },
  {
    slug: "german-medical-terminology-50-words",
    title: "German Medical Terminology: 50 Must-Know Words Before Your FSP",
    category: "German Language",
    author: "Dr. Sangeeta Pai",
    date: "July 1, 2024",
    content: `Medical German often involves knowing both the Latin term (used among doctors) and the German laymen's term (used with patients). Here is a quick sample to get you started:\n\n1. Appendicitis: Blinddarmentzündung\n2. Hypertension: Bluthochdruck\n3. Myocardial Infarction: Herzinfarkt\n4. Stroke: Schlaganfall\n5. Diabetes: die Zuckerkrankheit\n\nWhen speaking with patients during the FSP, you must use the laymen's terms. When presenting the case to the examiner, you revert to the clinical terms. Mastering this bilingual switch is the key to passing the exam. Our FSP coaching focuses heavily on this exact skill.`
  },
  {
    slug: "motivationsschreiben-guide",
    title: "How to Write a Perfect Motivationsschreiben for German Hospitals",
    category: "Career & Salary",
    author: "Dr. Sandeep Amin",
    date: "June 18, 2024",
    content: `A Motivationsschreiben (cover letter) is a critical part of your job application (Bewerbung) in Germany. It shouldn't just repeat your CV.\n\nA good cover letter answers three questions:\n1. Why do you want this specific job at this specific hospital?\n2. What makes you qualified for the position?\n3. Why do you want to specialize in this specific field in Germany?\n\nAvoid generic templates. German Chief Physicians (Chefärzte) value authenticity and a clear, professional tone. Keep it to one page, highlight your clinical experience, and express your commitment to integrating into the German healthcare system.`
  },
  {
    slug: "accommodation-germany-doctors",
    title: "Accommodation in Germany: Where to Live as a New Doctor",
    category: "Life in Germany",
    author: "Dr. Sangeeta Pai",
    date: "June 5, 2024",
    content: `Finding an apartment in Germany can be highly competitive, especially in major cities like Munich, Berlin, or Frankfurt. As a new doctor, here are your best options:\n\nMany hospitals offer "Personalwohnheim" (staff accommodation). These are subsidized, furnished rooms or small apartments directly on or near the hospital grounds. They are perfect for your first 6-12 months while you settle in.\n\nIf that's not an option, look for a WG (Wohngemeinschaft/shared flat) or use portals like ImmoScout24. Landlords will require a SCHUFA (credit score), proof of income (your work contract), and a deposit (Kaution, usually 3 months' cold rent). Having a hospital contract makes you a highly attractive tenant.`
  },
  {
    slug: "family-relocation-germany",
    title: "Family Relocation to Germany: What Indian Healthcare Professionals Need to Know",
    category: "Visa & Immigration",
    author: "Dr. Sandeep Amin",
    date: "May 22, 2024",
    content: `Moving to Germany is a family decision. The good news is that Germany has excellent family reunification policies.\n\nIf you hold an EU Blue Card or a standard skilled worker visa, your spouse can join you. Spouses of Blue Card holders do not need to prove basic German language skills before applying for their visa, and they are granted unrestricted access to the German labor market immediately.\n\nFor children, the German education system is largely free, and you will receive Kindergeld (child benefit) of €250 per month per child. While the initial move requires careful planning regarding housing and schooling, Germany offers an incredibly safe and supportive environment for raising a family.`
  }
];

export default function BlogPost() {
  const { slug } = useParams();
  const { openBooking } = useBooking();
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <Link href="/blog">
          <Button>Back to Blog</Button>
        </Link>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    relatedPosts.push(...blogPosts.filter(p => p.slug !== post.slug).slice(0, 3));
  }

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    (e.target as HTMLFormElement).reset();
  };

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | MediSpire Blog`;
    }
  }, [post]);

  return (
    <div className="w-full">
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-4">
            <span className="bg-accent text-accent-foreground px-3 py-1 text-sm font-semibold rounded-full">
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 text-primary-foreground/80">
            <span>By {post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl flex flex-col lg:flex-row gap-12">
          
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="prose dark:prose-invert max-w-none">
              {post.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-lg leading-relaxed text-foreground/90 mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-bold">Share this article:</span>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Facebook size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Twitter size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Linkedin size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <MessageCircle size={18} />
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            <Card className="bg-primary text-primary-foreground border-none">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Start Your Journey Today</h3>
                <p className="text-primary-foreground/80 mb-6 text-sm">
                  Speak directly with {post.author} about your career goals in Germany.
                </p>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={openBooking}>
                  Book a Free Consultation
                </Button>
              </CardContent>
            </Card>

            <div className="bg-secondary rounded-xl p-6 border border-border">
              <h3 className="text-lg font-bold mb-4">Subscribe to Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest updates on German medical licensing directly to your inbox.
              </p>
              <form onSubmit={handleNewsletter} className="space-y-3">
                <Input required placeholder="Your Name" />
                <Input type="email" required placeholder="Email Address" />
                <Button type="submit" className="w-full">Subscribe</Button>
              </form>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 border-b border-border pb-2">Related Posts</h3>
              <div className="space-y-4">
                {relatedPosts.map(rp => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`}>
                    <div className="group cursor-pointer">
                      <h4 className="font-medium text-sm group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {rp.title}
                      </h4>
                      <span className="text-xs text-muted-foreground mt-1 block">{rp.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
