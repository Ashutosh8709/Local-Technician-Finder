const sampleData = [
  {
    name: "Ravi Sharma",
    email: "ravi.sharma@example.com",
    phone: 9876543210,
    serviceType: "home",
    location: "Delhi",
    isVerified: true,
    availableSlots: [
      new Date("2025-07-17T10:00:00.000Z"),
      new Date("2025-07-17T14:00:00.000Z"),
      new Date("2025-07-18T09:30:00.000Z")
    ],
    profileImgUrl: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Anita Verma",
    email: "anita.verma@example.com",
    phone: 9123456789,
    serviceType: "computer",
    location: "Mumbai",
    isVerified: false,
    availableSlots: [
      new Date("2025-07-18T13:00:00.000Z"),
      new Date("2025-07-19T11:00:00.000Z")
    ],
    profileImgUrl: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    name: "Mohammed Zaid",
    email: "zaid.tech@example.com",
    phone: 9898989898,
    serviceType: "vehicle",
    location: "Hyderabad",
    isVerified: true,
    availableSlots: [
      new Date("2025-07-17T09:00:00.000Z"),
      new Date("2025-07-20T15:30:00.000Z")
    ],
    profileImgUrl: "https://randomuser.me/api/portraits/men/21.jpg"
  },
  {
    name: "Kavita Joshi",
    email: "kavita.joshi@example.com",
    phone: 9765432109,
    serviceType: "home",
    location: "Bengaluru",
    isVerified: false,
    availableSlots: [
      new Date("2025-07-19T10:00:00.000Z")
    ],
    profileImgUrl: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    name: "Rohan Mehta",
    email: "rohan.mehta@example.com",
    phone: 9811122233,
    serviceType: "computer",
    location: "Chandigarh",
    isVerified: true,
    availableSlots: [
      new Date("2025-07-17T11:00:00Z"),
      new Date("2025-07-18T16:00:00Z")
    ],
    profileImgUrl: "https://randomuser.me/api/portraits/men/35.jpg"
  },
  {
    name: "Sneha Kapoor",
    email: "sneha.kapoor@example.com",
    phone: 9877700011,
    serviceType: "home",
    location: "Lucknow",
    isVerified: true,
    availableSlots: [
      new Date("2025-07-20T10:30:00Z"),
      new Date("2025-07-21T12:00:00Z")
    ],
    profileImgUrl: "https://randomuser.me/api/portraits/women/29.jpg"
  },
  {
    name: "Tarun Nair",
    email: "tarun.nair@example.com",
    phone: 9834567890,
    serviceType: "vehicle",
    location: "Pune",
    isVerified: false,
    availableSlots: [
      new Date("2025-07-18T08:00:00Z"),
      new Date("2025-07-19T14:00:00Z")
    ],
    profileImgUrl: "https://randomuser.me/api/portraits/men/61.jpg"
  },
  {
    name: "Meera Desai",
    email: "meera.desai@example.com",
    phone: 9101122233,
    serviceType: "home",
    location: "Ahmedabad",
    isVerified: true,
    availableSlots: [
      new Date("2025-07-22T09:00:00Z"),
      new Date("2025-07-23T11:00:00Z")
    ],
    profileImgUrl: "https://randomuser.me/api/portraits/women/52.jpg"
  },
  {
    name: "Aditya Bhatt",
    email: "aditya.bhatt@example.com",
    phone: 9945566778,
    serviceType: "computer",
    location: "Kolkata",
    isVerified: false,
    availableSlots: [
      new Date("2025-07-17T13:00:00Z"),
      new Date("2025-07-18T15:30:00Z")
    ],
    profileImgUrl: "https://randomuser.me/api/portraits/men/40.jpg"
  },
  {
    name: "Priya Iyer",
    email: "priya.iyer@example.com",
    phone: 9877654321,
    serviceType: "vehicle",
    location: "Chennai",
    isVerified: true,
    availableSlots: [
      new Date("2025-07-18T10:00:00Z"),
      new Date("2025-07-20T17:00:00Z")
    ],
    profileImgUrl: "https://randomuser.me/api/portraits/women/33.jpg"
  },
  {
    name: "Rahul Tiwari",
    email: "rahul.tiwari@example.com",
    phone: 9888888888,
    serviceType: "home",
    location: "Indore",
    isVerified: true,
    availableSlots: [
      new Date("2025-07-19T12:00:00Z"),
      new Date("2025-07-21T15:00:00Z")
    ],
    profileImgUrl: "https://randomuser.me/api/portraits/men/15.jpg"
  },
  {
    name: "Shruti Menon",
    email: "shruti.menon@example.com",
    phone: 9000012345,
    serviceType: "computer",
    location: "Thiruvananthapuram",
    isVerified: false,
    availableSlots: [
      new Date("2025-07-22T11:30:00Z")
    ],
    profileImgUrl: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    name: "Arjun Rawat",
    email: "arjun.rawat@example.com",
    phone: 9988776655,
    serviceType: "vehicle",
    location: "Jaipur",
    isVerified: true,
    availableSlots: [
      new Date("2025-07-17T09:30:00Z"),
      new Date("2025-07-18T14:30:00Z")
    ],
    profileImgUrl: "https://randomuser.me/api/portraits/men/18.jpg"
  },
  {
    name: "Divya Mishra",
    email: "divya.mishra@example.com",
    phone: 9778899000,
    serviceType: "home",
    location: "Bhopal",
    isVerified: true,
    availableSlots: [
      new Date("2025-07-19T11:00:00Z"),
      new Date("2025-07-20T13:00:00Z")
    ],
    profileImgUrl: "https://randomuser.me/api/portraits/women/46.jpg"
  }
];

module.exports={data:sampleData};