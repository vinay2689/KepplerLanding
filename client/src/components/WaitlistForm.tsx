import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GradientText } from "@/components/ui/gradient-text";
import { Check, User, Mail, Building, UserCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useRef } from "react";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  workEmail: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().min(1, { message: "Company name is required" }),
  role: z.string().min(1, { message: "Please select your role" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function WaitlistForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      workEmail: "",
      company: "",
      role: "",
    },
  });
  
  const waitlistMutation = useMutation({
    mutationFn: (values: FormValues) => 
      apiRequest("POST", "/api/waitlist", values).then(res => res.json()),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been added to our waitlist. We'll be in touch soon!",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });
  
  function onSubmit(values: FormValues) {
    waitlistMutation.mutate(values);
  }
  
  const features = [
    {
      icon: <Check className="h-5 w-5" />,
      title: "Full platform preview",
      description: "See all features in action",
      bgColor: "bg-primary/20",
      textColor: "text-primary",
    },
    {
      icon: <Check className="h-5 w-5" />,
      title: "Personalized onboarding",
      description: "Custom setup for your team",
      bgColor: "bg-secondary/20",
      textColor: "text-secondary",
    },
    {
      icon: <Check className="h-5 w-5" />,
      title: "Priority beta access",
      description: "Get early access before others",
      bgColor: "bg-accent/20",
      textColor: "text-accent",
    },
    {
      icon: <Check className="h-5 w-5" />,
      title: "Exclusive updates",
      description: "Stay informed on new features",
      bgColor: "bg-accent-alt/20",
      textColor: "text-accent-alt",
    },
  ];
  
  return (
    <section id="waitlist-form" className="w-full max-w-3xl mx-auto px-4 md:px-6 py-16 md:py-24" ref={formRef}>
      <div className="bg-card/60 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Ready to Experience <GradientText>Seamless Development</GradientText>?
        </h2>
        
        <p className="text-gray-300 text-center mb-10 max-w-lg mx-auto">
          Be one of the first to try Keppler! Join our exclusive beta waitlist today.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full ${feature.bgColor} flex items-center justify-center ${feature.textColor} shrink-0 mt-1`}>
                {feature.icon}
              </div>
              <div>
                <h3 className="font-medium">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input className="pl-10" placeholder="John Doe" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="workEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input className="pl-10" placeholder="you@company.com" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input className="pl-10" placeholder="Acme Inc." {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <UserCircle className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="developer">Developer</SelectItem>
                          <SelectItem value="teamLead">Team Lead</SelectItem>
                          <SelectItem value="cto">CTO / VP Engineering</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full btn-gradient text-white font-medium py-6 h-auto text-lg"
                disabled={waitlistMutation.isPending}
              >
                {waitlistMutation.isPending ? "Submitting..." : "Join Waitlist"}
              </Button>
            </div>
            
            <p className="text-xs text-gray-400 text-center pt-2">
              By submitting, you agree to our <a href="#" className="text-primary hover:underline">Privacy Policy</a> and <a href="#" className="text-primary hover:underline">Terms of Service</a>.
            </p>
          </form>
        </Form>
      </div>
    </section>
  );
}
