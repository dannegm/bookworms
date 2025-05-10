import umami from '@umami/node';

umami.init({
    websiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
    hostUrl: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_HOST_URL,
});

export { umami };
