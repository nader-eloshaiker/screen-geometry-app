/* eslint-disable camelcase */
import ReactGA from 'react-ga4'
import type {
  CLSMetricWithAttribution,
  INPMetricWithAttribution,
  LCPMetricWithAttribution,
} from 'web-vitals/attribution'

type EventParams = {
  value: number
  metric_id: string
  metric_value: number
  metric_delta: number
  debug_target: string | undefined
}

export const sendToGoogleAnalytics = ({
  name,
  delta,
  value,
  id,
  attribution,
}: CLSMetricWithAttribution | INPMetricWithAttribution | LCPMetricWithAttribution) => {
  const eventParams: EventParams = {
    // Built-in params:
    value: delta, // Use `delta` so the value can be summed.
    // Custom params:
    metric_id: id, // Needed to aggregate events.
    metric_value: value, // Optional.
    metric_delta: delta, // Optional.
    debug_target: '', // Optional.
  }

  switch (name) {
    case 'CLS':
      eventParams.debug_target = attribution.largestShiftTarget
      break
    case 'INP':
      eventParams.debug_target = attribution.interactionTarget
      break
    case 'LCP':
      eventParams.debug_target = attribution.element
      break
  }

  // Assumes the global `gtag()` function exists, see:
  // https://developers.google.com/analytics/devguides/collection/ga4
  ReactGA.event(name, eventParams)
}
