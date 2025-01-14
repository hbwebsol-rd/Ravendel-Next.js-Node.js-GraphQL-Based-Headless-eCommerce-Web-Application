addCart: async (root, args, { id }) => {
    if (!id) {
      return MESSAGE_RESPONSE("TOKEN_REQ", "Cart", false);
    }
    try {
      const cart = await Cart.findOne({ userId:new ObjectId(args.userId)   });
      var carttotal = 0;
      console.log("cart any==========",cart)
      if(cart){
        for (let i in args.products) {
          if (args.products[i].productId) {
            const product = await Product.findById({ _id: args.products[i].productId });
            if (product.pricing.sellprice > 0) {
              args.products[i].total = args.products[i].qty * product.pricing.sellprice;
            } else {
              args.products[i].total = args.products[i].qty * product.pricing.price;
            }
          }
          carttotal = carttotal + args.products[i].total;
        }
        await cart.save();
        console.log("existingCart======",cart)
      } 
      
      const newCart = new Cart({
        userId: args.userId,
        total: carttotal,
        // products: args.products
      });
      await newCart.save();
      console.log("newCart=======",newCart)
      return MESSAGE_RESPONSE("AddSuccess", "Cart", true);
    } catch (error) {
      // console.log(error);
      error = checkError(error);
      return MESSAGE_RESPONSE("CREATE_ERROR", "Cart", false);
    }
  },