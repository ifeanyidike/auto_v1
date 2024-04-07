import React from 'react';
import RedirectLinks from '../../components/RedirectLinks';
import SuccessIcon from '~/commons/icons/SuccessIcon';
import MerchantService from '~/app/api/merchant_service/logic';
import Booking from '~/app/api/booking/logic';
import BookingTicket from '../components/BookingTicket';
import { Mailer } from '~/server/mail';
import { Transaction } from '~/server/payment/transaction';
import { unstable_noStore as noStore } from 'next/cache';

const BookingConfirmPage = async ({
  searchParams,
}: {
  params: { slug: string; id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) => {
  noStore();
  const {
    reference,
    user_email,
    service: serviceId,
    bookingId,
  } = (searchParams || {}) as Record<string, string>;
  const transaction = new Transaction();
  const verification = await transaction.verifyTransaction(
    reference,
    user_email,
    serviceId
  );

  const merchantServiceClient = new MerchantService();
  const merchantService = await merchantServiceClient.getOne({
    id: serviceId,
    userId: verification.userId,
  });
  const booking = merchantService?.bookings?.find(
    booking => booking.id === bookingId
  );

  if (verification.confirmation && bookingId && !booking?.isPaid) {
    const bookingClient = new Booking();
    await bookingClient.update(bookingId, { isPaid: true });
    const mailer = new Mailer();
    await mailer.sendEmailForBookedService('booking', bookingId);
  }

  return (
    <div className="flex flex-col items-center justify-center my-14 gap-10">
      {verification.confirmation ? (
        <>
          <SuccessIcon classNames="w-48 h-48" />
          <div>Payment made! Your booking is successful</div>
          {booking && (
            <BookingTicket
              booking={{
                ...booking,
                amount: booking.amount.toNumber(),
                isPaid: true,
              }}
              serviceTitle={merchantService?.service?.title}
              serviceType={merchantService?.service?.type}
            />
          )}

          <RedirectLinks />
        </>
      ) : null}
    </div>
  );
};

export default BookingConfirmPage;
