export const restaurants = [
  {
    id: 'res-1',
    name: 'Spice Garden',
    image:
      'https://images.unsplash.com/photo-1604908177630-b4a2dd6bd21b?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    cuisine: 'Indian',
    vegOnly: false,
    menu: [
      {
        id: 'itm-1',
        name: 'Butter Chicken',
        price: 320,
        veg: false,
        image:
          'https://images.unsplash.com/photo-1604908177000-607c291f2f8f?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'itm-2',
        name: 'Paneer Tikka',
        price: 260,
        veg: true,
        image:
          'https://images.unsplash.com/photo-1626200414679-e7de98e1d51a?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  {
    id: 'res-2',
    name: 'Green Bowl',
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    rating: 4.3,
    cuisine: 'Healthy',
    vegOnly: true,
    menu: [
      {
        id: 'itm-3',
        name: 'Quinoa Salad',
        price: 220,
        veg: true,
        image:
          'https://images.unsplash.com/photo-1546069901-eacef0df6022?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'itm-4',
        name: 'Avocado Toast',
        price: 180,
        veg: true,
        image:
          'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  {
    id: 'res-3',
    name: 'Sushi Hub',
    image:
      'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    cuisine: 'Japanese',
    vegOnly: false,
    menu: [
      {
        id: 'itm-5',
        name: 'Salmon Nigiri',
        price: 420,
        veg: false,
        image:
          'https://images.unsplash.com/photo-1600111623688-1d8c6bffe7b1?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'itm-6',
        name: 'Veg Maki Roll',
        price: 280,
        veg: true,
        image:
          'https://images.unsplash.com/photo-1553621042-4f6a04c4b1a2?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
];

export const getRestaurantById = (id) =>
  restaurants.find((res) => res.id === id);

