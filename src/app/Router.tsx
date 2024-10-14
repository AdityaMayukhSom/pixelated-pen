import { WithAuthenticationRouteGuard, WithoutAuthenticationRouteGuard } from "devstream/aurelia/lib";
import { AuthLayout } from "devstream/aurelia/pages/auth/AuthLayout";
import { LandingPage } from "devstream/aurelia/pages/global/LandingPage";
import { RootLayout } from "devstream/aurelia/routes/RootLayout";
import { createBrowserRouter } from "react-router-dom";

export { LandingPage };
export const router = createBrowserRouter([
  {
    index: true,
    path: "/",
    lazy: async () => {
      const { LandingPage } = await import("devstream/aurelia/pages/global/LandingPage");
      return { Component: LandingPage };
    },
  },
  {
    path: "/about",
    lazy: async () => {
      const { AboutPage } = await import("devstream/aurelia/pages/global/AboutPage");
      return { Component: AboutPage };
    },
  },
  {
    path: "/pricing",
    lazy: async () => {
      const { PricingPage } = await import("devstream/aurelia/pages/global/PricingPage");
      return { Component: PricingPage };
    },
    // loader: async () => {
    //   const { usersLoader } = await import("./pages/routes/app/users");
    //   return usersLoader(queryClient)();
    // },
  },
  {
    path: "/",
    element: (
      <WithoutAuthenticationRouteGuard>
        <AuthLayout />
      </WithoutAuthenticationRouteGuard>
    ),
    children: [
      {
        path: "/auth/register",
        lazy: async () => {
          const { RegisterPage } = await import("devstream/aurelia/pages/auth/RegisterPage");
          return { Component: RegisterPage };
        },
      },
      {
        path: "/auth/login",
        lazy: async () => {
          const { LoginPage } = await import("devstream/aurelia/pages/auth/LoginPage");
          return { Component: LoginPage };
        },
      },
    ],
  },
  {
    path: "/user",
    element: (
      <WithAuthenticationRouteGuard>
        <RootLayout />
      </WithAuthenticationRouteGuard>
    ),
    children: [
      {
        path: "home",
        lazy: async () => {
          const { HomePage } = await import("devstream/aurelia/routes/HomePage");
          return { Component: HomePage };
        },
      },
      {
        path: "profile",
        lazy: async () => {
          const { ProfilePage } = await import("devstream/aurelia/routes/ProfilePage");
          return { Component: ProfilePage };
        },
      },
      {
        path: "settings",
        lazy: async () => {
          const { SettingsPage } = await import("devstream/aurelia/routes/SettingsPage");
          return { Component: SettingsPage };
        },
      },
      {
        path: "posts",
        children: [
          {
            path: "create",
            lazy: async () => {
              const { CreatePostPage } = await import("devstream/aurelia/routes/posts/CreatePostPage");
              return { Component: CreatePostPage };
            },
          },
          {
            path: "update/:postId",
            lazy: async () => {
              const { UpdatePostPage } = await import("devstream/aurelia/routes/posts/UpdatePostPage");
              return { Component: UpdatePostPage };
            },
          },
          {
            path: "create",
            lazy: async () => {
              const { CreatePostPage } = await import("devstream/aurelia/routes/posts/CreatePostPage");
              return { Component: CreatePostPage };
            },
          },
        ],
      },
    ],
  },
  {
    path: "*",
    lazy: async () => {
      const { NotFound } = await import("devstream/aurelia/pages/extras/NotFound");
      return { Component: NotFound };
    },
  },
]);
