import { CartContext } from "./CartContext"
import { React, useContext } from "react"
import { Link } from "react-router-dom"
import QuantityButton from "./QuantityButton"
import Title from "./Title"

export default function Checkout() {

    const { targetCartItem, setTargetCartItem } = useContext(CartContext)

    let cartEmpty = targetCartItem.length <= 0 ? true : false

    let grandTotal = targetCartItem.reduce((myGrandTotal, myGrandData) => {
        return myGrandTotal += myGrandData.regOptPrice * myGrandData.regOptQuantity
    }, 0)
    const freeShippingPrice = 99

    let regTotal = targetCartItem.reduce((myRegTotal, myRegData) => {
        return myRegTotal += myRegData.regOptQuantity
    }, 0)

    return (
        <>
            <br /><Title mainTitle="My Shopping Cart 我的購物車" /><br />
            {
                cartEmpty &&
                <>No registration(s) in your shopping cart. 你的購物車沒有報名項目。</>
            }
            {
                !cartEmpty &&
                <>
                    <div id="cartSection">
                        {
                            targetCartItem.map(targetRegOpt => (
                                <div key={targetRegOpt.regOptId}>
                                    <br />
                                    <Link className="router-link" to={"/regOptDetail/" + targetRegOpt.regOptId}>
                                        <img src={process.env.PUBLIC_URL + "/reg-opt-images/" + targetRegOpt.regOptImage} alt={targetRegOpt.regOptImage} />
                                    </Link>
                                    <br />Id: {targetRegOpt.regOptId}<br />
                                    Name: {targetRegOpt.regOptName}<br />
                                    Price: {targetRegOpt.regOptPrice}<br />
                                    Description: {targetRegOpt.regOptDescription}<br />
                                    <QuantityButton regOptInfo={targetRegOpt}/>
                                </div>
                            ))
                        }
                    </div><br />
                    <div id="checkoutSection">
                        <>Total Number of Registration(s) is/are {regTotal}.<br />總報名數目為 {regTotal}。</><br /><br />
                        <>Total Price of Registration(s) is HKD {grandTotal}.<br />總報名費用為 HKD {grandTotal}。</><br /><br />
                        {
                            grandTotal >= freeShippingPrice ?
                                <>We have free runner package shipping for you!<br />我們可以為你提供免費跑手包送貨!</> :
                                <>
                                    We have free shipping of runner package for registration(s) over HKD {freeShippingPrice}. 我們為超過 HKD {freeShippingPrice} 的報名提供免費送貨。<br />
                                    <br />HKD {freeShippingPrice - grandTotal} still needed. 還需要 HKD {freeShippingPrice - grandTotal}。
                                </>
                        }
                    </div>
                </>
            }

            <br /><br /><Link className="router-link" to="/">
                <button>Back to Home Page 回到首頁</button>
            </Link>
        </>
    )
}