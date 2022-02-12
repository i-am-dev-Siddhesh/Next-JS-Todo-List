import { supabase } from "../lib/initSupabase";
import { Auth } from "@supabase/ui";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function IndexPage() {
    const router = useRouter();
    const userInfo = Auth.useUser();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (userInfo?.user) {
            setUser(userInfo.user);
            router.push("/");
        }
        setIsLoading(false);
    }, [userInfo]);

    if (isLoading) {
        return "isLaoding";
    }
    return (
        <div className="w-full h-full bg-gray-300">
            <div
                className="m-auto h-full flex justify-center items-center p-4"
                style={{
                    width: "400px",
                }}
            >
                <Auth
                    supabaseClient={supabase}
                    providers={["google", "github"]}
                    socialLayout="horizontal"
                    socialButtonSize="xlarge"
                />
            </div>
        </div>
    );
}
