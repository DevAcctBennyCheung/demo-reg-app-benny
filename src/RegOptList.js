import { React, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Title from "./Title"
import QuantityButton from "./QuantityButton"

export default function RegOptList() {

    let [eventRegOpt, setEventRegOpt] = useState([])
    useEffect(() => {
        fetch("https://devacctbennycheung.github.io/demo-reg-repository-api-benny/reg-opt-list.json")
            .then(targetResponse => targetResponse.json())
            .then(targetData => setEventRegOpt(targetData))
        console.log(eventRegOpt)
    }, [])

    const [regOptState, setRegOptState] = useState("Initial Value 初始值")
    const [testBtnDisplay, settestBtnDisplay] = useState(false)
    const regOptEvent = () => {
        setRegOptState("Reactive 有反應")
        console.log(regOptState)
        settestBtnDisplay(true)
    }
    const resetEvent = () => {
        setRegOptState("Initial Value 初始值")
        console.log(regOptState)
        settestBtnDisplay(false)
    }

    const [regOptDisplay, setRegOptDisplay] = useState(false)

    return (
        <>
            <button><Link className="router-link" to="/checkout">My Shopping Cart 我的購物車</Link></button><br /><br />
            <Title mainTitle="賽事報名 REG Event Registration" subTitle=" 2026" /><br />
            <img className="reg-opt-banner" src={process.env.PUBLIC_URL + "/reg-opt-images/reg-banner.jpg"} alt={"reg-banner.jpg"} />
            <><br />
                {regOptState}<br />
                {!testBtnDisplay && <button onClick={regOptEvent}>React Testing Button 反應測試按鈕</button>}
                {testBtnDisplay && <button onClick={resetEvent}>Reset 重置</button>}
                <br /><br />
                Display Settings 顯示設定<br />
                {!regOptDisplay && <button onClick={() => setRegOptDisplay(true)}>Hide Registration Option(s) 隱藏報名選項</button>}
                {regOptDisplay && <button onClick={() => setRegOptDisplay(false)}>Show Registration Option(s) 顯示報名選項</button>}
            </><br />
            <>
                Please Select a Race Event to Register.
                請選擇要報名的賽事。
            </>
            {
                !regOptDisplay &&
                <>
                    {
                        eventRegOpt.map(targetRegOpt => (
                            <div key={targetRegOpt.regOptId}>
                                <br />
                                <Link className="router-link" to={"/regOptDetail/" + targetRegOpt.regOptId}>
                                    <img src={process.env.PUBLIC_URL + "/reg-opt-images/" + targetRegOpt.regOptImage} alt={targetRegOpt.regOptImage} />
                                </Link>
                                <br />Id: {targetRegOpt.regOptId}<br />
                                Name: {targetRegOpt.regOptName}<br />
                                Price: HKD {targetRegOpt.regOptPrice}<br />
                                Description: {targetRegOpt.regOptDescription}<br />
                                <QuantityButton regOptInfo={targetRegOpt}/>
                            </div>
                        ))
                    }
                </>
            }
        </>
    )
    
}