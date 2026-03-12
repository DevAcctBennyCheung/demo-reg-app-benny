import React from "react"

export default function Title({mainTitle, subTitle}) {

    return (
        <div>
            <div className="reg-opt-title">
                {mainTitle}
                {subTitle}
            </div>
        </div>
    )
    
}
