import { useState, useEffect, useCallback } from "react";

export interface SketchfabStats {
  viewCount: number;
  likeCount: number;
  commentCount: number;
  faceCount: number;
  vertexCount: number;
  loading: boolean;
  error: boolean;
}

export interface UseSketchfabStatsResult extends SketchfabStats {
  retry: () => void;
}

const CORS_PROXY = "https://corsproxy.io/?url=";
const SKETCHFAB_API = "https://api.sketchfab.com/v3/models/";

const cache: Record<string, SketchfabStats> = {};
const pendingRequests: Partial<Record<string, Promise<SketchfabStats>>> = {};
const listeners: Set<() => void> = new Set();

function createEmptyStats(
  overrides: Partial<SketchfabStats> = {}
): SketchfabStats {
  return {
    viewCount: 0,
    likeCount: 0,
    commentCount: 0,
    faceCount: 0,
    vertexCount: 0,
    loading: false,
    error: false,
    ...overrides,
  };
}

function notifyListeners() {
  listeners.forEach((cb) => cb());
}

async function fetchSingleStat(
  sketchfabId: string,
  force = false
): Promise<SketchfabStats> {
  if (!force && cache[sketchfabId] && !cache[sketchfabId].loading) {
    return cache[sketchfabId];
  }

  const existingRequest = pendingRequests[sketchfabId];
  if (!force && existingRequest) {
    return existingRequest;
  }

  cache[sketchfabId] = createEmptyStats({ loading: true });
  notifyListeners();

  pendingRequests[sketchfabId] = (async () => {
    try {
      const response = await fetch(
        `${CORS_PROXY}${encodeURIComponent(SKETCHFAB_API + sketchfabId)}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("API error");

      const data = await response.json();

      const result = createEmptyStats({
        viewCount: data.viewCount ?? 0,
        likeCount: data.likeCount ?? 0,
        commentCount: data.commentCount ?? 0,
        faceCount: data.faceCount ?? 0,
        vertexCount: data.vertexCount ?? 0,
      });

      cache[sketchfabId] = result;
      notifyListeners();
      return result;
    } catch {
      const result = createEmptyStats({ error: true });
      cache[sketchfabId] = result;
      notifyListeners();
      return result;
    } finally {
      delete pendingRequests[sketchfabId];
    }
  })();

  return pendingRequests[sketchfabId]!;
}

export function useSketchfabStats(
  sketchfabId?: string
): UseSketchfabStatsResult {
  const [stats, setStats] = useState<SketchfabStats>(() => {
    if (!sketchfabId) {
      return createEmptyStats();
    }
    return cache[sketchfabId] ?? createEmptyStats({ loading: true });
  });

  useEffect(() => {
    if (!sketchfabId) return;

    if (cache[sketchfabId] && !cache[sketchfabId].loading) {
      setStats(cache[sketchfabId]);
      return;
    }

    let mounted = true;
    fetchSingleStat(sketchfabId).then((result) => {
      if (mounted) setStats(result);
    });

    return () => {
      mounted = false;
    };
  }, [sketchfabId]);

  const retry = useCallback(() => {
    if (!sketchfabId) return;
    setStats(createEmptyStats({ loading: true }));
    void fetchSingleStat(sketchfabId, true).then(setStats);
  }, [sketchfabId]);

  return { ...stats, retry };
}

export function useAllSketchfabStats(
  sketchfabIds: (string | undefined)[]
): Record<string, SketchfabStats> {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const cb = () => forceUpdate((n) => n + 1);
    listeners.add(cb);

    sketchfabIds.forEach((id) => {
      if (id) {
        void fetchSingleStat(id);
      }
    });

    return () => {
      listeners.delete(cb);
    };
  }, [sketchfabIds.join(",")]);

  const result: Record<string, SketchfabStats> = {};
  sketchfabIds.forEach((id) => {
    if (id && cache[id]) {
      result[id] = cache[id];
    }
  });
  return result;
}
