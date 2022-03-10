const ref = process.env.GITHUB_REF;
const branch = ref ? ref.split("/").pop() : "main";

const config = {
  branches: [
    "+([0-9])?(.{+([0-9]),x}).x",
    "main",
    {
      name: "beta",
      prerelease: "beta",
    },
    {
      name: "alpha",
      prerelease: "alpha",
    },
  ],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
  ],
};

config.plugins.push([
  "@semantic-release/changelog",
  {
    changelogFile: `docs/CHANGELOG-${branch}.md`,
  },
]);

config.plugins.push([
  "@semantic-release/git",
  {
    assets: ["docs"],
    message:
      "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
  },
]);

if (branch != "alpha") {
  config.plugins.push("@semantic-release/github");
}

module.exports = config;
