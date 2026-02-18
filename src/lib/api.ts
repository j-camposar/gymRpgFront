const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

    if (!res.ok) {
        let message = 'Error inesperado';

        try {
            const error = await res.json();
            message = error.message || error.msg || message;
        } catch {
            // backend no devolvió JSON
        }

        throw new Error(message);
    }

  return res.json();
}
