export class SSE {
  private static instance: SSE;
  private static eventSource: EventSource;
  private static clientId: string;

  private constructor() {
    const clientId = String(new Date().getMilliseconds());

    const eventSource = new EventSource(
      `https://api.trendnow.me/api/v1/subscribe?clientId=${clientId}`
    );

    eventSource.onopen = () => {
      console.log('SSE connection is ready');
    };

    eventSource.onerror = (err) => {
      console.log(err);
      eventSource.close();
    };

    SSE.eventSource = eventSource;
    SSE.clientId = clientId;
  }

  static getInstance() {
    if (!SSE.eventSource) {
      SSE.instance = new SSE();
    }

    return SSE.instance;
  }

  getEventSource() {
    return { eventSource: SSE.eventSource, clientId: SSE.clientId };
  }
}
