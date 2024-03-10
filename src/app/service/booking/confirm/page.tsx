import React from 'react';
import Util from '~/server/utils';
import RedirectLinks from '../../components/RedirectLinks';
import SuccessIcon from '~/commons/icons/SuccessIcon';
import MerchantService from '~/app/api/merchant_service/logic';
import Booking from '~/app/api/booking/logic';
import { dmSans } from '~/font';
import BookingTicket from '../components/BookingTicket';

const BookingConfirmPage = async ({
  searchParams,
}: {
  params: { slug: string; id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) => {
  const {
    reference,
    user_email,
    service: serviceId,
    bookingId,
  } = (searchParams || {}) as Record<string, string>;
  const util = new Util();
  const verification = await util.verifyTransaction(
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
  }

  return (
    <div className="flex flex-col items-center justify-center my-14 gap-10">
      {verification.confirmation ? (
        <>
          <SuccessIcon classNames="w-48 h-48" />
          <div>Payment made! Your booking is successful</div>
          {booking && (
            <BookingTicket
              booking={{ ...booking, amount: booking.amount.toNumber() }}
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
