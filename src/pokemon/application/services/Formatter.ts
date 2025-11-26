export class Formatter {
  public static capitalize(value: string): string {
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
  }
}
