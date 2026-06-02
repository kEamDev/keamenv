import { useState, useEffect, useCallback } from "react";

export interface SteamStats {
  currentSubscribers: number;
  favorites: number;
  views: number;
  screenshots: string[];
  previewUrl: string;
  loading: boolean;
  error: boolean;
}

export interface UseSteamStatsResult extends SteamStats {
  retry: () => void;
}

const CORS_PROXY = "https://corsproxy.io/?url=";
const STEAM_API =
  "https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/";

const cache: Record<string, SteamStats> = {};
const pendingRequests: Partial<Record<string, Promise<SteamStats>>> = {};
const listeners: Set<() => void> = new Set();

function createEmptyStats(overrides: Partial<SteamStats> = {}): SteamStats {
  return {
    currentSubscribers: 0,
    favorites: 0,
    views: 0,
    screenshots: [],
    previewUrl: "",
    loading: false,
    error: false,
    ...overrides,
  };
}

function notifyListeners() {
  listeners.forEach((cb) => cb());
}

async function fetchSingleStat(
  workshopId: string,
  force = false
): Promise<SteamStats> {
  if (!force && cache[workshopId] && !cache[workshopId].loading) {
    return cache[workshopId];
  }

  const existingRequest = pendingRequests[workshopId];
  if (!force && existingRequest) {
    return existingRequest;
  }

  cache[workshopId] = createEmptyStats({ loading: true });
  notifyListeners();

  pendingRequests[workshopId] = (async () => {
    try {
      const body = `itemcount=1&publishedfileids%5B0%5D=${workshopId}`;
      const response = await fetch(
        `${CORS_PROXY}${encodeURIComponent(STEAM_API)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body,
        }
      );

      if (!response.ok) throw new Error("API error");

      const data = await response.json();
      const details = data?.response?.publishedfiledetails?.[0];

      if (!details || details.result !== 1) throw new Error("Item not found");

      const screenshots: string[] = [];
      if (details.previews && Array.isArray(details.previews)) {
        details.previews.forEach(
          (preview: { url?: string; preview_type?: number }) => {
            if (preview.url && preview.preview_type === 0) {
              screenshots.push(preview.url);
            }
          }
        );
      }

      if (screenshots.length === 0 && details.preview_url) {
        screenshots.push(details.preview_url);
      }

      const result = createEmptyStats({
        currentSubscribers: details.subscriptions ?? 0,
        favorites: details.favorited ?? 0,
        views: details.views ?? 0,
        screenshots,
        previewUrl: details.preview_url ?? "",
      });

      cache[workshopId] = result;
      notifyListeners();
      return result;
    } catch {
      const result = createEmptyStats({ error: true });
      cache[workshopId] = result;
      notifyListeners();
      return result;
    } finally {
      delete pendingRequests[workshopId];
    }
  })();

  return pendingRequests[workshopId]!;
}

export function useSteamStats(workshopId?: string): UseSteamStatsResult {
  const [stats, setStats] = useState<SteamStats>(() => {
    if (!workshopId) {
      return createEmptyStats();
    }
    return cache[workshopId] ?? createEmptyStats({ loading: true });
  });

  useEffect(() => {
    if (!workshopId) return;

    if (cache[workshopId] && !cache[workshopId].loading) {
      setStats(cache[workshopId]);
      return;
    }

    let mounted = true;
    fetchSingleStat(workshopId).then((result) => {
      if (mounted) setStats(result);
    });

    return () => {
      mounted = false;
    };
  }, [workshopId]);

  const retry = useCallback(() => {
    if (!workshopId) return;
    setStats(createEmptyStats({ loading: true }));
    void fetchSingleStat(workshopId, true).then(setStats);
  }, [workshopId]);

  return { ...stats, retry };
}

export function useAllSteamStats(
  workshopIds: (string | undefined)[]
): Record<string, SteamStats> {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const cb = () => forceUpdate((n) => n + 1);
    listeners.add(cb);

    workshopIds.forEach((id) => {
      if (id) {
        void fetchSingleStat(id);
      }
    });

    return () => {
      listeners.delete(cb);
    };
  }, [workshopIds.join(",")]);

  const result: Record<string, SteamStats> = {};
  workshopIds.forEach((id) => {
    if (id && cache[id]) {
      result[id] = cache[id];
    }
  });
  return result;
}
