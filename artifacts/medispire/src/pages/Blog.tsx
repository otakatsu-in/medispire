import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

const categories = [
  "All", "German Language", "Medical Licensing", "Life in Germany", 
  "For Doctors", "For Nurses", "For Dentists", "FSP & Exams", 
  "Visa & Immigration", "Career & Salary", "Tips & Guides"
];

const posts = [
  { slug: "german-a1-to-c1-roadmap", title: "How to Learn German as a Doctor: The Complete A1 to C1 Roadmap", category: "German Language", author: "Dr. Sandeep Amin", date: "November 15, 2024", excerpt: "A structured approach to getting from zero (A1) to professional proficiency (C1) specifically tailored for medical professionals." },
  { slug: "fsp-exam-guide", title: "What is FSP (Fachsprachprüfung) and How to Crack It", category: "FSP & Exams", author: "Dr. Sandeep Amin", date: "November 8, 2024", excerpt: "Breakdown of the medical language exam format, common pitfalls, and our top strategies to ace it on your first try." },
  { slug: "approbation-vs-berufserlaubnis", title: "Approbation vs Berufserlaubnis: What Indian Doctors Need to Know", category: "Medical Licensing", author: "Dr. Sandeep Amin", date: "October 25, 2024", excerpt: "Understanding the crucial difference between a temporary license and permanent licensure for your career planning." },
  { slug: "why-germany-over-uk-australia", title: "Top 10 Reasons Indian Doctors Are Choosing Germany Over UK, Australia, and Canada", category: "Life in Germany", author: "Dr. Sandeep Amin", date: "October 10, 2024", excerpt: "Why Germany has rapidly emerged as the preferred choice for medical graduates seeking a better life and career." },
  { slug: "indian-nurse-move-to-germany", title: "Complete Step-by-Step Guide to Moving to Germany as an Indian Nurse", category: "For Nurses", author: "Dr. Sangeeta Pai", date: "September 28, 2024", excerpt: "Navigate the Anerkennungsverfahren process seamlessly with this comprehensive guide for nurses." },
  { slug: "work-life-balance-doctors-germany", title: "The Truth About Work-Life Balance for Doctors in Germany", category: "Life in Germany", author: "Dr. Sandeep Amin", date: "September 15, 2024", excerpt: "German labor laws, strict limits on working hours, and how the system prevents doctor burnout." },
  { slug: "doctor-salary-germany-2024", title: "How Much Do Indian Doctors Earn in Germany? Salary Breakdown 2024", category: "Career & Salary", author: "Dr. Sandeep Amin", date: "September 5, 2024", excerpt: "Transparent salary scales, from first-year Assistenzarzt to senior consultant levels." },
  { slug: "what-is-hospitation", title: "What is Hospitation and Why It's Crucial for Your German Career", category: "Tips & Guides", author: "Dr. Sangeeta Pai", date: "August 22, 2024", excerpt: "Why a clinical observership is your best stepping stone into the German healthcare system." },
  { slug: "dr-sangeeta-pai-journey", title: "Indian Dentist to German Specialist: Dr. Sangeeta Pai's Journey", category: "For Dentists", author: "Dr. Sangeeta Pai", date: "August 10, 2024", excerpt: "Personal insights on overcoming bureaucracy and achieving board certification in Germany." },
  { slug: "apostille-translation-guide", title: "How to Get Your Medical Documents Apostilled and Translated for Germany", category: "Medical Licensing", author: "Dr. Sandeep Amin", date: "July 28, 2024", excerpt: "Avoid common mistakes with sworn translators and MEA apostilles that cause application delays." },
  { slug: "visa-guide-indian-doctors", title: "Visa Guide for Indian Doctors: Job Seeker Visa vs Work Visa", category: "Visa & Immigration", author: "Dr. Sandeep Amin", date: "July 15, 2024", excerpt: "Choosing the right visa pathway based on your current application status and goals." },
  { slug: "german-medical-terminology-50-words", title: "German Medical Terminology: 50 Must-Know Words Before Your FSP", category: "German Language", author: "Dr. Sangeeta Pai", date: "July 1, 2024", excerpt: "Essential vocabulary bridge between Latin medical terms and German laymen terms." },
  { slug: "motivationsschreiben-guide", title: "How to Write a Perfect Motivationsschreiben for German Hospitals", category: "Career & Salary", author: "Dr. Sandeep Amin", date: "June 18, 2024", excerpt: "Crafting a cover letter that stands out to German Chief Physicians." },
  { slug: "accommodation-germany-doctors", title: "Accommodation in Germany: Where to Live as a New Doctor", category: "Life in Germany", author: "Dr. Sangeeta Pai", date: "June 5, 2024", excerpt: "Staff housing, WG life, and navigating the competitive German rental market." },
  { slug: "family-relocation-germany", title: "Family Relocation to Germany: What Indian Healthcare Professionals Need to Know", category: "Visa & Immigration", author: "Dr. Sandeep Amin", date: "May 22, 2024", excerpt: "Spouse visas, child benefits (Kindergeld), and ensuring a smooth transition for your family." }
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    document.title = "Blog & Insights | MediSpire";
  }, []);

  const filteredPosts = activeCategory === "All" 
    ? posts 
    : posts.filter(p => p.category === activeCategory);

  return (
    <div className="w-full">
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & Insights</h1>
          <p className="text-xl text-primary-foreground/80">Expert advice, updates, and guidance for your journey to Germany.</p>
        </div>
      </section>

      <section className="py-12 px-4 bg-secondary">
        <div className="container mx-auto">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-card text-foreground hover:bg-muted border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, i) => (
              <Link key={i} href={`/blog/${post.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow border-border flex flex-col h-full group cursor-pointer">
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="mb-4">
                      <span className="bg-accent/10 text-accent px-3 py-1 text-xs font-semibold rounded-full border border-accent/20">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-muted-foreground text-sm mb-6 flex-1">{post.excerpt}</p>
                    
                    <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                      <span>{post.date}</span>
                      <span className="text-primary font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <ArrowRight size={16} />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
