/**
 * Interface for the Health Controller.
 * Defines the contract for the health check functionality.
 */
export interface IHealthController {
  /**
   * @description Checks the health of the application.
   * @returns An object containing the health status.
   */
  checkHealth(): { status: string };
}
