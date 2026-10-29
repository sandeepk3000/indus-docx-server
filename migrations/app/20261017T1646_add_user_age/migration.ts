#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/20a5d333bcc5a88363c5b81c0aca2933955a9bfdbd8b82d14367a3de96da7efc/contract';
import endContract from '../../snapshots/20a5d333bcc5a88363c5b81c0aca2933955a9bfdbd8b82d14367a3de96da7efc/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/a62d15a094e80be7b342d75e0538935972b9699c76dabb5339940dd50d17a889/contract';
import startContract from '../../snapshots/a62d15a094e80be7b342d75e0538935972b9699c76dabb5339940dd50d17a889/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'User',
        column: col('age', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
