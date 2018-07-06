export interface Chain {
  id: string;
  body: string;
  hash: string;
  previous: string;
  receipt?: any;
  signature: string;
  signKey: string;
  timestamp: number;
  events: any[];
  identities: any[];
  resources: string[];
}

export function makeChain(partial: Partial<Chain>): Chain {
  return {
    id: partial.id || '',
    body: partial.body || '',
    hash: partial.hash || '',
    previous: partial.previous || '',
    receipt: partial.receipt,
    signature: partial.signature || '',
    signKey: partial.signKey || '',
    timestamp: partial.timestamp || 0,
    events: partial.events || [],
    identities: partial.identities || [],
    resources: partial.resources || []
  };
}
