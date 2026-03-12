import { React, useContext, useState } from "react"
import { CartContext } from "./CartContext"

export default function QuantityButton({ regOptInfo }) {

    const { targetCartItem, setTargetCartItem } = useContext(CartContext)

    let regOptIndexInCart = targetCartItem.findIndex((myElement) => {
        return myElement.regOptId === regOptInfo.regOptId
    })

    const [numInCart, setNumInCart] = useState(
        (regOptIndexInCart === -1) ?
            0 :
            targetCartItem[regOptIndexInCart].regOptQuantity
    )

    const handleSub = () => {
        if (targetCartItem[regOptIndexInCart].regOptQuantity === 1) {
            let handleSubArray = [...targetCartItem]
            handleSubArray.splice(regOptIndexInCart, 1)
            setTargetCartItem(handleSubArray)
        } else {
            let handleSubArray = [...targetCartItem]
            handleSubArray[regOptIndexInCart].regOptQuantity --
            setTargetCartItem(handleSubArray)
        }
        setNumInCart(numInCart - 1)
    }
    const handleAdd = () => {
        if (regOptIndexInCart === -1) {
            setTargetCartItem(
                [
                    {
                        "regOptId": regOptInfo.regOptId,
                        "regOptName": regOptInfo.regOptName,
                        "regOptPrice": regOptInfo.regOptPrice,
                        "regOptImage": regOptInfo.regOptImage,
                        "regOptDescription": regOptInfo.regOptDescription,
                        "regOptQuantity": 1
                    },
                    ...targetCartItem
                ]
            )
        } else {
            let handleAddArray = [...targetCartItem]
            handleAddArray[regOptIndexInCart].regOptQuantity ++
            setTargetCartItem(handleAddArray)
        }
        setNumInCart(numInCart + 1)
    }

    return (
        <>
            {
                (numInCart === 0) ?
                    <>
                        <button onClick={handleAdd}>Add to Shopping Cart 加入購物車</button>
                    </> :
                    <>
                        <button onClick={handleSub}>-</button>
                        <span> </span>{numInCart}<span> </span>
                        <button onClick={handleAdd}>+</button>
                    </>
            }
        </>
    )
}