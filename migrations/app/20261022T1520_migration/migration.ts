#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/0c0734babd6eeb868fee1f281ca96963022475611560e9f170f465daa35f8599/contract';
import startContract from '../../snapshots/0c0734babd6eeb868fee1f281ca96963022475611560e9f170f465daa35f8599/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/f91a869a5ec1f2031cc0555ebbfc9f7886a512db4caf4e03332b227d4589517a/contract';
import endContract from '../../snapshots/f91a869a5ec1f2031cc0555ebbfc9f7886a512db4caf4e03332b227d4589517a/contract.json' with { type: 'json' };
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
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
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
        table: 'courses',
        constraint: 'courses_slug_key',
        columns: ['slug'],
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
