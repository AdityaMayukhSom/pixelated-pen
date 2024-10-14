import { selectIsLoggedIn } from "devstream/aurelia/features/auth";
import { useAppSelector } from "devstream/aurelia/hooks";
import { PropsWithChildren } from "react";
import { useLocation, Navigate } from "react-router-dom";

export const WithAuthenticationRouteGuard = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    const targetURL = `/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`;
    return <Navigate to={targetURL} replace={true} />;
  }

  return children;
};
