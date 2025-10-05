import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { DollarSign, User, Hash, Globe, Mail, CheckCircle } from "lucide-react";

const formSchema = z.object({
  amount: z.coerce
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a valid number",
    })
    .positive("Amount must be greater than 0")
    .max(10000000, "Amount cannot exceed 10,000,000"),
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  taxid: z
    .string()
    .trim()
    .min(5, "Tax ID must be at least 5 characters")
    .max(20, "Tax ID must be less than 20 characters")
    .regex(/^[A-Z0-9]+$/i, "Tax ID can only contain letters and numbers"),
  nationality: z
    .string()
    .min(1, "Please select your nationality"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const nationalities = [
  "american",
  "british",
  "canadian",
  "chinese",
  "french",
  "german",
  "indian",
  "italian",
  "japanese",
  "spanish",
  "other",
];

export function CreditApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: undefined,
      name: "",
      taxid: "",
      nationality: "",
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with actual endpoint
      const response = await fetch("https://api.example.com/v1/form/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      setIsSuccess(true);
      toast.success("Application Submitted", {
        description: "Your credit application has been received successfully.",
      });
      
      // Reset form after success
      setTimeout(() => {
        form.reset();
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      toast.error("Submission Failed", {
        description: "Unable to submit your application. Please try again.",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-[var(--shadow-strong)] border-border">
      <CardHeader className="space-y-1 pb-8">
        <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Credit Application
        </CardTitle>
        <CardDescription className="text-center text-base">
          Complete the form below to apply for credit. All fields are required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-in fade-in duration-500">
            <CheckCircle className="w-16 h-16 text-success" />
            <h3 className="text-2xl font-semibold text-foreground">Application Submitted!</h3>
            <p className="text-muted-foreground text-center">
              We'll review your application and get back to you soon.
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">Credit Amount</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="1500.00"
                          className="pl-10 h-12 transition-all duration-300 focus:shadow-[var(--shadow-soft)]"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Enter the amount you wish to apply for
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          placeholder="John Doe"
                          className="pl-10 h-12 transition-all duration-300 focus:shadow-[var(--shadow-soft)]"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Your legal name as it appears on official documents
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="taxid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">Tax ID Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          placeholder="AB123456C"
                          className="pl-10 h-12 uppercase transition-all duration-300 focus:shadow-[var(--shadow-soft)]"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Your government-issued tax identification number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">Nationality</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                          <SelectTrigger className="pl-10 h-12 transition-all duration-300 focus:shadow-[var(--shadow-soft)]">
                            <SelectValue placeholder="Select your nationality" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent>
                        {nationalities.map((nationality) => (
                          <SelectItem key={nationality} value={nationality}>
                            {nationality.charAt(0).toUpperCase() + nationality.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select your country of citizenship
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="john.doe@example.com"
                          className="pl-10 h-12 transition-all duration-300 focus:shadow-[var(--shadow-soft)]"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      We'll send confirmation and updates to this address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)]"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
