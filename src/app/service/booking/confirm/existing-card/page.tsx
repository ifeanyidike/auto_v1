import React from 'react';
import RedirectLinks from '../../../components/RedirectLinks';
import SuccessIcon from '~/commons/icons/SuccessIcon';
import MerchantService from '~/app/api/merchant_service/logic';
import Booking from '~/app/api/booking/logic';
import BookingTicket from '../../components/BookingTicket';
import User from '~/app/api/user/logic';
import { Mailer } from '~/server/mail';

const BookingExistingCardConfirmPage = async ({
  searchParams,
}: {
  params: { slug: string; id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) => {
  const {
    user_email,
    service: serviceId,
    bookingId,
  } = (searchParams || {}) as Record<string, string>;

  const user = new User();
  const userData = await user.getOne({ email: user_email });

  const merchantServiceClient = new MerchantService();
  const merchantService = await merchantServiceClient.getOne({
    id: serviceId,
    userId: userData?.id,
  });
  const booking = merchantService?.bookings?.find(
    booking => booking.id === bookingId
  );

  if (bookingId && !booking?.isPaid) {
    const bookingClient = new Booking();
    await bookingClient.update(bookingId, { isPaid: true });
    const mailer = new Mailer();
    await mailer.sendEmailForBookedService('booking', bookingId);
  }

  return (
    <div className="flex flex-col items-center justify-center my-14 gap-10">
      <SuccessIcon classNames="w-48 h-48" />
      <div>Your booking is successful</div>
      {booking && (
        <BookingTicket
          booking={{ ...booking, amount: booking.amount.toNumber() }}
          serviceTitle={merchantService?.service?.title}
          serviceType={merchantService?.service?.type}
        />
      )}

      <RedirectLinks />
    </div>
  );
};

export default BookingExistingCardConfirmPage;
