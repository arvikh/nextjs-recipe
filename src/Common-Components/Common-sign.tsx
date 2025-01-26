"use client";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCallback, useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { UserContext } from "@/context/UserContext";

function Sign({ from }: { from: "signin" | "signup" }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { toast } = useToast();
  const { setUserId } = useContext(UserContext);

  const handleSubmit = useCallback(async () => {
    try {
      const response = await axios.post(
        from == "signup" ? "/api/user/register" : "/api/user/login",
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        response.data.id && setUserId(response.data.id);
        from == "signup" ? router.push("/signin") : router.push("/home");
      } else {
        toast({
          variant: "destructive",
          title: response.data.message.issues?.[0]?.message,
        });
      }
    } catch (error) {
      toast({
        title: "something went wrong",
      });
    }
  }, [from, email, password, setUserId, router, toast]);
  return (
    <div className="flex flex-col justify-center h-80 gap-2">
      <h1>{from == "signup" ? "Sign Up" : "Sign In"}</h1>
      <Input
        onChange={(e) => setEmail(e.target.value)}
        className="w-80 m-2"
        placeholder="Email"
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        className="w-80 m-2"
        type="password"
        placeholder="Password"
      />
      <Button onClick={handleSubmit} variant={"outline"} className="w-80 m-2">
        {from == "signup" ? "SignUp" : "SignIn"}
      </Button>
      {from == "signup" && (
        <p>
          Already registered? , Please <Link href={"/signin"}>Sign In</Link>
        </p>
      )}
    </div>
  );
}
export default Sign;
