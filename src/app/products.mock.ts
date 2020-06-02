export const mockProduct = {
  name: 'Oatmeal',
  description: 'Hot and fluffy oatmeal & protein powder cake',
  price: 330.00,
  image: '../assets/images/oatmeal.jpg',
  limit: 30
};

export const mockCart = { cart: [{ productName: mockProduct.name, productQuantity: 1 }] };

export const mockProducts = [
  {
    name: 'Oatmeal',
    description: 'Hot and fluffy oatmeal & protein powder cake',
    price: 330.00,
    image: '../assets/images/oatmeal.jpg',
    limit: 30
  },
  {
    name: 'WS License',
    description: 'Rare WS license. No need for military email',
    price: 200.00,
    image: '../assets/images/ws.png'
  },
  {
    name: 'Coconut',
    description: 'Good coconut to make oil for your beard',
    price: 100.00,
    image: '../assets/images/coconut.png',
    limit: 5
  },
  {
    name: 'Beard Exempt',
    description: 'Your very own license to grow beard',
    price: 777.00,
    image: '../assets/images/beard.jpg',
    limit: 10
  },
  {
    name: 'A Day Off',
    description: '1 day off work',
    price: 1000000.00,
    image: '../assets/images/freedom.png'
  },
  {
    name: 'JS Book for Beginners',
    description: 'Digital javascript book to start coding your first js website',
    price: 330.00,
    image: '../assets/images/js-book.png'
  }
];

export const mockProductsAfterCheckout = [
  {
    name: 'Oatmeal',
    description: 'Hot and fluffy oatmeal & protein powder cake',
    price: 330.00,
    image: '../assets/images/oatmeal.jpg',
    limit: 29
  },
  {
    name: 'WS License',
    description: 'Rare WS license. No need for military email',
    price: 200.00,
    image: '../assets/images/ws.png'
  },
  {
    name: 'Coconut',
    description: 'Good coconut to make oil for your beard',
    price: 100.00,
    image: '../assets/images/coconut.png',
    limit: 5
  },
  {
    name: 'Beard Exempt',
    description: 'Your very own license to grow beard',
    price: 777.00,
    image: '../assets/images/beard.jpg',
    limit: 10
  },
  {
    name: 'A Day Off',
    description: '1 day off work',
    price: 1000000.00,
    image: '../assets/images/freedom.png'
  },
  {
    name: 'JS Book for Beginners',
    description: 'Digital javascript book to start coding your first js website',
    price: 330.00,
    image: '../assets/images/js-book.png'
  }
];

export const mockEntityProductState = {
  ids: ['Oatmeal', 'WS License', 'Coconut', 'Beard Exempt', 'A Day Off', 'JS Book for Beginners'],
  entities: {
    Oatmeal:   {
      name: 'Oatmeal',
      description: 'Hot and fluffy oatmeal & protein powder cake',
      price: 330.00,
      image: '../assets/images/oatmeal.jpg',
      limit: 30
    },
    'WS License': {
      name: 'WS License',
      description: 'Rare WS license. No need for military email',
      price: 200.00,
      image: '../assets/images/ws.png'
    }, Coconut :   {
      name: 'Coconut',
      description: 'Good coconut to make oil for your beard',
      price: 100.00,
      image: '../assets/images/coconut.png',
      limit: 5
    },
    'Beard Exempt':   {
      name: 'Beard Exempt',
      description: 'Your very own license to grow beard',
      price: 777.00,
      image: '../assets/images/beard.jpg',
      limit: 10
    },
    'A Day Off' :  {
      name: 'A Day Off',
      description: '1 day off work',
      price: 1000000.00,
      image: '../assets/images/freedom.png'
    } ,
    'JS Book for Beginners' :   {
      name: 'JS Book for Beginners',
      description: 'Digital javascript book to start coding your first js website',
      price: 330.00,
      image: '../assets/images/js-book.png'
    }
  }
};

export const mockEntityProductStateAfterCheckout = {
  ids: ['Oatmeal', 'WS License', 'Coconut', 'Beard Exempt', 'A Day Off', 'JS Book for Beginners'],
  entities: {
    Oatmeal:   {
      name: 'Oatmeal',
      description: 'Hot and fluffy oatmeal & protein powder cake',
      price: 330.00,
      image: '../assets/images/oatmeal.jpg',
      limit: 25
    },
    'WS License': {
      name: 'WS License',
      description: 'Rare WS license. No need for military email',
      price: 200.00,
      image: '../assets/images/ws.png'
    }, Coconut :   {
      name: 'Coconut',
      description: 'Good coconut to make oil for your beard',
      price: 100.00,
      image: '../assets/images/coconut.png',
      limit: 5
    },
    'Beard Exempt':   {
      name: 'Beard Exempt',
      description: 'Your very own license to grow beard',
      price: 777.00,
      image: '../assets/images/beard.jpg',
      limit: 10
    },
    'A Day Off' :  {
      name: 'A Day Off',
      description: '1 day off work',
      price: 1000000.00,
      image: '../assets/images/freedom.png'
    } ,
    'JS Book for Beginners' :   {
      name: 'JS Book for Beginners',
      description: 'Digital javascript book to start coding your first js website',
      price: 330.00,
      image: '../assets/images/js-book.png'
    }
  }
};
