import { useDispatch } from "react-redux";
import { AppDispatch } from "devstream/aurelia/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
