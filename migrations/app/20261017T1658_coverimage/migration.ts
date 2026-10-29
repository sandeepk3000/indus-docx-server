#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/20a5d333bcc5a88363c5b81c0aca2933955a9bfdbd8b82d14367a3de96da7efc/contract';
import startContract from '../../snapshots/20a5d333bcc5a88363c5b81c0aca2933955a9bfdbd8b82d14367a3de96da7efc/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/4000a8d89bbdfe32801558e46fe881d6b92b527398f79380d65f7e264a2e9b69/contract';
import endContract from '../../snapshots/4000a8d89bbdfe32801558e46fe881d6b92b527398f79380d65f7e264a2e9b69/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'User',
        column: col('coverImage', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
