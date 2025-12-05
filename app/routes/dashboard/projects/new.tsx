import { redirect } from "react-router";
import { Form, useActionData } from "react-router";
import { useForm, getFormProps, getInputProps, getTextareaProps } from "@conform-to/react";
import { parseWithZod, getZodConstraint } from "@conform-to/zod";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import prisma from "~/lib/db.server";
import { auth } from "~/lib/auth.server";
import type { Route } from "./+types/new";

const schema = z.object({
  name: z
    .string({ message: "Project name is required" })
    .min(3, "Project name must be at least 3 characters")
    .max(50, "Project name must be less than 50 characters"),
  description: z
    .string({ message: "Description is required" })
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  startDate: z
    .string({ message: "Start date is required" })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Please enter a valid date",
    }),
  budget: z
    .string({ message: "Budget is required" })
    .refine(
      (val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num > 0;
      },
      { message: "Please enter a valid budget amount" }
    ),
  isPublic: z.boolean().optional(),
});

export async function action({ request }: Route.ActionArgs) {
  // Get the current user
  const session = await auth.api.getSession({headers: request.headers});
  if (!session?.user) {
    return redirect("/login");
  }

  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  try {
    // Convert the validated data to match our Prisma schema
    const projectData = {
      name: submission.value.name,
      description: submission.value.description,
      startDate: new Date(submission.value.startDate),
      budget: parseFloat(submission.value.budget),
      isPublic: submission.value.isPublic || false,
      userId: session.user.id,
    };

    // Create the project in the database
    const project = await prisma.project.create({
      data: projectData,
    });

    return redirect("/dashboard/projects");
  } catch (error) {
    console.error("Failed to create project:", error);
    return submission.reply({
      formErrors: ["Failed to create project. Please try again."],
    });
  }
}

export default function NewProject() {
  const lastResult = useActionData<typeof action>();
  
  const [form, fields] = useForm({
    id: "new-project-form",
    lastResult,
    constraint: getZodConstraint(schema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    defaultValue: {
      name: "",
      description: "",
      startDate: new Date().toISOString().split("T")[0],
      budget: "",
      isPublic: false
    },
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <Form 
            method="post" 
            className="space-y-6"
            {...getFormProps(form)}
          >
            {form.errors && (
              <div className="text-sm text-destructive">
                {form.errors.map((error, i) => (
                  <p key={i}>{error}</p>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor={fields.name.id} className="text-sm font-medium">
                Project Name
              </label>
              <Input
                {...getInputProps(fields.name, {
                  type: "text",
                  placeholder: "Enter project name"
                })}
              />
              {fields.name.errors && (
                <p className="text-sm text-destructive">{fields.name.errors}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor={fields.description.id} className="text-sm font-medium">
                Description
              </label>
              <textarea
                {...getTextareaProps(fields.description)}
                className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter project description"
              />
              {fields.description.errors && (
                <p className="text-sm text-destructive">
                  {fields.description.errors}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor={fields.startDate.id} className="text-sm font-medium">
                Start Date
              </label>
              <Input
                {...getInputProps(fields.startDate, { type: "date" })}
              />
              {fields.startDate.errors && (
                <p className="text-sm text-destructive">
                  {fields.startDate.errors}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor={fields.budget.id} className="text-sm font-medium">
                Budget
              </label>
              <Input
                {...getInputProps(fields.budget, {
                  type: "number",
                  step: "0.01",
                  min: "0",
                  placeholder: "Enter project budget"
                })}
              />
              {fields.budget.errors && (
                <p className="text-sm text-destructive">
                  {fields.budget.errors}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                {...getInputProps(fields.isPublic, { type: "checkbox" })}
                className="h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor={fields.isPublic.id} className="text-sm font-medium">
                Make project public
              </label>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="reset" variant="outline">
                Reset
              </Button>
              <Button type="submit">Create Project</Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
