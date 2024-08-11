import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const MissCounter = () => {
  const misses = useSelector((state: RootState) => state.typerSlice.misses);
  return <div>{misses}</div>;
};
