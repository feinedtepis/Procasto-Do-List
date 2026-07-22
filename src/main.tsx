import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import type { ActionFunctionArgs } from "react-router-dom"
import "./index.css";

import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import {Home} from "./components/home"
import { App } from "./App";
import LogIn from "@/components/loginForm";
import SignUp from "@/components/SignUpForm";
import { Suser, Luser } from "@/components/Form";
import { ThemeProvider } from "@/components/theme-provider";
type Todo = {
  task: string;
  completed: boolean;
};

type ToDoListType = {
  [date: string]: Todo[];
};

type User = {
  username: string;
  password: string;
  todos: ToDoListType;
};
export async function profileLoader() {
  const currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    return redirect("/login");
  }

  return null;
}

async function SignupAction({ request }:ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const result = Suser.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const users: User[] = JSON.parse(localStorage.getItem("users") ?? "[]");

  // Prevent duplicate usernames
  if (
    users.some(
      (user) =>
        user.username.toLowerCase() ===
        result.data.username.toLowerCase()
    )
  ) {
    return {
      errors: {
        username: ["Username already exists"],
      },
    };
  }

  const body = {
    username: result.data.username,
    password: result.data.password,
    todos: {}, // Initialize empty todo list
  };

  users.push(body);

  localStorage.setItem("users", JSON.stringify(users));

  // Automatically log the user in
  localStorage.setItem("currentUser", body.username);

  return redirect("/profile");
}

export async function loginAction({ request }:ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const result = Luser.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const users = JSON.parse(localStorage.getItem("users") ?? "[]");

  for (const user of users) {
    if (
      user.username === result.data.username &&
      user.password === result.data.password
    ) {
      // Store the currently logged-in user
      localStorage.setItem("currentUser", user.username);

      return redirect("/profile");
    }
  }

  return {
    errors: {
      login: ["Wrong username or password"],
    },
  };
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      {
        path: "profile",
        Component: App,
        loader: profileLoader,
      },
      {
        path: "login",
        Component: LogIn,
        action: loginAction,
      },
      {
        path: "signup",
        Component: SignUp,
        action: SignupAction,
      },
    ],
  },
],
{
    basename: import.meta.env.BASE_URL, // resolves to "/Film_Fire/" in production
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);