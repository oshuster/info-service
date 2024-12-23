import 'dotenv/config';
import { tableName } from '../common/tablesName.js';
const SCHEMA_NAME = process.env.SCHEMA_NAME || 'info_service';

const createTriggerUpdatedAtQuery = `
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
    END;
        $$ LANGUAGE plpgsql;
    `;

const triggerForKvedQuery = `
        CREATE TRIGGER set_updated_at_kved
        BEFORE UPDATE ON ${SCHEMA_NAME}.${tableName.kved}
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `;

const triggerForTaxObjectsQuery = `
        CREATE TRIGGER set_updated_at_kved
        BEFORE UPDATE ON ${SCHEMA_NAME}.${tableName.taxObjects}
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `;

const triggerForProfessionsQuery = `
        CREATE TRIGGER set_updated_at_kved
        BEFORE UPDATE ON ${SCHEMA_NAME}.${tableName.professions}
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `;

const triggerForKatotgQuery = `
        CREATE TRIGGER set_updated_at_kved
        BEFORE UPDATE ON ${SCHEMA_NAME}.${tableName.katotg}
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `;

export const triggersQuery = {
  createTriggerUpdatedAtQuery,
  triggerForKvedQuery,
  triggerForTaxObjectsQuery,
  triggerForProfessionsQuery,
  triggerForKatotgQuery,
};
