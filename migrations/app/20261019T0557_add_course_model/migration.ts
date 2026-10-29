#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/0bb4e30a8e678c687ad1145ef388f39a8fbbc0825b2abf7c1472b5091ca830d5/contract';
import startContract from '../../snapshots/0bb4e30a8e678c687ad1145ef388f39a8fbbc0825b2abf7c1472b5091ca830d5/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/50957b567c19fcec0017fb38317d0e26a9b9e7bd973fbe870fd9babcacc5b11b/contract';
import endContract from '../../snapshots/50957b567c19fcec0017fb38317d0e26a9b9e7bd973fbe870fd9babcacc5b11b/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
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
        table: 'courses',
        columns: [
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('created_by_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('deleted_at', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('level', 'text', {
            notNull: true,
            default: lit('BEGINNER'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('published_at', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('slug', 'character varying(280)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 280 } },
          }),
          col('status', 'text', {
            notNull: true,
            default: lit('DRAFT'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('thumbnail_url', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'courses_level_check_85a47cbd',
            sql`"level" IN ('BEGINNER', 'INTERMEDIATE', 'ADVANCED')`,
          ),
          checkExpression(
            'courses_status_check_bc64f66b',
            sql`"status" IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')`,
          ),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'courses',
        constraint: 'courses_slug_key',
        columns: ['slug'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'courses',
        index: 'courses_created_at_idx_225d8c0f',
        columns: ['created_at'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'courses',
        index: 'courses_created_by_id_idx_2b1d9a03',
        columns: ['created_by_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'courses',
        index: 'courses_status_deleted_at_idx_acd966eb',
        columns: ['status', 'deleted_at'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
