import { router } from "devstream/aurelia/app/Router";
import { NotificationContainer } from "devstream/aurelia/components/ui/notifications";
import { Spinner } from "devstream/aurelia/components/ui/spinner";
import { store } from "devstream/aurelia/store";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spinner size="xl" />
    </div>
  );
};

export const Aurelia = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Provider stabilityCheck="always" store={store}>
        <NotificationContainer />
        <RouterProvider router={router} />
      </Provider>
    </Suspense>
  );
};
