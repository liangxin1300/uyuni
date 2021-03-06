const shell = require('shelljs');
const { fillSpecFile } = require("./build/fill-spec-file");

const { code: codeBuild } = shell.exec("webpack --config build/webpack.config.js --mode production");
if (codeBuild !== 0) {
  shell.exit(codeBuild);
}

fillSpecFile()
  .then(() => {
    // let's make a sanity check if the generated specfile with the right  licenses is commited on git
    const { stdout } = shell.exec("(cd ../../;hash git && git ls-files -m)");

    if(stdout && stdout.includes("spacewalk-web.spec")) {
      shell.echo("It seems the most recent spacewalk-web.spec file isn't on git, run build again and commit the new generated susemanager-web-libs.spec file ");
      shell.exit(1);
    }
  });
