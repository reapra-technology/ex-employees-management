import axios from "axios";

export const authParams = {
  // todo env
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
  scope: process.env.NEXT_PUBLIC_TOKEN_SCOPE!,
  responseType: "code",
  approvalPrompt: "force",
  accessType: "offline",
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
  grantType: "authorization_code",
} as const;

export type AuthInfo = Readonly<{
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  id_token: string;
  expires_in: number;
}>;

export function setAuthInfo(a: AuthInfo): void {
  window.localStorage.setItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_TOKEN_KEY!, JSON.stringify(a));
}

export function getAuthInfo(): AuthInfo | null {
  if (process.browser) {

    const item = window.localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_TOKEN_KEY!);
    if (item !== null) {
      return JSON.parse(item) as AuthInfo;
    } else {
      return null;
    }
  }
  return null;
}

export function deleteAuthInfo(): void {
  window.localStorage.removeItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_TOKEN_KEY!);
}

export function requestCodeFlow(): void {
  const params = {
    client_id: authParams.clientId,
    redirect_uri: authParams.redirectUri,
    scope: authParams.scope,
    response_type: authParams.responseType,
    approval_prompt: authParams.approvalPrompt,
    access_type: authParams.accessType,
  };
  const query = new URLSearchParams(params).toString();
  window.location.href = `https://accounts.google.com/o/oauth2/auth?${query}`;
}

export function getCode(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("code");
}

export async function getAuthToken(code: string): Promise<AuthInfo> {
  const params = {
    code,
    client_id: authParams.clientId,
    client_secret: authParams.clientSecret,
    redirect_uri: authParams.redirectUri,
    grant_type: authParams.grantType,
    access_type: authParams.accessType,
  };
  const res = await axios.post(
    `https://www.googleapis.com/oauth2/v4/token`,
    params
  );
  return res.data as Promise<AuthInfo>;
}

export async function getTokenFromByRefreshToken(): Promise<void> {
  const currentInfo = getAuthInfo();
  const params = {
    client_id: authParams.clientId,
    client_secret: authParams.clientSecret,
    redirect_uri: authParams.redirectUri,
    grant_type: "refresh_token",
    access_type: authParams.accessType,
    refresh_token: currentInfo?.refresh_token,
  };
  const res = await axios.post(
    `https://www.googleapis.com/oauth2/v4/token`,
    params
  );
  const newInfo: AuthInfo = {
    access_token: res.data.access_token,
    refresh_token: currentInfo?.refresh_token ?? "",
    expires_in: currentInfo?.expires_in ?? 0,
    scope: currentInfo?.scope ?? '',
    token_type: currentInfo?.token_type ?? '',
    id_token: currentInfo?.id_token ?? '',
  }

  setAuthInfo(newInfo);
}

export async function signOut(authInfo: AuthInfo | undefined): Promise<void> {
  try {
    if (authInfo !== undefined) {
      const res = await axios.get(
        `https://accounts.google.com/o/oauth2/revoke`,
        {
          params: {
            token: authInfo.access_token,
          },
        }
      );
      if (res.status !== 200) {
        return Promise.reject(Error(`Failed to sign out`));
      }
    }
  } finally {
    deleteAuthInfo();
    window.location.href = "/";
  }
  return;
}

export async function getUserInfo(
  authInfo: AuthInfo
): Promise<Record<string, string>> {
  const res = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo", {
    params: {
      access_token: authInfo.access_token,
    },
  });
  return res.data;
}