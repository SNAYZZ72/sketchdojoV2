"use client";

import { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { Link } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Loader2, 
  LockKeyhole,
  Lock,
  Mail,
  X
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Custom modal component
const RequestLinkModal = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  isLoading,
  isDark
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (email: string) => void;
  isLoading: boolean;
  isDark: boolean;
}) => {
  const t = useTranslations('Auth');
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setError("");
    }
  }, [isOpen]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !z.string().email().safeParse(email).success) {
      setError(t('validEmailRequired'));
      return;
    }
    
    // Submit if valid
    onSubmit(email);
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className={`${isDark 
          ? "bg-sketchdojo-bg-light border border-white/10" 
          : "bg-white border border-gray-200"
        } rounded-xl shadow-xl w-full max-w-md overflow-hidden`}
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className={`p-4 flex justify-between items-center border-b ${
          isDark ? "border-white/10" : "border-gray-200"
        }`}>
          <h3 className={isDark ? "text-white text-lg font-medium" : "text-gray-800 text-lg font-medium"}>
            {t('requestPasswordResetLink')}
          </h3>
          <button 
            onClick={onClose}
            className={`${isDark 
              ? "text-white/60 hover:text-white transition-colors" 
              : "text-gray-500 hover:text-gray-700 transition-colors"
            } rounded-full p-1 hover:bg-gray-100/10`}
            disabled={isLoading}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <p className={isDark ? "text-white/80 mb-4" : "text-gray-600 mb-4"}>
            {t('enterEmailForResetLink')}
          </p>
          
          {error && (
            <div className={`mb-4 p-3 ${isDark 
              ? "bg-red-500/10 border border-red-500/20 rounded-md text-red-400" 
              : "bg-red-50 border border-red-200 rounded-md text-red-600"
            } text-sm flex items-start gap-2`}>
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          <div className="mb-6">
            <label 
              htmlFor="email" 
              className={`flex items-center gap-2 ${
                isDark ? "text-white/80" : "text-gray-700"
              } text-sm font-medium mb-2`}
            >
              <Mail className="h-4 w-4" />
              {t('email')}
            </label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailPlaceholder')}
                className={`${isDark
                  ? "bg-white/10 border-white/20 text-white focus:border-sketchdojo-primary focus:ring-sketchdojo-primary/20"
                  : "bg-white border-gray-300 text-gray-900 focus:border-sketchdojo-primary focus:ring-sketchdojo-primary/20"
                } h-11 pl-4 rounded-lg transition-all duration-300 focus:shadow-[0_0_0_2px_rgba(194,63,220,0.3)]`}
                disabled={isLoading}
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className={isDark
                ? "bg-transparent text-white border-white/20 hover:bg-white/10"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }
              disabled={isLoading}
            >
              {t('cancel')}
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-sketchdojo-primary to-sketchdojo-accent hover:shadow-lg hover:shadow-sketchdojo-primary/30 transition-all duration-300 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{t('sending')}</span>
                </div>
              ) : (
                t('sendResetLink')
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Form schema
const formSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Password strength checker
const checkPasswordStrength = (password: string): {strength: number, feedback: string} => {
  if (!password) return { strength: 0, feedback: "" };
  
  let strength = 0;
  let feedback = "";
  
  // Length check
  if (password.length >= 6) strength += 1;
  if (password.length >= 10) strength += 1;
  
  // Character variety checks
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  
  switch (true) {
    case (strength <= 2):
      feedback = "Weak password";
      break;
    case (strength <= 4):
      feedback = "Moderate password";
      break;
    default:
      feedback = "Strong password";
  }
  
  return { strength, feedback };
};

export default function ResetPasswordPage() {
  const t = useTranslations('Auth'); // Access translations with the Auth namespace
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resetComplete, setResetComplete] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [tokenMissing, setTokenMissing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Get password value for strength meter
  const passwordValue = form.watch("password");
  const passwordStrength = checkPasswordStrength(passwordValue);

  // Extract reset token from URL on page load
  useEffect(() => {
    // Check for token in hash params (Supabase often puts it there)
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const hashToken = hashParams.get('token') || hashParams.get('access_token');
    
    // Check for token in URL query params
    const urlToken = searchParams.get('token');
    
    // Use token from hash or URL
    const token = hashToken || urlToken;
    
    if (token) {
      setResetToken(token);
    } else {
      setTokenMissing(true);
      setErrorMessage(t('resetTokenMissing'));
    }
  }, [searchParams, t]);

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!resetToken) {
        setErrorMessage(t('resetTokenMissing'));
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);
      
      // Update user's password using the reset token
      const { error } = await supabase.auth.updateUser({
        password: values.password
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      setResetComplete(true);
      toast.success(t('passwordResetSuccess'));
      
      // Navigate to sign-in page after successful reset with a delay
      setTimeout(() => {
        router.push('/sign-in');
      }, 3000);
      
    } catch (error) {
      setErrorMessage(t('unexpectedError'));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  // Handle requesting a new reset link
  const handleRequestNewLink = (email: string) => {
    const requestReset = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        
        if (error) {
          setErrorMessage(error.message);
          return;
        }
        
        toast.success(t('passwordResetLinkSent'));
        setIsModalOpen(false);
        
      } catch (error) {
        setErrorMessage(t('unexpectedError'));
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    requestReset();
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center ${
      isDark 
        ? "bg-gradient-to-b from-sketchdojo-bg to-sketchdojo-bg-light" 
        : "bg-gradient-to-b from-gray-50 to-gray-100"
    } py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 -left-24 w-48 sm:w-64 h-48 sm:h-64 ${
          isDark ? "bg-sketchdojo-primary/20" : "bg-sketchdojo-primary/5"
        } rounded-full blur-3xl opacity-60 animate-pulse-slow`}></div>
        
        <div className={`absolute bottom-1/4 -right-24 w-48 sm:w-64 h-48 sm:h-64 ${
          isDark ? "bg-sketchdojo-accent/20" : "bg-sketchdojo-accent/5"
        } rounded-full blur-3xl opacity-60 animate-pulse-slow animation-delay-1000`}></div>
        
        <div className={`absolute top-1/2 left-1/3 w-24 sm:w-32 h-24 sm:h-32 ${
          isDark ? "bg-sketchdojo-primary/10" : "bg-sketchdojo-primary/3"
        } rounded-full blur-xl opacity-60 animate-float`}></div>
        
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 dark:opacity-10"></div>
      </div>
      
      {/* Custom Modal */}
      <RequestLinkModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleRequestNewLink}
        isLoading={isLoading}
        isDark={isDark}
      />
      
      <motion.div 
        className="w-full max-w-md space-y-8 relative z-10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Logo and Heading */}
        <motion.div 
          className="text-center"
          variants={fadeIn}
        >
          <div className="flex justify-center mb-4">
            <Link href="/" className="inline-flex items-center group">
              <div className="relative overflow-hidden mr-3">
                <Image 
                  src="/logo/logo.svg" 
                  alt={t('logoAlt')}
                  width={50} 
                  height={50}
                  className="transform transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-sketchdojo-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </div>
              <span className="font-italianno text-3xl sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-white/80 group-hover:from-sketchdojo-primary group-hover:to-sketchdojo-accent transition-all duration-300">
                SketchDojo<span className="text-sketchdojo-primary">.ai</span>
              </span>
            </Link>
          </div>
          <h2 className={`mt-2 text-2xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
            {t('resetYourPassword')}
          </h2>
          <p className={`mt-2 text-sm ${isDark ? "text-white/60" : "text-gray-600"}`}>
            {t('createNewPassword')}
          </p>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="relative"
        >
          <Card className={`${isDark 
            ? "bg-white/10 backdrop-blur-md border-white/20" 
            : "bg-white border-gray-200"
          } shadow-lg overflow-hidden`}>
            <CardHeader className="space-y-0 pb-2">
              {errorMessage && (
                <Alert variant="destructive" className={`${isDark
                  ? "bg-red-500/10 border-red-500/20 text-red-400"
                  : "bg-red-50 border-red-200 text-red-600"
                } mb-4`}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              {resetComplete && (
                <Alert className={`${isDark
                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                  : "bg-green-50 border-green-200 text-green-600"
                } mb-4`}>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    {t('passwordResetSuccessMsg')}
                  </AlertDescription>
                </Alert>
              )}
            </CardHeader>
            <CardContent className="pt-4">
              {!resetComplete ? (
                <>
                  {tokenMissing ? (
                    <motion.div 
                      className="py-8 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 200, 
                          damping: 15, 
                          delay: 0.3 
                        }}
                        className="mb-4 inline-flex p-6 rounded-full bg-red-500/10 dark:bg-red-500/5"
                      >
                        <LockKeyhole className={`h-16 w-16 ${
                          isDark ? "text-red-400" : "text-red-500"
                        }`} />
                      </motion.div>
                      <h3 className={`${isDark ? "text-white" : "text-gray-800"} text-xl font-medium mb-3`}>
                        {t('missingResetToken')}
                      </h3>
                      <p className={`${isDark ? "text-white/70" : "text-gray-600"} mb-6 max-w-sm mx-auto`}>
                        {t('invalidOrExpiredLink')}
                      </p>
                      <Button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-gradient-to-r from-sketchdojo-primary to-sketchdojo-accent text-white hover:shadow-lg hover:shadow-sketchdojo-primary/30 px-6 py-2 h-11 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>{t('processing')}</span>
                          </div>
                        ) : (
                          t('requestNewLink')
                        )}
                      </Button>
                    </motion.div>
                  ) : (
                    <Form {...form}>
                      <motion.form 
                        onSubmit={form.handleSubmit(onSubmit)} 
                        className="space-y-6"
                        variants={staggerChildren}
                      >
                        <motion.div variants={fadeIn}>
                          <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className={`${isDark ? "text-white/80" : "text-gray-700"} flex items-center gap-2`}>
                                  <Lock className="h-4 w-4" />
                                  {t('newPassword')}
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input 
                                      type={showPassword ? "text" : "password"} 
                                      placeholder="••••••••" 
                                      className={`${isDark
                                        ? "bg-white/10 border-white/20 text-white pr-10 focus:border-sketchdojo-primary focus:ring-sketchdojo-primary/20"
                                        : "bg-white border-gray-300 text-gray-900 pr-10 focus:border-sketchdojo-primary focus:ring-sketchdojo-primary/20"
                                      } h-11 pl-4 rounded-lg transition-all duration-300 focus:shadow-[0_0_0_2px_rgba(194,63,220,0.3)]`}
                                      disabled={isLoading}
                                      {...field} 
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      className={`absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 ${isDark
                                        ? "text-white/60 hover:text-white hover:bg-white/10"
                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                      }`}
                                      onClick={() => setShowPassword(!showPassword)}
                                      disabled={isLoading}
                                    >
                                      {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                      ) : (
                                        <Eye className="h-4 w-4" />
                                      )}
                                      <span className="sr-only">
                                        {showPassword ? t('hidePassword') : t('showPassword')}
                                      </span>
                                    </Button>
                                  </div>
                                </FormControl>
                                
                                {/* Password strength meter */}
                                {passwordValue && (
                                  <div className="mt-2">
                                    <div className="flex items-center gap-2">
                                      <div className="h-1.5 flex-1 bg-white/10 dark:bg-black/20 rounded-full overflow-hidden">
                                        <div 
                                          className={`h-full transition-all duration-300 ${
                                            passwordStrength.strength <= 2 
                                              ? 'bg-red-500' 
                                              : passwordStrength.strength <= 4 
                                                ? 'bg-yellow-500' 
                                                : 'bg-green-500'
                                          }`}
                                          style={{ width: `${(passwordStrength.strength / 6) * 100}%` }}
                                        ></div>
                                      </div>
                                      <span className={`text-xs font-medium ${
                                        passwordStrength.strength <= 2 
                                          ? 'text-red-500 dark:text-red-400' 
                                          : passwordStrength.strength <= 4 
                                            ? 'text-yellow-600 dark:text-yellow-400' 
                                            : 'text-green-600 dark:text-green-400'
                                      }`}>
                                        {t(passwordStrength.strength <= 2 
                                          ? 'weakPassword' 
                                          : passwordStrength.strength <= 4 
                                            ? 'moderatePassword' 
                                            : 'strongPassword')}
                                      </span>
                                    </div>
                                    <FormDescription className={`text-xs mt-1 ${isDark ? "text-white/40" : "text-gray-500"}`}>
                                      {t('passwordRequirements')}
                                    </FormDescription>
                                  </div>
                                )}
                                
                                <FormMessage className={isDark ? "text-red-400" : "text-red-500"} />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                        
                        <motion.div variants={fadeIn}>
                          <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className={`${isDark ? "text-white/80" : "text-gray-700"} flex items-center gap-2`}>
                                  <Lock className="h-4 w-4" />
                                  {t('confirmNewPassword')}
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input 
                                      type={showConfirmPassword ? "text" : "password"} 
                                      placeholder="••••••••" 
                                      className={`${isDark
                                        ? "bg-white/10 border-white/20 text-white pr-10 focus:border-sketchdojo-primary focus:ring-sketchdojo-primary/20"
                                        : "bg-white border-gray-300 text-gray-900 pr-10 focus:border-sketchdojo-primary focus:ring-sketchdojo-primary/20"
                                      } h-11 pl-4 rounded-lg transition-all duration-300 focus:shadow-[0_0_0_2px_rgba(194,63,220,0.3)]`}
                                      disabled={isLoading}
                                      {...field} 
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      className={`absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 ${isDark
                                        ? "text-white/60 hover:text-white hover:bg-white/10"
                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                      }`}
                                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                      disabled={isLoading}
                                    >
                                      {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                      ) : (
                                        <Eye className="h-4 w-4" />
                                      )}
                                      <span className="sr-only">
                                        {showConfirmPassword ? t('hidePassword') : t('showPassword')}
                                      </span>
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage className={isDark ? "text-red-400" : "text-red-500"} />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                        
                        <motion.div variants={fadeIn}>
                          <Button 
                            type="submit" 
                            className="w-full h-11 bg-gradient-to-r from-sketchdojo-primary to-sketchdojo-accent hover:shadow-lg hover:shadow-sketchdojo-primary/30 transition-all duration-300 transform hover:-translate-y-0.5 text-white rounded-lg font-medium"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <div className="flex items-center justify-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>{t('resettingPassword')}</span>
                              </div>
                            ) : (
                              t('resetPassword')
                            )}
                          </Button>
                        </motion.div>
                      </motion.form>
                    </Form>
                  )}
                </>
              ) : (
                <motion.div 
                  className="py-8 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 15, 
                      delay: 0.2 
                    }}
                    className="mb-4 inline-flex p-6 rounded-full bg-green-500/10 dark:bg-green-500/5"
                  >
                    <CheckCircle2 className="h-16 w-16 text-green-500 dark:text-green-400" />
                  </motion.div>
                  <h3 className={`${isDark ? "text-white" : "text-gray-800"} text-xl font-medium mb-3`}>
                    {t('passwordResetComplete')}
                  </h3>
                  <p className={`${isDark ? "text-white/70" : "text-gray-600"} mb-6`}>
                    {t('passwordResetSuccessful')}<br/>
                    {t('signInWithNewPassword')}
                  </p>
                  <Button 
                    onClick={() => router.push('/sign-in')}
                    className={`${isDark
                      ? "bg-white/10 text-white hover:bg-white/20"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    } px-6 py-2 h-11 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5`}
                  >
                    {t('goToSignIn')}
                  </Button>
                </motion.div>
              )}
            </CardContent>
            <CardFooter className={`flex justify-center border-t ${
              isDark ? "border-white/10" : "border-gray-200"
            } pt-6`}>
              {!resetComplete && (
                <p className={`text-sm ${isDark ? "text-white/70" : "text-gray-600"}`}>
                  {t('rememberPassword')}{" "}
                  <Link href="/sign-in" className="text-sketchdojo-primary hover:text-sketchdojo-accent hover:underline transition-colors font-medium">
                    {t('signIn')}
                  </Link>
                </p>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}