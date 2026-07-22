
import { Form, Link, useActionData } from "react-router-dom";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import {
    Card
} from "@/components/ui/card"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LogIn = () => {
  const actionData = useActionData() as
  | {
      errors?: {
        username?: string[];
        password?: string[];
        login?: string[];
      };
    }
  | undefined;
  return (
    <Card className="h-full w-full">
    <Form method="post" className="w-full mx-auto space-y-6">
      <FieldGroup>
        <Field>
          <FieldLabel >User Name</FieldLabel>

          <FieldDescription>
            Enter your username
          </FieldDescription>

          <FieldContent>
            <Input
              name="username"
              type="text"
              placeholder="Username"
            />
          </FieldContent>

          <FieldError />
        </Field>

        <Field>
          <FieldLabel>Password</FieldLabel>

          <FieldDescription>
            Enter your password
          </FieldDescription>

          <FieldContent>
            <Input
              name="password"
              type="password"
              placeholder="Password"
            />
          </FieldContent>

          <FieldError />
        </Field>

        <FieldSeparator />

        <Button type="submit" className="w-full">
          Log In
        </Button>
        <FieldSeparator />
        <FieldError errors={actionData?.errors?.login?.map(message => ({ message }))}></FieldError>

        <p className="text-center">
          New User?{" "}
          <Link
            to="/signUp"
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </FieldGroup>
    </Form>
    </Card>
  );
};

export default LogIn;