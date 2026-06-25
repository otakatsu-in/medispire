import { createContext, useContext, useState, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface BookingContextType {
  openBooking: () => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const openBooking = () => setIsOpen(true);
  const closeBooking = () => setIsOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const form = e.target as HTMLFormElement;
      const name = (form.elements.namedItem("name") as HTMLInputElement).value;
      const email = (form.elements.namedItem("email") as HTMLInputElement).value;
      const phone = (form.elements.namedItem("phone") as HTMLInputElement)?.value || "N/A";
      const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "N/A";
      
      const formData = new FormData(form);
      const profession = formData.get("profession") || "N/A";

      const text = `🚨 <b>New Webinar Registration (Popup)!</b>\n
<b>Name:</b> ${name}
<b>Email:</b> ${email}
<b>Phone:</b> ${phone}
<b>Profession:</b> ${profession}

<b>Message / Question for Dr. Sangeeta:</b>
${message}`;

      const chatIds = ["-1004295292660", "417335028"];
      const responses = await Promise.all(
        chatIds.map(chatId => 
          fetch("https://api.telegram.org/bot8077312072:AAEx94EiWIV4D0KaND_9UciGeANqRVUrkiY/sendMessage", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: chatId,
              text: text,
              parse_mode: "HTML",
            }),
          })
        )
      );

      if (!responses.every(r => r.ok)) throw new Error("Failed");

      toast({
        title: "Registration Successful",
        description: "We will send you the webinar link via WhatsApp/Email shortly.",
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit request. Please reach out via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BookingContext.Provider value={{ openBooking, closeBooking }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl text-primary">Join Free Webinar with Dr. Sangeeta</DialogTitle>
            <DialogDescription>
              Sunday 12-2 PM. Fill out the form below to register and ask your questions directly.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profession">Profession</Label>
              <Select name="profession" required>
                <SelectTrigger id="profession">
                  <SelectValue placeholder="Select your profession" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="dentist">Dentist</SelectItem>
                  <SelectItem value="nurse">Nurse</SelectItem>
                  <SelectItem value="allied">Allied Health Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Question for Dr. Sangeeta (Optional)</Label>
              <Textarea id="message" name="message" rows={3} placeholder="What would you like to ask?" />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              {isSubmitting ? "Registering..." : "Register for Webinar"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </BookingContext.Provider>
  );
}
