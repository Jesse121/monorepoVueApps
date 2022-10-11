export async function sync<T>(p: Promise<T>): Promise<[Error | null, T?]> {
  try {
    const d = await p;
    return [null, d];
  } catch (err) {
    return [err];
  }
}
