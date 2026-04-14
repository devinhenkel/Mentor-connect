/** Stable 0..n-1 from mentor id so avatars vary slightly while staying deterministic. */
export function mentorAvatarVariant(mentorId: string, modulo = 4): number {
  let h = 0;
  for (let i = 0; i < mentorId.length; i++) {
    h = (h + mentorId.charCodeAt(i) * (i + 1)) % 1_000_003;
  }
  return h % modulo;
}
