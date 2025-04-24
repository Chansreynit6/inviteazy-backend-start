import { Pool, RowDataPacket, ResultSetHeader, FieldPacket } from "mysql2/promise";
import { logger } from "../../services/loggerService";

export async function queryWithLogging<T extends RowDataPacket[] | ResultSetHeader>(
  pool: Pool,
  sql: string,
  params: any[] = [],
  requestId?: string
): Promise<[T, FieldPacket[]]> {
  const startTime = Date.now();
  try {
    const [rows, fields] = await pool.execute<T>(sql, params);
    const duration = Date.now() - startTime;

    logger.info("Database query executed", {
      requestId,
      sql,
      params,
      rowCount: Array.isArray(rows) ? rows.length : undefined,
      duration: `${duration}ms`,
    });

    return [rows, fields];
  } catch (error) {
    const duration = Date.now() - startTime;

    logger.error("Database query failed", {
      requestId,
      sql,
      params,
      error: (error as Error).message,
      duration: `${duration}ms`,
    });

    throw error;
  }
}
