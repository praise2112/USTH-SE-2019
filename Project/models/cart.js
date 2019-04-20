// cart model for user's seesioj

module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalCost = oldCart.totalCost || 0;

    this.add = function(item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, cost: 0};
        }
        storedItem.qty++;
        storedItem.item.cost = roundToTwo(storedItem.item.cost);
        storedItem.cost = storedItem.item.cost * storedItem.qty;
        storedItem.cost = roundToTwo(storedItem.cost);
        this.totalQty++;
        this.totalCost += storedItem.item.cost;
        this.totalCost = roundToTwo(this.totalCost);

        console.log(this.totalCost)

    };


    this.reduceByOne = function(id) {
        console.log(this.totalCost+"1");
        this.items[id].item.cost =  roundToTwo(this.items[id].item.cost);
        this.items[id].qty--;
        this.items[id].cost -= this.items[id].item.cost;
        this.items[id].cost =  roundToTwo(this.items[id].cost);
        this.totalQty--;
        this.totalCost -=  this.items[id].item.cost ;
        this.totalCost =  roundToTwo(this.totalCost);
        console.log(this.totalCost+"2");

        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }

    };
    this.increaseByOne = function(id) {
        console.log(this.totalCost+"1");
        this.items[id].item.cost =  roundToTwo(this.items[id].item.cost);
        this.items[id].qty++;
        this.items[id].cost += this.items[id].item.cost;
        this.items[id].cost =  roundToTwo(this.items[id].cost);
        this.totalQty++;
        this.totalCost +=  this.items[id].item.cost ;
        this.totalCost =  roundToTwo(this.totalCost);
        console.log(this.totalCost+"2");



    };

    this.removeItem = function(id) {
        console.log(this.totalCost+"3");
        this.totalQty -= this.items[id].qty;
        this.items[id].cost =  roundToTwo(this.items[id].cost);
        this.totalCost -= this.items[id].cost ;
        this.totalCost =  roundToTwo(this.totalCost);

        delete this.items[id];
        console.log(this.totalCost+"4");
    };

    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
    function roundToTwo(num) {
        return +(Math.round(num + "e+2")  + "e-2");
    }
};