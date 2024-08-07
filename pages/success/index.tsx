// success page react
import { useRouter } from "next/router";

const Success = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Payment successful!</h1>
      <button onClick={() => router.push("/")}>Go back home</button>
    </div>
  );
};

export default Success;
