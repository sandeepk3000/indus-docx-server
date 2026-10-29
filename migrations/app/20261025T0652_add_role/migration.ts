#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/9062ebce6c5137094363546aa6424974df7465d500443418d1d831ef9a6dcf5c/contract';
import startContract from '../../snapshots/9062ebce6c5137094363546aa6424974df7465d500443418d1d831ef9a6dcf5c/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/adbbdcd6642565a8451361b77b4d7bbc5370cf087e1eae264e6e9f7315776b46/contract';
import endContract from '../../snapshots/adbbdcd6642565a8451361b77b4d7bbc5370cf087e1eae264e6e9f7315776b46/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'users',
        column: col('role', 'text', {
          notNull: true,
          default: lit('STUDENT'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'users',
        constraint: 'users_role_check_b59ab8c9',
        expression: sql`"role" IN ('ADMIN', 'INSTRUCTOR', 'STUDENT')`,
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
