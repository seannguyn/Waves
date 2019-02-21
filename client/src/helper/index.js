
export function manipulateCartData(cartItems, productArray) {
    var hashTable = {}

    for (var i = 0; i < productArray.length; i++) {
        hashTable[productArray[i]._id] = {...productArray[i]}
    }

    for (var k = 0; k < cartItems.length; k++) {
        hashTable[cartItems[k].id].quantity = cartItems[k].quantity;
    }

    var result = Object.keys(hashTable).map(function(key) {
        return {...hashTable[key]};
    });    

    return result;
}