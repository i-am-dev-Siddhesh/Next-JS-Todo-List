import { Auth } from "@supabase/ui";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CustomLoader } from "../components/CustomLoader";
import TodoList from "../components/TodoList";
import { supabase } from "../lib/initSupabase";

export default function IndexPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();
    const router = useRouter();

    const userInfo = Auth.useUser();
    useEffect(() => {
        if (userInfo?.user) {
            setUser(userInfo.user);
        } else {
            router.push("/login");
        }
        setIsLoading(false);
    }, [userInfo]);

    if (isLoading) {
        return <CustomLoader />;
    }
    return (
        <div className="w-full h-full bg-gray-300">
            <div
                className="w-full h-full flex flex-col justify-center items-center p-4"
                style={{ minWidth: 250, maxWidth: 600, margin: "auto" }}
            >
                <TodoList user={user} />
                <button
                    className="btn-black w-full mt-12"
                    onClick={async () => {
                        const { error } = await supabase.auth.signOut();
                        if (error)
                            console.log("Error logging out:", error.message);
                        setUser();
                        router.push("/login");
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
