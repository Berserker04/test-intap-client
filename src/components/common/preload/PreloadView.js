import { BoxLoading } from "react-loadingg";

import "./styles.scss"

export const PreloadView = () => {
    return (
        <div className="preload">
            <br/>
            <div className="preload-icon">
                <BoxLoading />
            </div>

        </div>
    )
}