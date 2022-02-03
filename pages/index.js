import { supabase } from "../lib/initSupabase";
import { Auth } from "@supabase/ui";
import TodoList from "../components/TodoList";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();

  const userInfo = Auth.useUser();
  useEffect(() => {
    if (userInfo?.user) {
      setUser(userInfo.user);
    }
    setIsLoading(false);
  }, [userInfo,user]);

  if (isLoading) {
    return "isLaoding";
  }
  return (
    <div className="w-full h-full bg-gray-300">
      {!user ? (
        <div className="w-80 h-full flex justify-center items-center p-4">
          <Auth
            supabaseClient={supabase}
            providers={["google", "github"]}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
          />
        </div>
      ) : (
        <div
          className="w-full h-full flex flex-col justify-center items-center p-4"
          style={{ minWidth: 250, maxWidth: 600, margin: "auto" }}
        >
          <TodoList user={supabase.auth.user()} />
          <button
            className="btn-black w-full mt-12"
            onClick={async () => {
              const { error } = await supabase.auth.signOut();
              if (error) console.log("Error logging out:", error.message);
              setUser()
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
