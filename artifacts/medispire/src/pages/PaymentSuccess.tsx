import { SEO } from "@/components/SEO";
import { CheckCircle2, ArrowRight, Calendar, Mail } from "lucide-react";
import { Link, useSearch } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ConsultationIntakeForm } from "@/components/ConsultationIntakeForm";
import { useState } from "react";

export default function PaymentSuccess() {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const orderId = searchParams.get("order_id");
  const product = searchParams.get("product");
  const defaultName = searchParams.get("name") || "";
  const defaultEmail = searchParams.get("email") || "";
  const defaultPhone = searchParams.get("phone") || "";
  
  const [intakeCompleted, setIntakeCompleted] = useState(false);

  // Show intake form ONLY if they bought a consultation AND haven't completed it yet
  if (product === "consultation" && !intakeCompleted) {
    return (
      <div className="w-full bg-slate-50/50 min-h-[80vh] py-20 px-4">
        <SEO title="Complete Your Profile | MediSpire" description="Please complete your consultation intake form." />
        <ConsultationIntakeForm 
          orderId={orderId} 
          defaultName={defaultName}
          defaultEmail={defaultEmail}
          defaultPhone={defaultPhone}
          onComplete={() => setIntakeCompleted(true)} 
        />
      </div>
    );
  }

  // Default success page (shown for courses, OR after the intake form is completed)
  return (
    <div className="w-full bg-slate-50 min-h-[80vh] flex items-center justify-center py-20 px-4">
      <SEO title="Payment Successful | MediSpire" description="Your payment was successful." />

      <div className="max-w-2xl w-full">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl p-10 md:p-14 text-center shadow-xl border border-border"
        >
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <CheckCircle2 size={48} />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black text-primary mb-4">
            {intakeCompleted ? "Profile Submitted!" : "Payment Successful!"}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-2">
            {intakeCompleted 
              ? "Thank you for completing your intake profile. Dr. Sangeeta now has all the details needed."
              : "Thank you for your purchase. Your transaction has been securely processed."}
          </p>
          
          {orderId && (
            <p className="text-sm font-medium text-slate-400 mb-8">
              Order ID: {orderId}
            </p>
          )}

          <div className="bg-primary/5 rounded-2xl p-6 md:p-8 mb-10 text-left">
            <h3 className="font-bold text-xl text-primary mb-4 border-b border-primary/10 pb-2">What happens next?</h3>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="text-accent shrink-0 mt-0.5" size={20}/>
                <span className="text-foreground/80">
                  <strong>Check your email:</strong> You will receive a confirmation receipt shortly with your purchase details.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Calendar className="text-accent shrink-0 mt-0.5" size={20}/>
                <span className="text-foreground/80">
                  <strong>We will contact you:</strong> {
                    product === "consultation" 
                    ? "Our team will reach out via WhatsApp shortly to schedule your exact consultation time slot."
                    : "If applicable, our team will reach out with your course access details."
                  }
                </span>
              </li>
            </ul>
          </div>

          <Link href="/">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-10 py-6 text-lg rounded-full w-full sm:w-auto shadow-lg">
              Return to Homepage <ArrowRight className="ml-2" size={20}/>
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
