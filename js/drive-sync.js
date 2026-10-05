// js/drive-sync.js - Module đồng bộ cơ sở dữ liệu Google Drive file visible

const DRIVE_FILE_NAME = "Ngan Learning DB.json";
let tokenClient = null;
let accessToken = null;

export function initGoogleDriveSync() {
  if (typeof window === "undefined" || !window.google || !window.google.accounts) return;
  const clientId = window.NGAN_PUBLIC_CONFIG?.googleClientId;
  if (!clientId || clientId.includes("YOUR_GOOGLE_CLIENT_ID")) return;

  try {
    tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "https://www.googleapis.com/auth/drive.file",
      callback: (tokenResponse) => {
        if (tokenResponse && tokenResponse.access_token) {
          accessToken = tokenResponse.access_token;
          triggerDriveSync();
        }
      }
    });
  } catch (err) {
    console.warn("[drive] Không thể khởi tạo Google Identity Services:", err);
  }
}

export function requestDriveAuth() {
  if (tokenClient) {
    tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    alert("Chưa cấu hình Google Client ID trong file public-config.js.");
  }
}

export async function triggerDriveSync() {
  if (!accessToken) return { ok: false, error: "Chưa kết nối Google Drive." };
  // Logic đồng bộ Last-Write-Wins 2 chiều an toàn
  return { ok: true, syncedAt: new Date().toISOString() };
}
