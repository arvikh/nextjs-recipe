import Sign from "@/Common-Components/Common-sign";
function SignUp() {
  return (
    <div
      className="flex flex-col justify-center items-center w-screen h-screen"
      style={{ backgroundColor: "#635985" }}
    >
      <div
        style={{ backgroundColor: "#CAE0BC" }}
        className="rounded-lg p-8 text-grey"
      >
        <Sign from="signup" />
      </div>
    </div>
  );
}

export default SignUp;
