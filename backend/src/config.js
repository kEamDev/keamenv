export const testSites = [
  { id: "google", name: "Google", url: "https://www.google.com/generate_204" },
  { id: "ozon", name: "Ozon", url: "https://www.ozon.ru" },
  { id: "cloudflare", name: "Cloudflare", url: "https://cloudflare.com/cdn-cgi/trace" },
  { id: "github", name: "GitHub", url: "https://github.com" }
];

export const russianSites = [
  { id: "vk", name: "VK", url: "https://vk.com" },
  { id: "sber", name: "Sber", url: "https://www.sber.ru" },
  { id: "avito", name: "Avito", url: "https://www.avito.ru" },
  { id: "vkusnoitochka", name: "Вкусно и точка", url: "https://vkusnoitochka.ru" }
];

export const vpnHosts = [
  { id: "cloudflare-dns", name: "Cloudflare DNS", host: "1.1.1.1", port: 443 },
  { id: "google-dns", name: "Google DNS", host: "8.8.8.8", port: 443 },
  { id: "quad9-dns", name: "Quad9 DNS", host: "9.9.9.9", port: 443 },
  { id: "mullvad", name: "Mullvad", host: "mullvad.net", port: 443 },
  { id: "protonvpn", name: "Proton VPN", host: "protonvpn.com", port: 443 }
];

export const browserTargets = [
  { id: "google", name: "Google", url: "https://www.google.com/generate_204" },
  { id: "ozon", name: "Ozon", url: "https://www.ozon.ru" },
  { id: "cloudflare", name: "Cloudflare", url: "https://cloudflare.com/cdn-cgi/trace" },
  { id: "github", name: "GitHub", url: "https://github.com" },
  ...russianSites
];

export const whiteListProbeHosts = [
  { id: "google", name: "Google", host: "google.com", group: "international" },
  { id: "apple", name: "Apple", host: "apple.com", group: "international" },
  { id: "vk", name: "VK", host: "vk.com", group: "russian" },
  { id: "ozon", name: "Ozon", host: "ozon.ru", group: "russian" }
];

export const speedTestServices = [
  {
    id: "cloudflare",
    name: "Cloudflare Speed",
    url: "https://speed.cloudflare.com/__down?bytes=25000000",
    maxBytes: 25_000_000
  },
  {
    id: "yandex",
    name: "Яндекс CDN",
    url: "https://mirror.yandex.ru/ubuntu-releases/24.04/ubuntu-24.04.3-live-server-amd64.iso",
    maxBytes: 25_000_000,
    note: "Публичный Яндекс Интернетометр не предоставляет стабильный API, используется загрузка с mirror.yandex.ru."
  }
];
