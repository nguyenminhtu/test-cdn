import { useMutation } from '@tanstack/react-query';

const apiUrl = 'https://seal-app-zby8v.ondigitalocean.app/1234';

export default function useSendMessage() {
  return useMutation({
    mutationFn: async (message: string) => {
      const response: any = await fetch(apiUrl, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        referrerPolicy: 'no-referrer',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: message }),
      });
      const jsonRes = await response.json();

      return jsonRes.response;
    },
  });
}
