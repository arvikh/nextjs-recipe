import Sign from "@/Common-Components/Common-sign";

function SignIn() {
  return (
    <div
      className="flex justify-center items-center w-screen h-screen"
      style={{ backgroundColor: "#635985" }}
    >
      <div
        style={{ backgroundColor: "#CAE0BC" }}
        className="rounded-lg p-8 text-grey"
      >
        <Sign from="signin" />
      </div>
    </div>
  );
}

export default SignIn;
