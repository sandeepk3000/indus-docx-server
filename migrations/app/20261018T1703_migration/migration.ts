#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/0bb4e30a8e678c687ad1145ef388f39a8fbbc0825b2abf7c1472b5091ca830d5/contract';
import endContract from '../../snapshots/0bb4e30a8e678c687ad1145ef388f39a8fbbc0825b2abf7c1472b5091ca830d5/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/0c0734babd6eeb868fee1f281ca96963022475611560e9f170f465daa35f8599/contract';
import startContract from '../../snapshots/0c0734babd6eeb868fee1f281ca96963022475611560e9f170f465daa35f8599/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  col,
  fn,
  lit,
  primaryKey,
  sql,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'users',
        columns: [
          col('auth_provider', 'text', {
            notNull: true,
            default: lit('auth0'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('auth_subject', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('deleted_at', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('image_url', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('is_active', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'users',
        constraint: 'users_email_key',
        columns: ['email'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'users',
        constraint: 'users_auth_subject_key',
        columns: ['auth_subject'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
