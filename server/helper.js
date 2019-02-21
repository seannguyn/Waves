module.exports = {
    cartIntersection: async (newCart, oldCart) => {
        
        
        var hashCart = {};
        
        for (j = 0; j < oldCart.length; j++) {
            hashCart[oldCart[j].id] = oldCart[j].quantity;
        }
        
        for (i = 0; i < newCart.length; i++) {
            if (hashCart[newCart[i].id]) {
                hashCart[newCart[i].id] += newCart[i].quantity;
            }
            else {
                hashCart[newCart[i].id] = newCart[i].quantity;
            }
        }
        
        var result = Object.keys(hashCart).map(function(key) {
            return {id: key, quantity: hashCart[key]};
        });

        return result;
    }
}