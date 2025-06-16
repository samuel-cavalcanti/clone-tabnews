/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    // For reference, GitHub limits usernames to 39 characters
    username: {
      type: "varchar(30)",
      unique: true,
      notNull: true,
    },
    email: {
      type: "varchar(254)",
      unique: true,
      notNull: true,
    },
    password: {
      type: "varchar(60)",
      notNull: true,
    },
    created_at: {
      notNull: true,
      type: "timestamptz",
      default: pgm.func("timezone('utc',now())"),
    },
    updated_at: {
      notNull: true,
      type: "timestamptz",
      default: pgm.func("timezone('utc',now())"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = false;
