export function idGenerator(str: string = ""): string {
  return Math.floor(Math.random() * 10001).toString() + " - " + str
}
