import nodemailer from 'nodemailer';
import Util from './utils';
import Auth0 from './auth0';

export class Mailer {
  private user = process.env.SMTP_USER;
  private pass = process.env.SMTP_PASSWORD;
  private host = process.env.SMTP_HOST;
  private from = 'ifeanyidike87@gmail.com';

  private transporter = nodemailer.createTransport({
    host: this.host,
    port: 587,
    secure: false,
    auth: {
      user: this.user,
      pass: this.pass,
    },
  });

  public async sendMail(
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string
  ) {
    return await this.transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });
  }

  public async sendEmailForCancelledDiscount(
    merchantLogo: string | undefined | null,
    merchantName: string,
    merchantPhone: string,
    serviceName: string,
    receiverEmail: string,
    receiverName: string
  ) {
    return this.sendMail(
      this.from,
      receiverEmail,
      `Your discount for ${serviceName} has expired`,
      `Discount on ${serviceName}.`,
      `<div>
        ${
          merchantLogo
            ? `<div style="margin-left:auto; margin-right:auto; width:100px;"><img src="${merchantLogo}" alt="auto shop logo" style="width:100px" /></div> <br />`
            : ''
        }

        <div style="font-weight:bold; font-size:18px; text-align: center">
            Hey ${receiverName}'
        </div>
        <br />
       <p>Your discount on ${serviceName} in ${merchantName} has been expired. For more information please call ${merchantPhone}</p>
       <p>Thank you for choosing ${merchantName}</p>
      </div>`
    );
  }

  public async sendEmailForBookedService(
    type: 'booking' | 'subscription',
    id: string
  ) {
    const { merchantData } = await Util.getMerchantDataBySubdomain();
    const userSession = await Auth0.getSessionUser();
    if (userSession.email === merchantData?.email) return;

    return this.sendMail(
      this.from,
      userSession.email,
      `You have successfully booked auto service on ${merchantData?.name}`,
      `You have successfully ${
        type === 'booking' ? 'booked' : 'subscribed'
      } to the service. Please do well to leave a review on the service if it's completed.`,
      `<div>
        ${
          merchantData?.logo
            ? `<div style="margin-left:auto; margin-right:auto; width:100px;"><img src="${merchantData?.logo}" alt="auto shop logo" style="width:100px" /></div> <br />`
            : ''
        }

        <div style="font-weight:bold; font-size:18px; text-align: center">
            Hey ${userSession.name}, you have successfully ${
              type === 'booking'
                ? 'booked the service'
                : 'subscribed to the plan'
            }
        </div>
        <br />
        <p>You can access your ${
          type === 'booking' ? 'booking' : 'subscription'
        } info in your profile page at <a href="https://moxxil.com/user-profile">moxxil.com/user-profile</a></p>
        <p>Please also take some time to drop a review on this service to let us know how we served you. Click <a href="https://${merchantData?.slug}.moxxil.com/reviews/${id}">here</a> or visit ${merchantData?.slug}.moxxil.com/reviews/${id} to leave a review.</p>
        ${
          merchantData?.phoneNo
            ? `<p>You can also call us at ${merchantData?.phoneNo} for any other issue.</p>`
            : ''
        }
        <p>Thank you for choosing ${merchantData?.name}</p>
      </div>`
    );
  }

  public async sendWelcomeUserEmail() {
    const { merchantData } = await Util.getMerchantDataBySubdomain();
    const userSession = await Auth0.getSessionUser();
    if (userSession.email === merchantData?.email) return;

    return this.sendMail(
      this.from,
      userSession.email,
      `Welcome to ${merchantData?.name}`,
      `Hi ${userSession.name}, welcome to ${merchantData?.name}`,
      `<div>
        ${
          merchantData?.logo
            ? `<div style="margin-left:auto; margin-right:auto; width:100px;"><img src="${merchantData?.logo}" alt="auto shop logo" style="width:100px" /></div> <br />`
            : ''
        }

        <div style="font-weight:bold; font-size:20px; text-align: center">
            Hey ${userSession.name}, welcome to ${merchantData?.name}
        </div>
        <br />
        <p>You can browse the services in this auto shop to book or subscribe.</p>
        <p>When you book any of the services, you have an option to either pay online (with just a single click) or in-shop</p>
        <p>Some services may also have discounts. So do well to get the discount code before booking for a service.</p>
        <p>Also, most subscription services are usually subsidized. You'll enjoy some percentage off over what you could have gotten the services otherwise.</p>
        ${
          merchantData?.phoneNo
            ? `<p>You can also call us at ${merchantData?.phoneNo} for any other issue.</p>`
            : ''
        }
        <p>Thank you for choosing ${merchantData?.name}</p>
      </div>`
    );
  }

  public async sendWelcomeMerchantEmail(slug: string, name: string) {
    const userSession = await Auth0.getSessionUser();

    return this.sendMail(
      this.from,
      userSession.email,
      `${name} is created`,
      'Hey ${userSession.name}, your auto shop is ready.',
      `<div>
        <div style="font-weight:bold; font-size:20px; text-align: center">
            Hey ${userSession.name}, your auto shop is ready.
        </div>
        <br />
        <p>You auto shop is successfully created. You can visit <a href="https://${slug}.admin.moxxil.com">${slug}.admin.moxxil.com</a> to customize your auto shop.</p>
        <p>When customizing your auto shop. You'll be able to set up your paystack payment key and calendly link for appointments.</p>
        <p>Setting up paystack payment key is important because it will allow your customers to either pay online or offline. You will not be able to create a service(repair/servicing) unless you set up the key</p>
        <p>You can also see a list of your bookings, subscriptions and some stats about them and also set up discounts for your customers</p>
        <p>Thank you</p>
      </div>`
    );
  }
}
