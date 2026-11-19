// Demande au back de créer un nouvel access token
// grâce au refresh token présent dans les cookies
async function requestNewAccessToken() {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
    {
      method: "POST",
      credentials: "include",
    },
  );

  return response.ok;
}

// Effectue une requête protégée et renouvelle automatiquement
// l'access token lorsque celui-ci est expiré
export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
) {
  const requestOptions: RequestInit = {
    ...options,
    credentials: "include",
  };

  const response = await fetch(url, requestOptions);

  // Si l'erreur ne concerne pas l'authentification,
  // la réponse est directement transmise au composant
  if (response.status !== 401) {
    return response;
  }

  // Essaie de créer un nouvel access token
  const isAccessTokenRenewed =
    await requestNewAccessToken();

  // Si le refresh token est absent, invalide ou expiré
  // conserve la réponse 401 initiale
  if (!isAccessTokenRenewed) {
    return response;
  }

  // Rejoue une seule fois la requête initiale
  // avec le nouvel access token
  return fetch(url, requestOptions);
}