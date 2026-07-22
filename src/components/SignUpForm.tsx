import { Form, Link, useActionData } from "react-router-dom";

import {
  Field,
  FieldContent,
  FieldDescription,
 
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignUp = () => {
  const actionData=useActionData();
  return (
  <div className="m-0 p-0 flex w-full h-full flex-col justify-center items-center">
    <Form method="post" className=" w-2/3 h-2/3 space-y-6 ">
      <FieldGroup>
        <Field>
          <FieldLabel>User Name</FieldLabel>

          <FieldDescription>
            Choose a username
          </FieldDescription>

          <FieldContent>
            <Input
              name="username"
              type="text"
              placeholder="Username"
            />
          </FieldContent>

          <div>
            {actionData?.errors?.username &&
              <p
                className="text-red-900 p-4">
                  * {actionData.errors.username[0]}
              </p>
            } 
          </div>
        </Field>

        

        <Field>
          <FieldLabel>Password</FieldLabel>

          <FieldDescription>
            Choose a strong password
          </FieldDescription>

          <FieldContent>
            <Input
              name="password"
              type="password"
              placeholder="Password"
            />
          </FieldContent>

          <div>
            {actionData?.errors?.password &&
              <p
                className="text-red-900 p-4">
                  * {actionData.errors.password[0]}
              </p>
            }
          </div>
        </Field>

        <Field>
          <FieldLabel>Confirm Password</FieldLabel>

          <FieldDescription>
            Re-enter your password
          </FieldDescription>

          <FieldContent>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
            />
          </FieldContent>

          <div>
            {actionData?.errors?.confirmPassword && <p className="text-red-900 p-4">
              * {actionData.errors.confirmPassword[0]}</p>}
          </div>
        </Field>

        <FieldSeparator />

        <Button type="submit" className="w-full">
          Create Account
        </Button>

        <p className="text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline"
          >
            Log In
          </Link>
        </p>
      </FieldGroup>
    </Form>
    </div>
  );
};

export default SignUp;