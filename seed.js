const mongoose = require('mongoose');
const Flight = require('./models/Flight');
const User = require('./models/User');

const getFutureDate = (daysAhead) => {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date;
};

const sampleFlights = [
  // Mumbai <-> Delhi
  {
    airline: 'IndiGo',
    flightNumber: '6E-2041',
    from: 'Mumbai (BOM)',
    to: 'Delhi (DEL)',
    departureDate: getFutureDate(1),
    departureTime: '06:00 AM',
    arrivalTime: '08:15 AM',
    duration: '2h 15m',
    class: 'Economy',
    price: 4500,
    totalSeats: 180,
    availableSeats: 142,
    status: 'On Time'
  },
  {
    airline: 'Air India',
    flightNumber: 'AI-887',
    from: 'Mumbai (BOM)',
    to: 'Delhi (DEL)',
    departureDate: getFutureDate(1),
    departureTime: '09:30 AM',
    arrivalTime: '11:45 AM',
    duration: '2h 15m',
    class: 'Business',
    price: 12500,
    totalSeats: 30,
    availableSeats: 18,
    status: 'On Time'
  },
  {
    airline: 'Vistara',
    flightNumber: 'UK-992',
    from: 'Mumbai (BOM)',
    to: 'Delhi (DEL)',
    departureDate: getFutureDate(2),
    departureTime: '02:15 PM',
    arrivalTime: '04:30 PM',
    duration: '2h 15m',
    class: 'Economy',
    price: 4850,
    totalSeats: 164,
    availableSeats: 98,
    status: 'On Time'
  },
  {
    airline: 'SpiceJet',
    flightNumber: 'SG-8169',
    from: 'Delhi (DEL)',
    to: 'Mumbai (BOM)',
    departureDate: getFutureDate(1),
    departureTime: '07:20 AM',
    arrivalTime: '09:40 AM',
    duration: '2h 20m',
    class: 'Economy',
    price: 4200,
    totalSeats: 189,
    availableSeats: 110,
    status: 'On Time'
  },
  {
    airline: 'Akasa Air',
    flightNumber: 'QP-1304',
    from: 'Delhi (DEL)',
    to: 'Mumbai (BOM)',
    departureDate: getFutureDate(2),
    departureTime: '06:45 PM',
    arrivalTime: '09:00 PM',
    duration: '2h 15m',
    class: 'Economy',
    price: 3950,
    totalSeats: 189,
    availableSeats: 154,
    status: 'On Time'
  },

  // Ahmedabad <-> Mumbai
  {
    airline: 'IndiGo',
    flightNumber: '6E-673',
    from: 'Ahmedabad (AMD)',
    to: 'Mumbai (BOM)',
    departureDate: getFutureDate(1),
    departureTime: '08:00 AM',
    arrivalTime: '09:10 AM',
    duration: '1h 10m',
    class: 'Economy',
    price: 2800,
    totalSeats: 180,
    availableSeats: 85,
    status: 'On Time'
  },
  {
    airline: 'Air India',
    flightNumber: 'AI-614',
    from: 'Ahmedabad (AMD)',
    to: 'Mumbai (BOM)',
    departureDate: getFutureDate(2),
    departureTime: '05:30 PM',
    arrivalTime: '06:45 PM',
    duration: '1h 15m',
    class: 'Business',
    price: 8900,
    totalSeats: 24,
    availableSeats: 12,
    status: 'On Time'
  },
  {
    airline: 'SpiceJet',
    flightNumber: 'SG-298',
    from: 'Mumbai (BOM)',
    to: 'Ahmedabad (AMD)',
    departureDate: getFutureDate(1),
    departureTime: '07:15 PM',
    arrivalTime: '08:25 PM',
    duration: '1h 10m',
    class: 'Economy',
    price: 2650,
    totalSeats: 180,
    availableSeats: 120,
    status: 'On Time'
  },

  // Mumbai <-> Bangalore
  {
    airline: 'IndiGo',
    flightNumber: '6E-442',
    from: 'Mumbai (BOM)',
    to: 'Bangalore (BLR)',
    departureDate: getFutureDate(1),
    departureTime: '10:00 AM',
    arrivalTime: '11:45 AM',
    duration: '1h 45m',
    class: 'Economy',
    price: 3600,
    totalSeats: 180,
    availableSeats: 76,
    status: 'On Time'
  },
  {
    airline: 'Akasa Air',
    flightNumber: 'QP-1102',
    from: 'Bangalore (BLR)',
    to: 'Mumbai (BOM)',
    departureDate: getFutureDate(1),
    departureTime: '04:10 PM',
    arrivalTime: '05:55 PM',
    duration: '1h 45m',
    class: 'Economy',
    price: 3400,
    totalSeats: 189,
    availableSeats: 130,
    status: 'On Time'
  },

  // Delhi <-> Bangalore
  {
    airline: 'Vistara',
    flightNumber: 'UK-809',
    from: 'Delhi (DEL)',
    to: 'Bangalore (BLR)',
    departureDate: getFutureDate(1),
    departureTime: '06:15 AM',
    arrivalTime: '09:00 AM',
    duration: '2h 45m',
    class: 'Economy',
    price: 5200,
    totalSeats: 164,
    availableSeats: 64,
    status: 'On Time'
  },
  {
    airline: 'Air India',
    flightNumber: 'AI-506',
    from: 'Delhi (DEL)',
    to: 'Bangalore (BLR)',
    departureDate: getFutureDate(2),
    departureTime: '08:45 PM',
    arrivalTime: '11:30 PM',
    duration: '2h 45m',
    class: 'Business',
    price: 15400,
    totalSeats: 30,
    availableSeats: 14,
    status: 'On Time'
  },

  // Ahmedabad <-> Delhi
  {
    airline: 'IndiGo',
    flightNumber: '6E-188',
    from: 'Ahmedabad (AMD)',
    to: 'Delhi (DEL)',
    departureDate: getFutureDate(1),
    departureTime: '11:30 AM',
    arrivalTime: '01:05 PM',
    duration: '1h 35m',
    class: 'Economy',
    price: 3100,
    totalSeats: 180,
    availableSeats: 92,
    status: 'On Time'
  },
  {
    airline: 'SpiceJet',
    flightNumber: 'SG-921',
    from: 'Delhi (DEL)',
    to: 'Ahmedabad (AMD)',
    departureDate: getFutureDate(1),
    departureTime: '03:40 PM',
    arrivalTime: '05:15 PM',
    duration: '1h 35m',
    class: 'Economy',
    price: 3250,
    totalSeats: 180,
    availableSeats: 110,
    status: 'On Time'
  },

  // Ahmedabad <-> Goa & Mumbai <-> Goa
  {
    airline: 'IndiGo',
    flightNumber: '6E-543',
    from: 'Ahmedabad (AMD)',
    to: 'Goa (GOI)',
    departureDate: getFutureDate(2),
    departureTime: '01:15 PM',
    arrivalTime: '03:00 PM',
    duration: '1h 45m',
    class: 'Economy',
    price: 4100,
    totalSeats: 180,
    availableSeats: 54,
    status: 'On Time'
  },
  {
    airline: 'Akasa Air',
    flightNumber: 'QP-1422',
    from: 'Mumbai (BOM)',
    to: 'Goa (GOI)',
    departureDate: getFutureDate(1),
    departureTime: '11:15 AM',
    arrivalTime: '12:25 PM',
    duration: '1h 10m',
    class: 'Economy',
    price: 2499,
    totalSeats: 189,
    availableSeats: 62,
    status: 'On Time'
  },
  {
    airline: 'Vistara',
    flightNumber: 'UK-851',
    from: 'Goa (GOI)',
    to: 'Mumbai (BOM)',
    departureDate: getFutureDate(3),
    departureTime: '04:30 PM',
    arrivalTime: '05:40 PM',
    duration: '1h 10m',
    class: 'Business',
    price: 9200,
    totalSeats: 24,
    availableSeats: 9,
    status: 'On Time'
  },

  // Dubai <-> Mumbai & Delhi
  {
    airline: 'Emirates',
    flightNumber: 'EK-501',
    from: 'Mumbai (BOM)',
    to: 'Dubai (DXB)',
    departureDate: getFutureDate(2),
    departureTime: '04:30 AM',
    arrivalTime: '06:15 AM',
    duration: '3h 15m',
    class: 'Economy',
    price: 18500,
    totalSeats: 350,
    availableSeats: 210,
    status: 'On Time'
  },
  {
    airline: 'Emirates',
    flightNumber: 'EK-505',
    from: 'Mumbai (BOM)',
    to: 'Dubai (DXB)',
    departureDate: getFutureDate(2),
    departureTime: '10:15 AM',
    arrivalTime: '12:00 PM',
    duration: '3h 15m',
    class: 'Business',
    price: 45000,
    totalSeats: 48,
    availableSeats: 22,
    status: 'On Time'
  },
  {
    airline: 'Air India',
    flightNumber: 'AI-995',
    from: 'Delhi (DEL)',
    to: 'Dubai (DXB)',
    departureDate: getFutureDate(3),
    departureTime: '08:15 PM',
    arrivalTime: '10:45 PM',
    duration: '3h 45m',
    class: 'Economy',
    price: 16900,
    totalSeats: 240,
    availableSeats: 155,
    status: 'On Time'
  }
];

const seedDatabase = async (standalone = true) => {
  try {
    if (standalone) {
      require('dotenv').config();
      const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/airline_booking';
      await mongoose.connect(mongoURI);
      console.log('Connected to MongoDB for seeding...');
    }

    await Flight.deleteMany({});
    console.log('Cleared existing flights.');

    await Flight.insertMany(sampleFlights);
    console.log(`✅ Successfully seeded ${sampleFlights.length} sample flights!`);

    const demoUserEmail = 'demo@skywings.com';
    const userExists = await User.findOne({ email: demoUserEmail });
    if (!userExists) {
      await User.create({
        fullName: 'Rahul Sharma',
        email: demoUserEmail,
        phone: '9876543210',
        dateOfBirth: new Date('1998-05-15'),
        gender: 'Male',
        password: 'password123'
      });
      console.log('✅ Demo test user created (demo@skywings.com / password123)');
    }

    if (standalone) {
      await mongoose.disconnect();
      console.log('Seeding complete. Disconnected.');
    }
  } catch (error) {
    console.error('❌ Error during seeding:', error.message);
    if (standalone) process.exit(1);
  }
};

if (require.main === module) {
  seedDatabase(true);
}

module.exports = seedDatabase;
