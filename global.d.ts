// global.d.ts

interface Window {
  Calendly: {
    initInlineWidget(options: {
      url: string;
      parentElement: HTMLElement;
    }): void;
    initPopupWidget(options: { url: string }): void;
    initBadgeWidget(options: {
      url: string;
      text: string;
      color: string;
      textColor: string;
      branding?: string;
    }): void;
  };
}

declare global {
  interface GlobalThis {
    serviceId?: string;
  }
}
