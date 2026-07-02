import { SEO } from "@/components/SEO";
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

import { blogPosts as posts } from "@/data/blogs";
export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  

  const filteredPosts = activeCategory === "All" 
    ? posts 
    : posts.filter(p => p.category === activeCategory);

  return (
    <div className="w-full">
      <SEO title="Blog & Insights | MediSpire" description="Premium guidance and placement portal for healthcare professionals moving to Germany." />
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
