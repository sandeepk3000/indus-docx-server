#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/0c0734babd6eeb868fee1f281ca96963022475611560e9f170f465daa35f8599/contract';
import startContract from '../../snapshots/0c0734babd6eeb868fee1f281ca96963022475611560e9f170f465daa35f8599/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/45122d6bb9fe825864eff5f3864100b371bc676d2745c153ea4798cf898cc061/contract';
import endContract from '../../snapshots/45122d6bb9fe825864eff5f3864100b371bc676d2745c153ea4798cf898cc061/contract.json' with { type: 'json' };
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
          col('auth_provider', 'character varying(50)', {
            notNull: true,
            default: lit('auth0'),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('auth_subject', 'character varying(255)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('deleted_at', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('email', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('image_url', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('is_active', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('name', 'character varying(150)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 150 } },
          }),
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
