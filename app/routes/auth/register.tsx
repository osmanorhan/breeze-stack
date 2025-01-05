import { useState } from "react";
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
import type { Route } from "~/+types/auth/register";

const schema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be less than 50 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores and dashes"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

export async function action({ request }: Route.LoaderArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  try {
    const { data, error } = await auth.api.signUpEmail({
      body: {
        email: submission.value.email,
        password: submission.value.password,
        name: submission.value.username,
      },
    });

    if (error) {
      return submission.reply({
        formErrors: [error.message || "Failed to create account"],
      });
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
    } catch (signInError) {
      return submission.reply({
        formErrors: ["Account created. Please log in."],
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("email")) {
        return submission.reply({
          fieldErrors: {
            email: ["This email is already registered"],
          },
        });
      }
      return submission.reply({
        formErrors: [error.message],
      });
    }
    
    // Generic error
    return submission.reply({
      formErrors: ["Failed to create account. Please try again."],
    });
  }
}

export default function RegisterPage() {
  const lastResult = useActionData<typeof action>();
  const [isLoading, setIsLoading] = useState(false);

  const [form, fields] = useForm({
    id: "register-form",
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your information to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              <label htmlFor={fields.username.id} className="text-sm font-medium">
                Username
              </label>
              <Input
                {...getInputProps(fields.username, { type: "text" })}
                placeholder="johndoe"
              />
              {fields.username.errors && (
                <p className="text-sm text-destructive">{fields.username.errors}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor={fields.email.id} className="text-sm font-medium">
                Email
              </label>
              <Input
                {...getInputProps(fields.email, { type: "email" })}
                placeholder="john@example.com"
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
                {...getInputProps(fields.password, { type: "password" })}
                placeholder="••••••••"
              />
              {fields.password.errors && (
                <p className="text-sm text-destructive">{fields.password.errors}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Sign up"}
            </Button>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href="/auth/login" className="text-primary hover:underline">
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}