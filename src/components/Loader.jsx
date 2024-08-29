import { FadeLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="d-flex justify-content-center vh-100 align-items-center ">
      <FadeLoader color="var(--Neon-Green)" />
    </div>
  );
}
