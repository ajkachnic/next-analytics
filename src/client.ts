export const useAnalytics = (url: string = '/api/analytics/track') => {
  const userAgent = navigator.userAgent
  const referrer  = document.referrer
  // @ts-ignore
  const lang = navigator.language || navigator.userLanguage
  const platform = navigator.platform

  fetch(url, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userAgent: userAgent,
      referrer: referrer,
      lang: lang,
      platform: platform,
      href: window.location.href
    })
  })
  .then(res => {
    if(!res.ok) {
      throw new Error('uh oh')
    }
  })
}