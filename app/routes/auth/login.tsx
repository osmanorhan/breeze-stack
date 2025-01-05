import { redirect } from "react-router";
import { Form, useActionData } from "react-router";
import { useForm, getFormProps, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { auth } from "~/lib/auth.server";
import type { Route } from "~/+types/auth/login";

// Schema for email login
const emailLoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required"),
});

// Schema for social login
const socialLoginSchema = z.object({
  loginType: z.literal("social"),
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const loginType = formData.get("loginType");

  if (loginType === "social") {
    // Parse with the social schema for proper typing
    const submission = parseWithZod(formData, { schema: socialLoginSchema });

    try {
      const signInRes = await auth.api.signInSocial({
        body: {
          provider: "google",
          asResponse: true,
        },
      });
      return redirect(signInRes.url);
    } catch (error) {
      console.error("Social login error:", error);
      return submission.reply({
        formErrors: ["Failed to connect with Google. Please try again."],
      });
    }
  } 

  // Email login validation
  const submission = parseWithZod(formData, { schema: emailLoginSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  try {
    const signInRes = await auth.api.signInEmail({
      body: {
        email: submission.value.email,
        password: submission.value.password,
      },
      asResponse: true,
    });
    return redirect("/dashboard", { headers: signInRes.headers });
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof Error) {
      if (error.message.includes("credentials")) {
        return submission.reply({
          formErrors: ["Invalid email or password"],
        });
      }
      return submission.reply({
        formErrors: [error.message],
      });
    }
    return submission.reply({
      formErrors: ["Failed to sign in. Please try again."],
    });
  }
}

export default function LoginPage() {
  const lastResult = useActionData<typeof action>();

  // Form for email login
  const [form, fields] = useForm({
    id: "email-login-form",
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: emailLoginSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  // Form for social login
  const [socialForm] = useForm({
    id: "social-login-form",
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: socialLoginSchema });
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Google Login Form */}
          <Form 
            method="post" 
            className="w-full"
            {...getFormProps(socialForm)}
          >
            <input type="hidden" name="loginType" value="social" />
            <Button
              type="submit"
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Continue with Google
            </Button>
          </Form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Email Login Form */}
          <Form 
            method="post" 
            className="space-y-4"
            {...getFormProps(form)}
          >
            {form.errors && (
              <Alert variant="destructive">
                <AlertDescription>
                  {form.errors.map((error, i) => (
                    <p key={i}>{error}</p>
                  ))}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <label htmlFor={fields.email.id} className="text-sm font-medium">
                Email
              </label>
              <Input
                {...getInputProps(fields.email, { 
                  type: "email",
                  placeholder: "Email address" 
                })}
                className="w-full"
              />
              {fields.email.errors && (
                <p className="text-sm text-destructive">{fields.email.errors}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor={fields.password.id} className="text-sm font-medium">
                Password
              </label>
              <Input
                {...getInputProps(fields.password, { 
                  type: "password",
                  placeholder: "Password"
                })}
                className="w-full"
              />
              {fields.password.errors && (
                <p className="text-sm text-destructive">{fields.password.errors}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm">
            <a href="/auth/register" className="text-blue-600 hover:text-blue-500">
              Don't have an account? Sign up
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}