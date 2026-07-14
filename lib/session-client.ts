export async function createSession(idToken: string): Promise<void> {
  const response = await fetch("/api/session", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create session");
  }
}
