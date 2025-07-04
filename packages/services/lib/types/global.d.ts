declare global {
  // In test environments, fetch can be a Jest mock
  let fetch: typeof globalThis.fetch | jest.Mock;
}

export {};
