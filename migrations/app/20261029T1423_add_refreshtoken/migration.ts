#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/9062ebce6c5137094363546aa6424974df7465d500443418d1d831ef9a6dcf5c/contract';
import startContract from '../../snapshots/9062ebce6c5137094363546aa6424974df7465d500443418d1d831ef9a6dcf5c/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/cdbf62717c456a4360b385f47d3fe33db0a58a0f1d76d44f051e14f058ceaeda/contract';
import endContract from '../../snapshots/cdbf62717c456a4360b385f47d3fe33db0a58a0f1d76d44f051e14f058ceaeda/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropColumn({ schema: 'public', table: 'users', column: 'auth_provider' }),
      this.dropConstraint({
        schema: 'public',
        table: 'users',
        constraint: 'users_auth_subject_key',
      }),
      this.dropColumn({ schema: 'public', table: 'users', column: 'auth_subject' }),
      this.addColumn({
        schema: 'public',
        table: 'users',
        column: col('refreshToken', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
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
      this.addUnique({
        schema: 'public',
        table: 'users',
        constraint: 'users_refreshToken_key',
        columns: ['refreshToken'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
