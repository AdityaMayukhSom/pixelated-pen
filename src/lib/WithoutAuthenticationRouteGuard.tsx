import { selectIsLoggedIn } from "devstream/aurelia/features/auth";
import { useAppSelector } from "devstream/aurelia/hooks";
import { PropsWithChildren } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

export const WithoutAuthenticationRouteGuard = ({ children }: PropsWithChildren) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [searchParams, _] = useSearchParams();

  if (isLoggedIn) {
    const targetURL = searchParams.get("redirectTo") ?? "/user/home";
    return <Navigate to={targetURL} replace={true} />;
  }

  return children;
};
