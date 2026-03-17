export function isAdmin(userId: string): boolean {
  const ids = process.env.ADMIN_USER_IDS;
  if (!ids) return false;
  return ids.split(",").map((s) => s.trim()).includes(userId);
}
