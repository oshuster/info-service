import 'dotenv/config';
const SCHEMA_NAME = process.env.SCHEMA_NAME || 'info_service';

export const generateTriggerQuery = (tableName) => `
  DO $$
  BEGIN
    IF EXISTS (
      SELECT 1
      FROM pg_trigger
      WHERE tgname = 'set_updated_at_${tableName}'
    ) THEN
      DROP TRIGGER set_updated_at_${tableName} ON ${SCHEMA_NAME}.${tableName};
    END IF;
    CREATE TRIGGER set_updated_at_${tableName}
    BEFORE UPDATE ON ${SCHEMA_NAME}.${tableName}
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  END $$;
`;
