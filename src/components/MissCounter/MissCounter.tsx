import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { MissDisplay } from "./styles";

export const MissCounter = () => {
  const misses = useSelector((state: RootState) => state.typerSlice.misses);
  return <MissDisplay>{"Misstrike count: "+misses}</MissDisplay>;
};
