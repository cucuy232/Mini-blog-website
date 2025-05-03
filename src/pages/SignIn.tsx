import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

// Form schema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

const SignIn = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // Use the login function from AuthContext
      const success = await login(values.email, values.password);
      
      if (success) {
        console.log("Sign in values:", values);
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      toast({
        title: "Sign in failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex-shrink-0 flex items-center justify-center">
            <h1 className="text-3xl font-serif font-bold text-blog-primary">MiniBlog</h1>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link to="/signup" className="font-medium text-blog-primary hover:text-blog-secondary">
              create a new account
            </Link>
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-4 rounded-md shadow-sm">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <input
                        type="email"
                        {...field}
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blog-primary focus:border-blog-primary focus:z-10 sm:text-sm"
                        placeholder="Email address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <input
                        type="password"
                        {...field}
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blog-primary focus:border-blog-primary focus:z-10 sm:text-sm"
                        placeholder="Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <input
                        type="checkbox" 
                        {...field}
                        value={field.value ? "true" : "false"}
                        className="h-4 w-4 text-blog-primary focus:ring-blog-primary border-gray-300 rounded"
                      />
                    </FormControl>
                    <span className="text-sm text-gray-600">Remember me</span>
                  </FormItem>
                )}
              />
              
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-blog-primary hover:text-blog-secondary">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <Button 
              type="submit" 
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blog-primary hover:bg-blog-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blog-primary"
              disabled={isLoading}
            >
              <LogIn className="h-4 w-4 mr-2" />
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blog-primary">
              Google
            </button>
            <button className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blog-primary">
              Twitter
            </button>
            <button className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blog-primary">
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
