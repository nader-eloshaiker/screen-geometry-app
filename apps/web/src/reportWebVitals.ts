import { ReportHandler } from 'web-vitals'

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      getFCP(onPerfEntry)
      getLCP(onPerfEntry)
      getTTFB(onPerfEntry)
    })
  }
}

export default reportWebVitals

// import { onCLS, onFID, onLCP } from 'web-vitals'

// function sendToGoogleAnalytics({ name, delta, value, id }) {
//   // Assumes the global `gtag()` function exists, see:
//   // https://developers.google.com/analytics/devguides/collection/ga4
//   gtag('event', name, {
//     // Built-in params:
//     value: delta, // Use `delta` so the value can be summed.
//     // Custom params:
//     metric_id: id, // Needed to aggregate events.
//     metric_value: value, // Optional.
//     metric_delta: delta, // Optional.

//     // OPTIONAL: any additional params or debug info here.
//     // See: https://web.dev/debug-performance-in-the-field/
//     // metric_rating: 'good' | 'needs-improvement' | 'poor',
//     // debug_info: '...',
//     // ...
//   })
// }

// onCLS(sendToGoogleAnalytics)
// onFID(sendToGoogleAnalytics)
// onLCP(sendToGoogleAnalytics)

// export default sendToGoogleAnalytics
