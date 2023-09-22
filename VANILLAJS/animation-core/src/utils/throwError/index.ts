export function throwError(message: string, example?: string) {
  throw new Error(`${message}\n\n${example ? `Example:\n${example}` : ''}`);
}
