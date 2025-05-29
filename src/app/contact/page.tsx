"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/app/components/ui-elements";
import { Input } from "@/app/components/ui-elements";
import { Label } from "@/app/components/ui-elements";
import { Textarea } from "@/app/components/ui-elements";
import { useToast } from "@/app/hooks/use-toast";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message sent",
      description: "Thank you for your message. We'll get back to you soon.",
    });

    // Reset form
    const form = e.target as HTMLFormElement;
    form.reset();

    setIsSubmitting(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12 md:py-16">
          <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="prose prose-lg max-w-none">
                <p>
                  We'd love to hear from you! Whether you have a question about
                  our products, need help with an order, or want to provide
                  feedback, our team is here to assist you.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 mt-1 text-primary" />
                    <div>
                      <h3 className="text-base font-medium">Email Us</h3>
                      <p className="text-sm text-muted-foreground">
                        For general inquiries:{" "}
                        <a
                          href="mailto:info@stylehub.in"
                          className="text-primary"
                        >
                          info@stylehub.in
                        </a>
                        <br />
                        For customer support:{" "}
                        <a
                          href="mailto:support@stylehub.in"
                          className="text-primary"
                        >
                          support@stylehub.in
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 mt-1 text-primary" />
                    <div>
                      <h3 className="text-base font-medium">Call Us</h3>
                      <p className="text-sm text-muted-foreground">
                        Customer Service: +91 1234 567 890
                        <br />
                        Business Inquiries: +91 9876 543 210
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 mt-1 text-primary" />
                    <div>
                      <h3 className="text-base font-medium">Visit Us</h3>
                      <p className="text-sm text-muted-foreground">
                        StyleHub Headquarters
                        <br />
                        123 Fashion Street, Cyber City
                        <br />
                        Gurugram, Haryana 122002
                        <br />
                        India
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 border rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold mb-4">
                  Send Us a Message
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={5} required />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
