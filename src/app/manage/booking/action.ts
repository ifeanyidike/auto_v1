'use server';
import Booking from '~/app/api/booking/logic';

export async function updateBookingStatus(data: {
  id: string;
  isFulfilled: boolean;
  isPaid: boolean;
}) {
  const booking = new Booking();
  await booking.update(data.id, {
    isFulfilled: data.isFulfilled,
    isPaid: data.isPaid,
  });
}
