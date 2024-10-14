import { useSelector } from "react-redux";
import { RootState } from "devstream/aurelia/store";

export const useAppSelector = useSelector.withTypes<RootState>();
