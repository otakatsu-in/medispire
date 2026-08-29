import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface CheckoutDialogProps {
  product: "consultation" | "course" | "course_9999";
  amountLabel: string;
  buttonText: string;
  buttonClassName?: string;
}

export function CheckoutDialog({ product, amountLabel, buttonText, buttonClassName }: CheckoutDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        let msg = data.error || "Failed to create order";
        if (data.details && data.details.message) {
           msg += `: ${data.details.message}`;
        }
        throw new Error(msg);
      }

      // Initialize Cashfree SDK (Loaded via index.html script tag)
      // @ts-ignore
      if (typeof Cashfree === "undefined") {
        throw new Error("Cashfree SDK not loaded");
      }

      // @ts-ignore
      const cashfree = Cashfree({
        mode: "production"
      });

      cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_modal"
      }).then((result: any) => {
        if (result.error) {
          toast({
            title: "Payment Failed",
            description: result.error.message,
            variant: "destructive"
          });
        }
        if (result.redirect) {
          // If the gateway redirects out of the modal
          console.log("Redirecting...");
        }
        if (result.paymentDetails) {
          // Redirect to the success page and pass the product type and user info to pre-fill the form
          const redirectUrl = new URL(window.location.origin + "/payment-success");
          redirectUrl.searchParams.set("order_id", data.order_id);
          redirectUrl.searchParams.set("product", product);
          redirectUrl.searchParams.set("name", formData.name);
          redirectUrl.searchParams.set("email", formData.email);
          redirectUrl.searchParams.set("phone", formData.phone);
          window.location.href = redirectUrl.toString();
        }
      });

    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className={buttonClassName}>
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Booking</DialogTitle>
          <DialogDescription>
            You are about to purchase the {product === "consultation" ? "1-on-1 Consultation" : product === "course_9999" ? "Complete Guide Course" : "Premium Course Bundle"} for {amountLabel}.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleCheckout} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              required 
              placeholder="Dr. Jane Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              required 
              placeholder="jane@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number (with Country Code)</Label>
            <Input 
              id="phone" 
              type="tel" 
              required 
              pattern="^\+[1-9][0-9\s\-]{6,18}$"
              title="Please include your country code starting with '+' (e.g. +91 9876543210)"
              placeholder="+91 9876543210"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          
          <Button type="submit" className="w-full h-12 text-lg font-bold mt-6" disabled={loading}>
            {loading ? "Processing..." : `Pay ${amountLabel}`}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
