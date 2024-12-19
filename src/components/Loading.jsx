import { ThreeDots } from "react-loader-spinner"

export default function Loading () {
    return(
        <div className="flex justify-center items-center h-screen">
            <ThreeDots height={100} width={100} color="indigo" ariaLabel="Loading"/>
        </div>
    )
}