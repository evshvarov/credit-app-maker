import { CreditApplicationForm } from "@/components/CreditApplicationForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Financial Solutions Made Simple
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Apply for credit in minutes with our streamlined application process. 
            Secure, fast, and transparent.
          </p>
        </div>
        
        <CreditApplicationForm />
        
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Your information is encrypted and secure. We process applications within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
