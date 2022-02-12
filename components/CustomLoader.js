import { PuffLoader } from "react-spinners";

export const CustomLoader = () => {
    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                width: "100vw",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                background: "rgba(226, 232, 240, 1)",
            }}
        >
            <PuffLoader color="blue" size={100} />
            <h1 style={{ fontSize: "24px", marginTop: "10px" }}>Please Wait</h1>
        </div>
    );
};
