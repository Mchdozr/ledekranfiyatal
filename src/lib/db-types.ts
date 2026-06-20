export type UsageType = "ic-mekan" | "dis-mekan" | "kiralama" | "emin-degilim";

export type RequestStatus = "new" | "calling" | "completed" | "archived";

export type CallStatus =
  | "queued"
  | "ringing"
  | "in_progress"
  | "completed"
  | "failed"
  | "no_answer"
  | "voicemail";

export type PriceUnit = "m2" | "adet" | "toplam" | "bilinmiyor";

export type Supplier = {
  id: string;
  name: string;
  phone: string;
  city: string | null;
  product_types: string[];
  usage_types: string[];
  active: boolean;
  priority: number;
  notes: string | null;
  created_at: string;
};

export type QuoteRequest = {
  id: string;
  usage_type: string;
  width: string | null;
  height: string | null;
  area: string | null;
  distance: string | null;
  pixel_pitch: string | null;
  application: string;
  city: string;
  installation: string | null;
  notes: string | null;
  full_name: string;
  phone: string;
  email: string;
  kvkk: boolean;
  marketing: boolean;
  status: RequestStatus;
  created_at: string;
};

export type CallSession = {
  id: string;
  request_id: string;
  supplier_id: string;
  retell_call_id: string | null;
  status: CallStatus;
  price: number | null;
  currency: string | null;
  price_unit: PriceUnit | null;
  lead_time_days: number | null;
  warranty_years: number | null;
  includes_installation: boolean | null;
  is_reachable: boolean | null;
  summary: string | null;
  transcript: string | null;
  recording_url: string | null;
  raw_analysis: Record<string, unknown> | null;
  error: string | null;
  started_at: string | null;
  ended_at: string | null;
  created_at: string;
};

export type CallSettings = {
  recordingEnabled: boolean;
  disclosureEnabled: boolean;
  maxConcurrentCalls: number;
};

export const defaultCallSettings: CallSettings = {
  recordingEnabled: true,
  disclosureEnabled: true,
  maxConcurrentCalls: 5,
};

const callStatusLabels: Record<CallStatus, string> = {
  queued: "Sırada",
  ringing: "Çalıyor",
  in_progress: "Görüşülüyor",
  completed: "Tamamlandı",
  failed: "Başarısız",
  no_answer: "Cevap yok",
  voicemail: "Telesekreter",
};

export function callStatusLabel(status: CallStatus): string {
  return callStatusLabels[status] ?? status;
}

export function isActiveCall(status: CallStatus): boolean {
  switch (status) {
    case "queued":
    case "ringing":
    case "in_progress":
      return true;
    case "completed":
    case "failed":
    case "no_answer":
    case "voicemail":
      return false;
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}
