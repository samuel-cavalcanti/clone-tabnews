const { exec } = require("node:child_process");

function checkPostgres() {
  exec(
    "podman exec postgres-dev pg_isready --host localhost",
    (error, stdout) => {
      // if (error) throw error;
      if (stdout.search("accepting connections") === -1) {
        process.stdout.write(".");
        checkPostgres();
      } else console.log("is ready");
    },
  );
}
console.log("Waiting for postgres");

checkPostgres();
