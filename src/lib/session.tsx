import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

/**
 * Mock buyer session/compliance state.
 *
 * Phase 1 has no real backend or KYC provider — this models the same state
 * shape diamond-commerce-platform keeps in Redux (`buyer.complianceStatus`,
 * `buyer.eligibilityStatus`), so every page that gates Bidding or Paid
 * Analysis reads one shared source of truth instead of hardcoding "Approved".
 *
 * Persisted to localStorage only so a refresh doesn't reset a demo walkthrough.
 */

export type KycStatus = "NOT_STARTED" | "PENDING" | "APPROVED" | "REJECTED";
export type EligibilityStatus = "ELIGIBLE" | "INELIGIBLE" | "UNDER_REVIEW";

export type KycDocument = {
  id: string;
  label: string;
  status: "Pending" | "Uploaded" | "Approved" | "Rejected";
};

export type BuyerSession = {
  kycStatus: KycStatus;
  eligibilityStatus: EligibilityStatus;
  rejectionReason: string | null;
  documents: KycDocument[];
};

const STORAGE_KEY = "adex.buyer-session.v1";

const defaultSession: BuyerSession = {
  kycStatus: "APPROVED",
  eligibilityStatus: "ELIGIBLE",
  rejectionReason: null,
  documents: [
    { id: "identity", label: "Government-issued ID", status: "Approved" },
    { id: "proof-of-address", label: "Proof of address", status: "Approved" },
    { id: "source-of-funds", label: "Source of funds declaration", status: "Approved" },
    { id: "company-registration", label: "Company registration", status: "Approved" },
  ],
};

function loadSession(): BuyerSession {
  if (typeof window === "undefined") return defaultSession;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSession;
    const parsed = JSON.parse(raw) as Partial<BuyerSession>;
    return { ...defaultSession, ...parsed };
  } catch {
    return defaultSession;
  }
}

function saveSession(session: BuyerSession) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Storage unavailable (private mode, quota) — session just won't persist across reloads.
  }
}

/** True once both compliance gates are cleared — the single condition Bid/Analysis actions check. */
export function isComplianceCleared(session: BuyerSession): boolean {
  return session.kycStatus === "APPROVED" && session.eligibilityStatus === "ELIGIBLE";
}

type Ctx = {
  session: BuyerSession;
  isCleared: boolean;
  setKycStatus: (status: KycStatus, rejectionReason?: string) => void;
  setEligibilityStatus: (status: EligibilityStatus) => void;
  resubmitDocument: (id: string) => void;
  resetToPending: () => void;
};

const SessionContext = createContext<Ctx | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<BuyerSession>(() => loadSession());

  const update = useCallback((next: Partial<BuyerSession>) => {
    setSession((prev) => {
      const merged = { ...prev, ...next };
      saveSession(merged);
      return merged;
    });
  }, []);

  const setKycStatus = useCallback(
    (status: KycStatus, rejectionReason?: string) => {
      update({ kycStatus: status, rejectionReason: rejectionReason ?? null });
    },
    [update],
  );

  const setEligibilityStatus = useCallback(
    (status: EligibilityStatus) => update({ eligibilityStatus: status }),
    [update],
  );

  const resubmitDocument = useCallback(
    (id: string) => {
      setSession((prev) => {
        const merged = {
          ...prev,
          kycStatus: "PENDING" as const,
          documents: prev.documents.map((d) => (d.id === id ? { ...d, status: "Uploaded" as const } : d)),
        };
        saveSession(merged);
        return merged;
      });
    },
    [],
  );

  const resetToPending = useCallback(() => {
    update({
      kycStatus: "PENDING",
      eligibilityStatus: "UNDER_REVIEW",
      rejectionReason: null,
      documents: defaultSession.documents.map((d) => ({ ...d, status: "Pending" })),
    });
  }, [update]);

  const value = useMemo<Ctx>(
    () => ({
      session,
      isCleared: isComplianceCleared(session),
      setKycStatus,
      setEligibilityStatus,
      resubmitDocument,
      resetToPending,
    }),
    [session, setKycStatus, setEligibilityStatus, resubmitDocument, resetToPending],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): Ctx {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within a SessionProvider");
  return ctx;
}
