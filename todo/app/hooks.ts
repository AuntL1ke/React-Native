import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch = useAppDispatch.withTypes<AppDispatch>()
export const useAppSelector = useAppSelector.withTypes<RootState>()