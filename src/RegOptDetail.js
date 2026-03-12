import { React, useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Title from "./Title"
import QuantityButton from "./QuantityButton"

export default function RegOptDetail() {

    let myParams = useParams()

    let [regOptDetail, setRegOptDetail] = useState(null)

    useEffect(() => {
        fetch("https://devacctbennycheung.github.io/demo-reg-repository-api-benny/reg-opt-list.json")
            .then(targetResponse => targetResponse.json())
            .then(targetData => {
                let myInfo = targetData.find((myElement) => {
                    return myElement.regOptId === parseInt(myParams.paramsId)
                })
                setRegOptDetail(myInfo)
            })
    }, [])

    return (
        <>
            <button><Link className="router-link" to="/checkout">My Shopping Cart 我的購物車</Link></button><br /><br />

            {
                regOptDetail &&
                <>
                    <Title mainTitle={"Event Registration 項目報名" + " " + myParams.paramsId} /><br />
                    <img src={process.env.PUBLIC_URL + "/reg-opt-images/" + regOptDetail.regOptImage} alt={regOptDetail.regOptImage} />
                    <br />Id: {regOptDetail.regOptId}<br />
                    Name: {regOptDetail.regOptName}<br />
                    Price: HKD {regOptDetail.regOptPrice}<br />
                    Description: {regOptDetail.regOptDescription}<br />
                    <QuantityButton regOptInfo={regOptDetail}/><br />
                </>
            }

            <br /><Link className="router-link" to="/">
                <button>Back to Home Page 回到首頁</button>
            </Link>
        </>

    )
}