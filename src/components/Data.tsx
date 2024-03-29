export type serviceData = {
  _id: string;
  imgSrc: string;
  title: string;
  category: string;
  details: string;
  href: string;
};
export const ServiceData: serviceData[] = [
  {
    _id: '1',
    imgSrc: '/images/belt.webp',
    category: 'Repair',
    title: 'Belt & Hoses',
    details:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quos recusandae earum itaque quis iste quibusdam amet magni nobis labore.',
    href: '/service/belt',
  },
  {
    _id: '2',
    imgSrc: '/images/battery.webp',
    category: 'Servicing',
    details:
      ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quos recusandae earum itaque quis iste quibusdam amet magni nobis labore.',
    title: 'Car Batteries & Charging',
    href: '/service/battery',
  },
  {
    _id: '3',
    category: 'Servicing',
    details:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quos recusandae earum itaque quis iste quibusdam amet magni nobis labore.',
    imgSrc: '/images/mechanical.webp',
    title: 'Bodywork',
    href: '/service/bodywork',
  },
  {
    _id: '4',
    category: 'Servicing',
    details:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quos recusandae earum itaque quis iste quibusdam amet magni nobis labore.',
    imgSrc: '/images/painting.jpeg',
    title: 'Painting',
    href: '/service/painting',
  },
  {
    _id: '5',
    category: 'Repair',
    details:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quos recusandae earum itaque quis iste quibusdam amet magni nobis labore.',
    imgSrc: '/images/radiator.webp',
    title: 'Radiator|Repalcement|Repair',
    href: '/service/readiator',
  },
  {
    _id: '6',
    category: 'Repair',
    details:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quos recusandae earum itaque quis iste quibusdam amet magni nobis labore.',
    imgSrc: '/images/brakerepairs.webp',
    title: 'Brake',
    href: '/service/break-repairs',
  },
  {
    _id: '7',
    category: 'Repair',
    details:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quos recusandae earum itaque quis iste quibusdam amet magni nobis labore.',
    imgSrc: '/images/Acheating.webp',
    title: 'AC & Heating',
    href: '/service/ac-heating',
  },
  {
    _id: '7',
    category: 'Repair',
    details:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quos recusandae earum itaque quis iste quibusdam amet magni nobis labore.',
    imgSrc: '/images/Acheating.webp',
    title: 'AC & Heating',
    href: '/service/ac-heating',
  },
  {
    _id: '7',
    category: 'Repair',
    details:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quos recusandae earum itaque quis iste quibusdam amet magni nobis labore.',
    imgSrc: '/images/Acheating.webp',
    title: 'AC & Heating',
    href: '/service/ac-heating',
  },
  {
    _id: '7',
    category: 'Repair',
    details:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quos recusandae earum itaque quis iste quibusdam amet magni nobis labore.',
    imgSrc: '/images/Acheating.webp',
    title: 'AC & Heating',
    href: '/service/ac-heating',
  },
  {
    _id: '7',
    category: 'Repair',
    details:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quos recusandae earum itaque quis iste quibusdam amet magni nobis labore.',
    imgSrc: '/images/Acheating.webp',
    title: 'AC & Heating',
    href: '/service/ac-heating',
  },
  {
    _id: '7',
    category: 'Repair',
    details:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quos recusandae earum itaque quis iste quibusdam amet magni nobis labore.',
    imgSrc: '/images/Acheating.webp',
    title: 'AC & Heating',
    href: '/services/ac-heating',
  },
  {
    _id: '7',
    category: 'Repair',
    details:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quos recusandae earum itaque quis iste quibusdam amet magni nobis labore.',
    imgSrc: '/images/Acheating.webp',
    title: 'AC & Heating',
    href: '/service/ac-heating',
  },
];

export type bookingData = {
  _id: string;
  image: string;
  name: string;
  title: string;
  category: string;
  status: string;
  date: string;
};

export const BookingData: bookingData[] = [
  {
    _id: '1',
    name: 'Monica Gloria',
    image: '/images/belt.webp',
    category: 'Repair',
    title: 'Belt & Hoses',
    status: 'Completed',
    date: '11/11/2023',
  },
  {
    _id: '2',
    image: '/images/battery.webp',
    name: 'Victorial Ogani',
    category: 'Servicing',
    title: 'Car Batteries & Charging',
    status: ' In progress',
    date: '20/01/24',
  },
  {
    _id: '3',
    category: 'Servicing',
    name: 'Musa Ismali',
    image: '/images/mechanical.webp',
    title: 'Bodywork',
    status: 'Requested',
    date: '13/08/24',
  },
  {
    _id: '4',
    category: 'Servicing',
    name: 'Innocent Vibros',
    image: '/images/painting.jpeg',
    title: 'Painting',
    status: 'Completed',
    date: '15/02/24',
  },
  {
    _id: '5',
    category: 'Repair',
    name: 'Micah Odogwu',
    image: '/images/radiator.webp',
    title: 'Radiator repalcement',
    status: 'In progress',
    date: '28/04/24',
  },
  {
    _id: '6',
    category: 'Repair',
    name: 'Bruce Anointing',
    image: '/images/brakerepairs.webp',
    title: 'Brake',
    status: 'Requested',
    date: '19/04/25',
  },
  {
    _id: '7',
    category: 'Repair',
    name: 'Nginika Onokwu',
    image: '/images/Acheating.webp',
    title: 'AC & Heating',
    status: 'Completed',
    date: '05/03/24',
  },
  {
    _id: '8',
    category: 'Repair',
    name: 'Mirabel Longinus',
    image: '/images/Acheating.webp',
    title: 'AC & Heating',
    status: 'In progress',
    date: '08/08/25',
  },
];

export const transactionList = [
  {
    _id: '1',
    name: 'Monica Gloria',
    mode: 'Subscription',
    category: 'Repair',
    title: 'Belt & Hoses',
    status: 'Completed',
    date: '11/11/2023',
  },
  {
    _id: '2',
    mode: 'Subscription',
    name: 'Victorial Ogani',
    category: 'Servicing',
    title: 'Car Batteries & Charging',
    status: ' In progress',
    date: '20/01/24',
  },
  {
    _id: '3',
    category: 'Servicing',
    name: 'Musa Ismali',
    mode: 'Booking',
    title: 'Bodywork',
    status: 'Requested',
    date: '13/08/24',
  },
  {
    _id: '4',
    category: 'Servicing',
    name: 'Innocent Vibros',
    mode: 'In shop',
    title: 'Painting',
    status: 'Completed',
    date: '15/02/24',
  },
  {
    _id: '5',
    category: 'Repair',
    name: 'Micah Odogwu',
    mode: 'Subscription',
    title: 'Radiator repalcement',
    status: 'In progress',
    date: '28/04/24',
  },
  {
    _id: '6',
    category: 'Repair',
    name: 'Bruce Anointing',
    mode: 'Booking',
    title: 'Brake',
    status: 'Requested',
    date: '19/04/25',
  },
  {
    _id: '7',
    category: 'Repair',
    name: 'Nginika Onokwu',
    mode: 'Subscription',
    title: 'AC & Heating',
    status: 'Completed',
    date: '05/03/24',
  },
  {
    _id: '8',
    category: 'Repair',
    name: 'Mirabel Longinus',
    mode: 'Booking',
    title: 'AC & Heating',
    status: 'In progress',
    date: '08/08/25',
  },
];

export type subscriptionData = {
  _id: string;
  name: string;
  duration: string;
  qty: number;
  date: string;
  time: string;
  status: string;
  action: string;
};

export const SubscriptionData = [
  {
    _id: '1',
    name: 'Micah Jones Motors',
    duration: 'Monthly',
    date: '11/11/2023',
    time: '11:25:00 AM',
    status: 'Completed',
    service: 'Oil Change',
    qty: '1',
    action: 'view',
  },
  {
    _id: '2',
    name: 'Davido Oluwafemmi',
    duration: 'Bi Annually',
    qty: '3',
    date: '12/10/2024',
    time: '12:20:00 PM',
    service: 'Wash & Spray',
    status: 'In Progress',
    action: 'view',
  },
  {
    _id: '3',
    name: 'Mogabus Motors',
    duration: 'Quaterly',
    qty: '2',
    date: '01/02/2025',
    time: '03:45:00 PM',
    service: 'Brakes pad',
    status: 'Cancelled',
    action: 'view',
  },
  {
    _id: '4',
    name: 'Kindsley Okonjo',
    duration: 'Monthly',
    qty: '2',
    date: '04/05/2024',
    time: '07:00:00 PM',
    service: 'General Servicing',
    status: 'Requested',
    action: 'view',
  },
  {
    _id: '5',
    name: 'G.U.O Motors',
    duration: 'Bi Annually',
    qty: ' 3',
    date: '10/12/2025',
    time: '06:15:00 AM',
    service: 'Oil Change',
    status: 'In Progress',
    action: 'view',
  },
  {
    _id: '6',
    name: 'Delta State Govn/t',
    duration: 'Quarterly',
    qty: '4',
    date: '08/08/2023',
    time: '09:00:00 AM',
    service: 'Engine Overhual',
    status: 'Completed',
    action: 'view',
  },
  {
    _id: '7',
    name: 'O. J Motors',
    duration: 'Monthly',
    qty: '1',
    date: '08/11/2024',
    time: '06:40:00 PM',
    service: 'Brake pad',
    status: 'Requested',
    action: 'view',
  },
];
