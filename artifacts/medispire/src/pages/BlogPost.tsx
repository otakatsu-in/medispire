import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { blogPosts } from "@/data/blogs";

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
            <div className="prose dark:prose-invert prose-headings:font-bold prose-a:text-primary max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-bold">Share this article:</span>
              <div className="flex gap-2">
                <a href="https://www.facebook.com/profile.php?id=61589388965018" target="_blank" rel="noreferrer">
                  <Button variant="outline" size="icon" className="rounded-full"><Facebook size={18} /></Button>
                </a>
                <a href="https://www.instagram.com/docs.in.de/" target="_blank" rel="noreferrer">
                  <Button variant="outline" size="icon" className="rounded-full"><Instagram size={18} /></Button>
                </a>
                <a href="https://www.youtube.com/@DocsinDE" target="_blank" rel="noreferrer">
                  <Button variant="outline" size="icon" className="rounded-full"><Youtube size={18} /></Button>
                </a>
                <a href="https://wa.me/918310010112" target="_blank" rel="noreferrer">
                  <Button variant="outline" size="icon" className="rounded-full"><MessageCircle size={18} /></Button>
                </a>
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
