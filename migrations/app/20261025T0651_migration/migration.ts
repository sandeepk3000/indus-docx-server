#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/0c0734babd6eeb868fee1f281ca96963022475611560e9f170f465daa35f8599/contract';
import startContract from '../../snapshots/0c0734babd6eeb868fee1f281ca96963022475611560e9f170f465daa35f8599/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/adbbdcd6642565a8451361b77b4d7bbc5370cf087e1eae264e6e9f7315776b46/contract';
import endContract from '../../snapshots/adbbdcd6642565a8451361b77b4d7bbc5370cf087e1eae264e6e9f7315776b46/contract.json' with { type: 'json' };
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
        table: 'learning_modules',
        columns: [
          col('course_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
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
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('module_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
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
          col('role', 'text', {
            notNull: true,
            default: lit('STUDENT'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'users_role_check_b59ab8c9',
            sql`"role" IN ('ADMIN', 'INSTRUCTOR', 'STUDENT')`,
          ),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'courses',
        constraint: 'courses_slug_key',
        columns: ['slug'],
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
