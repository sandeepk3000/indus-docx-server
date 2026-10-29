#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/ab8409928fcfffa610cf9aee7db8fc59f2760853357f75531ba7466b544b025e/contract';
import endContract from '../../snapshots/ab8409928fcfffa610cf9aee7db8fc59f2760853357f75531ba7466b544b025e/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/f91a869a5ec1f2031cc0555ebbfc9f7886a512db4caf4e03332b227d4589517a/contract';
import startContract from '../../snapshots/f91a869a5ec1f2031cc0555ebbfc9f7886a512db4caf4e03332b227d4589517a/contract.json' with { type: 'json' };
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
        table: 'learning_modules',
        columns: [
          col('course_id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('position', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'lessons',
        columns: [
          col('content', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('duration_sec', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('module_id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('position', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('status', 'text', {
            notNull: true,
            default: lit('DRAFT'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('video_url', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'lessons_status_check_bc64f66b',
            sql`"status" IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')`,
          ),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'learning_modules',
        constraint: 'learning_modules_course_id_position_key',
        columns: ['course_id', 'position'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'lessons',
        constraint: 'lessons_module_id_position_key',
        columns: ['module_id', 'position'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'learning_modules',
        index: 'learning_modules_course_id_idx_297aaf4e',
        columns: ['course_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'lessons',
        index: 'lessons_module_id_idx_7703a5b3',
        columns: ['module_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'lessons',
        index: 'lessons_module_id_status_idx_0c94add0',
        columns: ['module_id', 'status'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'courses',
        foreignKey: {
          name: 'courses_created_by_id_fkey',
          columns: ['created_by_id'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'learning_modules',
        foreignKey: {
          name: 'learning_modules_course_id_fkey',
          columns: ['course_id'],
          references: { schema: 'public', table: 'courses', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'lessons',
        foreignKey: {
          name: 'lessons_module_id_fkey',
          columns: ['module_id'],
          references: { schema: 'public', table: 'learning_modules', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
