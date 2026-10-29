#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/0c0734babd6eeb868fee1f281ca96963022475611560e9f170f465daa35f8599/contract';
import startContract from '../../snapshots/0c0734babd6eeb868fee1f281ca96963022475611560e9f170f465daa35f8599/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/20a5d333bcc5a88363c5b81c0aca2933955a9bfdbd8b82d14367a3de96da7efc/contract';
import endContract from '../../snapshots/20a5d333bcc5a88363c5b81c0aca2933955a9bfdbd8b82d14367a3de96da7efc/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'User',
        columns: [
          col('age', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'User',
        constraint: 'User_email_key',
        columns: ['email'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
